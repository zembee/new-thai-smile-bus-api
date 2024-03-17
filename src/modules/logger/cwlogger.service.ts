import {
  Injectable,
  Logger,
} from '@nestjs/common'
import dayjs from 'dayjs'
import chalk from 'chalk'
import * as winston from 'winston'

const formatter = info => {
  return `${dayjs(info.timestamp).format(
    'YYYY/MM/DD - hh:mm:ss.SSS A',
  )} [${info.level}] [${chalk.green(
    info.context,
  )}] ${info.message}`
}

const customFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.prettyPrint(),
  winston.format.printf(info => formatter(info)),
)

@Injectable()
export class CWLogger extends Logger {
  private ctx: string
  public winstonLogger: winston.Logger

  constructor(ctx = 'Logger') {
    super(ctx)
    this.setContext(ctx)
    this.winstonLogger = winston.createLogger({
      level: 'silly',
      format: customFormat,
      transports: [
        new winston.transports.Console(),
      ],
    })
  }

  public setContext(context: string): this {
    super.setContext(context)
    this.ctx = context
    return this
  }

  public silly(message: string): void {
    this.winstonLog(message, 'silly')
  }

  public debug(message: string): void {
    this.winstonLog(message, 'debug')
  }

  public log(message: string): void {
    this.winstonLog(message, 'info')
  }

  public warn(message: string): void {
    this.winstonLog(message, 'warn')
  }

  public error(message: string): void {
    this.winstonLog(message, 'error')
  }

  private winstonLog(
    message: string,
    level: 'silly' | 'info' | 'debug' | 'warn' | 'error',
  ) {
    const entry = {
      level,
      message,
      context: this.ctx,
    }
    this.winstonLogger.log(entry)
  }
}

