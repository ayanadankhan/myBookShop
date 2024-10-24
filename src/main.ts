import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Session setup if needed
  app.use(
    session({
      secret: 'mySecret',  // Replace with a strong secret
      resave: false,
      saveUninitialized: false,
    }),
  );

  // Initialize passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
