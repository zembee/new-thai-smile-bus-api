import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { OnGatewayDisconnect } from '@nestjs/websockets/interfaces/hooks/on-gateway-disconnect.interface'
import { OnGatewayConnection } from '@nestjs/websockets/interfaces/hooks/on-gateway-connection.interface'
import { OnGatewayInit } from '@nestjs/websockets/interfaces/hooks/on-gateway-init.interface'
import { Socket } from 'socket.io'
import { CWLogger } from '../logger/cwlogger.service'
import { IUser } from '../user/user.schema'
import { User } from '../user/users.decorator'
import { Inject, UseGuards } from '@nestjs/common'
import { VehicleService } from './vehicle.service'
import { SchedulerRegistry } from '@nestjs/schedule'

@WebSocketGateway({ path: '/ws/vehicle' })
export class VehicleGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger: CWLogger = new CWLogger(VehicleGateway.name)
  @WebSocketServer() private server: any
  @Inject() private readonly vehicleService: VehicleService
  @Inject() private schedulerRegistry: SchedulerRegistry

  @SubscribeMessage('vehicle:location')
  async subscribeVehicleLocationEvent(
    @ConnectedSocket() client: Socket,
    @User() user: IUser,
    @MessageBody() type: string,
  ): Promise<void> {
    this.join(client, type)
    this.logger.log(
      `username ${user?.phoneNumber ??
        user?.email} join vehicle:location ${type}`,
    )
  }

  @SubscribeMessage('vehicle:route')
  async subscribeVehicleRouteRadius(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomNo: string
      objectId: string
      lats: string
      lons: string
      minRadius: number
      maxRadius: number
      intervalTime: number
    },
  ): Promise<void> {
    this.join(client, data.roomNo)

    const dataVehicles = async () => {
      const vehicles = await this.vehicleService.getVehicleRouteRadius(
        data.objectId,
        parseFloat(data.lats),
        parseFloat(data.lons),
        data.minRadius,
        data.maxRadius,
      )

      this.emit('vehicle:route', data.roomNo, vehicles)
    }

    dataVehicles()
    if (typeof data.intervalTime === 'number') {
      const interval = setInterval(dataVehicles, data.intervalTime)
      this.schedulerRegistry.addInterval(client.id, interval)
    }
  }

  join(client: Socket, objectId: string): void {
    client.leaveAll()
    client.join(objectId)
  }

  emit(event: string, roomNo: string, message: any): void {
    this.logger.log(`emit socket event ${event}`)
    this.server.to(roomNo).emit(event, message)
  }

  afterInit(): void {
    this.logger.log(`Bus Gateway Sockets Initialized.`)
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client Connected. ${client.id}`)
  }

  handleDisconnect(client: Socket): void {
    try {
      this.schedulerRegistry.deleteInterval(client.id)
      this.logger.log(`Client Disconnected. ${client.id}`)
    } catch (error) {
      this.logger.error(error)
    }
  }
}
