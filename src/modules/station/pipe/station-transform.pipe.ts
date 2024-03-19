import { BadRequestException, Inject, Injectable, PipeTransform } from '@nestjs/common'
import { StationService } from '../station.service'
import StationResponseDto from '../document/station-response.dto'

@Injectable()
export class StationTransformPipe implements PipeTransform {
  @Inject() stationService: StationService

  async transform(body: { objectId }): Promise<StationResponseDto> {
    const { objectId } = body
    const station = await this.stationService.findByObjectIdStatus(objectId)
    if (!station) {
      throw new BadRequestException({
        message: 'not found station.',
      })
    }
    return station
  }
}
