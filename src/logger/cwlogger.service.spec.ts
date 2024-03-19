import { Test, TestingModule } from '@nestjs/testing'
import { CWLogger } from './cwlogger.service'

describe('LoggerService', () => {
  let service: CWLogger

  beforeEach(async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CWLogger],
    }).compile()

    service = module.get<CWLogger>(CWLogger)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  it('should be show log string', () => {
    service.debug('demo')
    expect(service.log('demo')).toBeUndefined()
  })
})
