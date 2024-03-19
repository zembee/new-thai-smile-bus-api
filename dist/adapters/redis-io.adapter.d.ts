import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { INestApplication } from '@nestjs/common';
export declare class RedisIoAdapter extends IoAdapter {
    private readonly configService;
    private readonly logger;
    private server;
    constructor(app: INestApplication);
    createIOServer(port: number, options?: ServerOptions): Server;
    create(port: number, options?: ServerOptions): Server;
}
