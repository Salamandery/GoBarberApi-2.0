import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateAvatarUserService from '@modules/users/services/UpdateAvatarUserService';

describe('UpdateAvatarUser', () => {
  it('should be able to upload your avatar profile', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateAvatarUser = new UpdateAvatarUserService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateAvatarUser.execute({
      id: user.id,
      filename: 'avatar.jpg',
    });

    expect(user).toHaveProperty('avatar', 'avatar.jpg');
  });

  it('should be able to update your avatar profile', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFileFunction = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateAvatarUser = new UpdateAvatarUserService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateAvatarUser.execute({
      id: user.id,
      filename: 'avatar.jpg',
    });

    await updateAvatarUser.execute({
      id: user.id,
      filename: 'newAvatar.jpg',
    });

    expect(deleteFileFunction).toHaveBeenCalledWith('avatar.jpg');

    expect(user).toHaveProperty('avatar', 'newAvatar.jpg');
  });

  it('should not be able to upload avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateAvatarUser = new UpdateAvatarUserService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateAvatarUser.execute({
        id: 'non-user',
        filename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
