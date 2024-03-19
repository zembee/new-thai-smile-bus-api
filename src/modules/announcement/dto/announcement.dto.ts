import { ApiProperty } from '@nestjs/swagger'

export declare class AnnouncementDto {
  @ApiProperty({
    example: 'www.tbs1-19.png',
  })
  image: string

  @ApiProperty({
    example: '4 เหตุผลน่าใช้บริการ THAI SMILE BUS',
  })
  title: string

  @ApiProperty({
    example: 'เพราะเรามุ่งมั่นสร้างความประทับใจให้กับผู้โดยสาร ด้วยการเดินทางที่ปลอดภัย มีประสิทธิภาพและ มาตรฐานด้านการบริการ',
  })
  subtitle: string

  @ApiProperty({
    example: '4MKyI7CdWmOCAqnc_ZtXN',
  })
  objectId: string

  @ApiProperty({
    example: '2021-07-09T03:56:04.624Z',
  })
  createdAt: Date
}
