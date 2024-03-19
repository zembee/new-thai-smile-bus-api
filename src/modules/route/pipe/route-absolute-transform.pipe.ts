import {
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { RouteService } from '../route.service'
import RouteResponseDto from '../document/route-response.dto'

@Injectable()
export class RouteAbsoluteTransformPipe implements PipeTransform {
  @Inject() routeService: RouteService

  async transform(body: { objectId }): Promise<RouteResponseDto> {
    const { objectId } = body
    const route = await this.routeService.findByObjectId(objectId)
    if (!route) {
      throw new BadRequestException({
        message: 'not found route.',
      })
    }

    return route
  }
}
