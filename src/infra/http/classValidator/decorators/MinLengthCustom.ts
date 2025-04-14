import {
  minLength,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ExceptionsMessage } from '../data/ExceptionsMessage';

export function MinLengthCustom(
  min: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'MinLengthCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return minLength(value, min);
        },
        defaultMessage() {
          return ExceptionsMessage.MinLength(min);
        },
      },
    });
  };
}
