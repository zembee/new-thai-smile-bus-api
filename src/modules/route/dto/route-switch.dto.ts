import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty,IsArray,ArrayMinSize,IsString,ArrayNotEmpty,IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'


export default class RouteSwitchDto {
    @ApiProperty({
      description: 'objectId stations',
      required: false,
      type: String
    })
    @IsNotEmpty()
    stations: string
  
    @ApiProperty({
      description: 'objectId routes',
      required: false,
      type: () => [String] ,
      isArray: true
    })
    @IsNotEmpty({ each: true })
    @IsOptional()
    //@IsArray()
    //@Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
    public routes?: string[] 
    

  }
 