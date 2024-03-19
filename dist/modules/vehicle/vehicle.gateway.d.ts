import { OnGatewayDisconnect } from '@nestjs/websockets/interfaces/hooks/on-gateway-disconnect.interface';
import { OnGatewayConnection } from '@nestjs/websockets/interfaces/hooks/on-gateway-connection.interface';
import { OnGatewayInit } from '@nestjs/websockets/interfaces/hooks/on-gateway-init.interface';
import { Socket } from 'socket.io';
import { IUser } from '../user/user.schema';
export declare class VehicleGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger;
    private server;
    private readonly vehicleService;
    private schedulerRegistry;
    subscribeVehicleLocationEvent(client: Socket, user: IUser, type: string): Promise<void>;
    subscribeVehicleRouteRadius(client: Socket, data: {
        roomNo: string;
        objectId: string;
        lats: string;
        lons: string;
        minRadius: number;
        maxRadius: number;
        intervalTime: number;
    }): Promise<void>;
    subscribeVehicleRouteRadius2(client: Socket, routeArray: string[], data: {
        roomNo: string;
        objectId: string;
        lats: string;
        lons: string;
        minRadius: number;
        maxRadius: number;
        intervalTime: number;
        objectIdRoute: string[];
    }): Promise<void>;
    join(client: Socket, objectId: string): void;
    emit(event: string, roomNo: string, message: any): void;
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
