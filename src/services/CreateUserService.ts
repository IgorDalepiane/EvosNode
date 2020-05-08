import { getRepository } from 'typeorm'
import { hash } from 'bcrypt'
import { isValid } from 'cpf'
import phone from 'phone'

import User from '../models/User'
import AppError from '../errors/AppError'

interface Request {
  email: string
  password: string
  confirmPassword: string
  phoneNum: string
  cpf: string
}

class CreateUserService {
  public async execute({
    email,
    password,
    confirmPassword,
    phoneNum,
    cpf,
  }: Request): Promise<User> {
    const userRepository = getRepository(User)

    const userExists = await userRepository.findOne({ where: { email } })

    if (userExists) {
      throw new AppError('Email already in use.', 400)
    }

    if (password !== confirmPassword) {
      throw new AppError('The passwords do not match.', 400)
    }

    if (!isValid(cpf)) {
      throw new AppError('Invalid CPF.', 400)
    }

    // TODO: disparar sms de validacao

    const username = email.split('@')[0]

    const hashedPassword = await hash(password, 8)

    const formattedPhoneNum = phone(phoneNum, 'BR')[0]

    const user = userRepository.create({
      email,
      password: hashedPassword,
      cpf,
      phoneNum: formattedPhoneNum,
      username,
    })

    await userRepository.save(user)

    return user
  }
}

export default CreateUserService
