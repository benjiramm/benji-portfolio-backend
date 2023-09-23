import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors
  app.enableCors();

  // setting up swagger
  const options = new DocumentBuilder()
    .setTitle('Portfolio CRM API')
    .setDescription(
      'an api to manage portfolio projects along with different technologies that those projects use',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'local environment')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
