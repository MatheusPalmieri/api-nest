import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { SignInBody } from '../dtos/SignInBody';

export class SignInDTOValidateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const signInBody = new SignInBody();

    signInBody.email = body.email;
    signInBody.password = body.password;

    const validations = await validate(signInBody);

    if (validations.length) {
      throw new BadRequestException(validations);
    }

    next();
  }
}
