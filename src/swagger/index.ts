import { INestApplication } from '@nestjs/common'
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger'

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Tsb Web API')
    .setDescription('Tsb Web API Document')
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
