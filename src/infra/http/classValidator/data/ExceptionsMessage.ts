export const ExceptionsMessage = {
  IsEmail: 'Property $property must be a valid email',
  IsNotEmpty: 'Property $property should not be empty',
  IsString: 'Property $property must be a string',
  MinLength: (min: number) =>
    `Property $property must be at least ${min} characters long`,
};
