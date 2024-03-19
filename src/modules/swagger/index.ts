import { INestApplication } from '@nestjs/common'
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger'

export const setupSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('Web API Document')
    .setDescription('CT855 Web API Document')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addServer('')
    .addServer('/api')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
}
