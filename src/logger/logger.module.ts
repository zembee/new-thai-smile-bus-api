import { Global, Module } from '@nestjs/common'
import { CWLogger } from './cwlogger.service'
import { ConfigModule } from '@nestjs/config'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [CWLogger],
  exports: [CWLogger],
})
export class LoggerModule {}
