import {
  Controller, Get, HttpCode,
  Inject, Query, UseGuards,
} from '@nestjs/common'
import { AnnouncementService } from './announcement.service'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CommonResponse } from '../../decorators/common-response.decorator'
import PaginationAnnouncementDto from './dto/pagination-announcement.dto'
import PaginationAnnouncementResponseDto from './dto/pagination-announcement-response.dto'

const Module = 'Announcement'

@Controller('announcement')
export class AnnouncementController {
  @Inject() private readonly announcementService: AnnouncementService

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('')
  @ApiOperation({ 'summary': 'รายการประกาศ' })
  @CommonResponse(Module, { successType: PaginationAnnouncementResponseDto })
  async announcementPagination(
    @Query() query: PaginationAnnouncementDto,
  ): Promise<PaginationAnnouncementResponseDto> {
    const {
      page = 1,
      perPage = 20,
    } = query
    const { records, count } = await this.announcementService.pagination({ page, perPage })
    return {
      ...query,
      records,
      count,
    }
  }
}
