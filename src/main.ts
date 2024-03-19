import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import compression from 'compression'
import { AppModule } from './modules/app/app.module'
import { CWLogger } from './modules/logger/cwlogger.service'
import { RedisIoAdapter } from './adapters/redis-io.adapter'
import { setupSwagger } from './swagger'
import admin from 'firebase-admin'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: true,
    methods: 'GET,POST',
    credentials: true,
  })
  const configService = app.get(ConfigService)
  const port = configService.get<number>('port')
  const logger = app.get(CWLogger)
  app.use(compression())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true,transform: true }))
  app.useWebSocketAdapter(new RedisIoAdapter(app))

  // firebase admin setup
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'tsbdev-2ffcf',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCkPWr7X2Rnsr1L\na31G0BQxl9lK4+HfBuTZe1T4Cb8htFoqfN0illNNVJqCQt65Q8P+QSBsZgP27cJ2\ngemTf5gr5wYGZkniPAGGom9J6HzmXMibPElbp9RuCBFrTu6EqgS1t0zdBCz3oJuB\nN1hHIqkqrHcYcRaG4IDU2KzE9f9hTHJQNvQJ7O58Kks4uX7FsWhOUhnYEFBXwz3q\nt/JLvNR5QPQqsPIJi8FEwKyweECDaGenW+nnOi3tzI80BNj1PP3BiWlH1mrjNv8F\nzdthJHVz3yLU5Jc1QVfxnflKmxHJCY2/jvoJSXzsACZ2CF9DTGNRY8+kNQYQkuzX\nYmlmKQBXAgMBAAECggEAT4rfUTb17bMHMouwdKc54HrmZfrP3a/9DcdJc4dk5fHu\n6Tzn7GRZm84ptoSkUZ2cQntQNK+DpAeqcrKgaSsWi8yrglXv2n2tT4ND2suaEgdF\nsMkVzioOG+wUY6AqrF2bQlawByqKjLNgHMitHGaQ/3XfiBrdCh2Yx3zYz9tD/967\nsGTEWBK3seuwSCbPFdMSmYM6HMxBtgb/r+BxzxhJ81spvsi7SGo5AvF/soSEAJ1E\nLyzgvGJ2wH3oc74G/WbrsYmo8D4TR8ODoq23A/nefTJVSfiW6MnMxQ1wg5zUNsBH\nZNwmFQjhW2TxsErTSr999Tk9qTkWQ2lAVUBiA/3nAQKBgQDNDhhCOSRABFnEaPNE\nsdhAGNeib4DSS+DM45dYzNKa21nKGJ3e60yoHCswmpqAkezCAmftrKtCpczFcuof\nXcB+G61SY6MrZg+tOtHdjHMoQLpNdrDt9E6E23SEvDWSkaAMVgLja0Bm3W7iHiWa\n2htXccsdrq8MDdAAhSC1cLTmtwKBgQDNC2ZPgY5BtQ2UwAmpLuYXO/sIt4Tj4Snr\nqk7h1MehsoJu3rm5Y0674RpiJYL54IC87x15nxfxe+dTZ0yEAkpzg31ZC7Jt3fMf\nzRpN5EzhxkCn1/nnozaYP+xvWoIVJFdbXbXw3HBWg7FTqGhuvgS+qhR+cudx1Ay9\nrq6PsXITYQKBgEdwEaOApNBos51pstbL3rr17Kn6jra1GKxI3gFh2j15Dd8KlHWF\nJD+tEJ7uPcVtET7F988lyMR/XserMUWcM+O7YLbDX6VO+Ucwpsy4kaYEZuN15k4A\nPxqqGf3kVAWsFkY18OuqAdXUbzz3o8I/GidszYaZxQI+DakguDR9/4ghAoGARoLa\nDxNFYVEqt3GGoPhwxaKpxCif+WFv8gviDoUGlZN2iTvscFU3OSLC2Od/cACFJPOx\nliZgrHloZmUKigbjpW+dRmbgWCnQNqpolkqhKa7sgwuhc8fLuXWaD/z26OBTbib+\nrzKPKyEkdNlf+F098nc4jvdioeFC9GPCwcVKrmECgYAis8lTzRKVSaaqZTmAS9kr\neH22Dkvd0T8ZVpeKDxdsIi1ViWfmDRIcHdaSpNgOTLZJpCAI5CWhAiW7YQXLY/ak\nNQirRSh409aAm/8xvLig6NQYS81GFV65Xu0moijkNTbPfe7+IRCQDv+maBT1RCiZ\n8VDsAOxI3NmPMjZagzLsnw==\n-----END PRIVATE KEY-----\n',
      clientEmail: 'firebase-adminsdk-v58ib@tsbdev-2ffcf.iam.gserviceaccount.com',
    }),
  })

  if (process.env.ENABLE_SWAGGER_API_DOCUMENT === '1') {
    setupSwagger(app)
  }
  app.useLogger(logger)
  await app.listen(
    port,
    () => {
      logger.silly(`Microservice listen on port ${port}`)
    })
}

bootstrap()
