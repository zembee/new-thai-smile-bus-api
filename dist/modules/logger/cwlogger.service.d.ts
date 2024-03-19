import { Logger } from '@nestjs/common';
import * as winston from 'winston';
export declare class CWLogger extends Logger {
    private ctx;
    winstonLogger: winston.Logger;
    constructor(ctx?: string);
    setContext(context: string): this;
    silly(message: string): void;
    debug(message: string): void;
    log(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    private winstonLog;
}
