import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;

  await app.listen(PORT, () => {
    console.log(`🚀 Application running at port ${PORT}`);
  });
}
bootstrap();
