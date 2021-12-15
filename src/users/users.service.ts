import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOneOrFail(
    conditions?: FindConditions<User>,
    options?: FindOneOptions<User>,
    ){
    try{
      return this.userRepository.findOneOrFail(conditions, options)
    }catch(error){
      throw new NotFoundException(error.message)
    }
  }
  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneOrFail({ id });
    this.userRepository.merge(user, updateUserDto)
    return this.userRepository.save(user)
  }

  remove(id: string) {
    return this.userRepository.delete(id)
  }
}
