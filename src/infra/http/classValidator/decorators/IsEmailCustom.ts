import { isEmail, registerDecorator, ValidationOptions } from 'class-validator';
import { ExceptionsMessage } from '../data/ExceptionsMessage';

export function IsEmailCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsEmailCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isEmail(value);
        },
        defaultMessage() {
          return ExceptionsMessage.IsEmail;
        },
      },
    });
  };
}
