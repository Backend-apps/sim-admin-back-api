import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAll() {
    return this.userRepository.find();
  }

  async create(user: User): Promise<User> {
    try {
      return this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async editData(id: number, user: User): Promise<User> {
    try {
      await this.userRepository.update(id, user);
      return this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      return error;
    }
  }
}
