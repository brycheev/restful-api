import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ICreateUser, IGetUser } from './models/user.models';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  private readonly userRepository: Repository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity)
    userRepository: Repository<UserEntity>,
  ) {
    this.userRepository = userRepository;
  }

  async get(payload: IGetUser): Promise<UserEntity> {
    const { id, email } = payload;

    const user = await this.userRepository.findOne({
      where: [{ id }, { email }],
    });

    return user;
  }

  async create(payload: ICreateUser): Promise<UserEntity> {
    const user = await this.userRepository.save(payload);

    return user;
  }
}
