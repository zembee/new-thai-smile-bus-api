import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  handleRequest(err: any, user: any, info: any, context: any): any {
    const skipAuth: boolean = this.reflector.get<boolean>('skipAuth', context.getHandler())
    if (skipAuth) {
      if (!user) {
        return null
      }

      return user
    }

    if (err || !user) {
      throw err || new UnauthorizedException()
    }

    return user
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context)
  }
}
