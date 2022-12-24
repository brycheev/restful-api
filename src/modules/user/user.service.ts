import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ICreateUser, IGetUser } from './models/user.models';
import { UserEntity } from './entities/user.entity';
import { USER_EXIST, USER_NOT_FOUND } from './user.exceptions';

@Injectable()
export class UserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async get(payload: IGetUser): Promise<UserEntity> {
    const user = await this.userRepository.get(payload);

    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND);
    }

    return user;
  }

  async create(payload: ICreateUser): Promise<UserEntity> {
    const existedUser = await this.userRepository.get({
      email: payload.email,
    });
    if (existedUser) {
      throw new BadRequestException(USER_EXIST);
    }

    const user = await this.userRepository.create(payload);

    return user;
  }
}
