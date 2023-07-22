import { Injectable } from '@nestjs/common';
import { ApiRepository } from '../repository/api.repository';
import * as  bcrypt from 'bcrypt';

@Injectable()
export class ApiService {
  constructor(private readonly ApiRepository: ApiRepository) { }

  async registrationUser(name: string, surname: string, email: string, pwd: string) {
    const existingUser = await this.ApiRepository.getUserByEmailDB(email);

    if (existingUser.length) throw new Error('user with this email already exists');

    const hashed = await bcrypt.hash(pwd, 10);
    const data = await this.ApiRepository.registrationUserDB(name, surname, email, hashed);
    if (!data.length) throw new Error('user does not create');
    return data;
  }



  async authorizationUser(email: string, pwd: string) {
    console.log("cor")
    const existingUser = await this.ApiRepository.getUserByEmailDB(email);
    if (!existingUser) throw new Error('user not exists');

    const isMatched = await bcrypt.compare(pwd, existingUser[0].pwd);
    if (!isMatched) throw new Error('password is wrong');

    console.log(existingUser);
    return existingUser;
  }
}
