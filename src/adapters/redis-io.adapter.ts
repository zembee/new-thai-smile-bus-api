import { IoAdapter } from '@nestjs/platform-socket.io'
import { ConfigService } from '@nestjs/config'
import { Server, ServerOptions } from 'socket.io'
import redisIoAdapter from 'socket.io-redis'
import { INestApplication, Logger } from '@nestjs/common'

export class RedisIoAdapter extends IoAdapter {
  private readonly configService: ConfigService
  private readonly logger: Logger
  private server: Server

  constructor(app: INestApplication) {
    super(app)
    this.configService = app.get(ConfigService)
    this.logger = new Logger('RedisIoAdapter')
  }

  createIOServer(port: number, options?: ServerOptions): Server {
    this.logger.log(
      `Create io server with redis info ${JSON.stringify(
        this.configService.get('redis'),
      )}`,
    )
    const server = super.createIOServer(port, options)
    const redisAdapter = redisIoAdapter({
      host: this.configService.get<string>('redis.host') || 'localhost',
      port: this.configService.get<string>('redis.port') || 6379,
      password: this.configService.get<string>('redis.password') || undefined,
    })
    server.adapter(redisAdapter)
    return server
  }

  public create(port: number, options: ServerOptions = {}): Server {
    this.server = this.createIOServer(port, options)
    this.server.use(async(socket: any, next) => {
      const token =
        socket.handshake.query?.token || socket.handshake.headers?.authorization
      if (!token) {
        // not authenticated connection is still valid
        // thus no error
        return next()
      }
      try {
        socket.headers = {
          authorization: `Bearer ${token}`,
        }
        return next()
      } catch (e) {
        return next(e)
      }
    })

    return this.server
  }
}
