import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { CWLogger } from './cwlogger.service'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger: CWLogger = new CWLogger('LoggingInterceptor')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const args = context.getArgs()
    const [req] = args
    this.logger.log(`Incoming request with\n url:[${req.method}]${req.url}\n headers:${JSON.stringify(req.headers)} \n body:${JSON.stringify(req.body)}`)
    const now = Date.now()
    return next
      .handle()
      .pipe(
        tap((data) => data ?
          this.logger.log(`Response outgoing with (${Date.now() - now}ms) data:[${JSON.stringify(data)}]`) : null,
        ),
      )
  }
}
