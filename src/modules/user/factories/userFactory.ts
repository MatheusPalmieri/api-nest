import { User } from '../entities/User';

type Override = Partial<User>;

export const makeUser = ({ id, ...props }: Override) => {
  return new User(
    {
      name: 'Matheus',
      email: 'matheus@email.com',
      password: '123',
      ...props,
    },
    id,
  );
};
