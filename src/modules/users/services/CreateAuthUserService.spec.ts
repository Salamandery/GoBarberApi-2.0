import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateAuthUserService from '@modules/users/services/CreateAuthUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate in application', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createAuthUserService = new CreateAuthUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const userAuthenticated = await createAuthUserService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(userAuthenticated).toHaveProperty('token');
    expect(userAuthenticated.user).toEqual(user);
  });

  it('should not be able to authenticate in application with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createAuthUserService = new CreateAuthUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      createAuthUserService.execute({
        email: 'johndoe@example.com',
        password: '123457',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate in application with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createAuthUserService = new CreateAuthUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      createAuthUserService.execute({
        email: 'johndoe@example.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
