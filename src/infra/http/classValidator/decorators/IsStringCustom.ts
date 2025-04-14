import {
  isString,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ExceptionsMessage } from '../data/ExceptionsMessage';

export function IsStringCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsStringCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isString(value);
        },
        defaultMessage() {
          return ExceptionsMessage.IsString;
        },
      },
    });
  };
}
