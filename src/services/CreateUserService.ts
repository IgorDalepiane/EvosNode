import { getRepository } from 'typeorm'
import { hash } from 'bcrypt'

import User from '../models/User'
import AppError from '../errors/AppError'

interface Request {
  email: string
  password: string
  confirmPassword: string
}

class CreateUserService {
  public async execute({
    email,
    password,
    confirmPassword,
  }: Request): Promise<User> {
    const userRepository = getRepository(User)

    const userExists = await userRepository.findOne({ where: { email } })

    if (userExists) {
      throw new AppError('Email already in use.', 400)
    }

    if (password !== confirmPassword) {
      throw new AppError('The passwords do not match.', 400)
    }

    const hashedPassword = await hash(password, 8)

    const user = userRepository.create({
      email,
      password: hashedPassword,
    })

    await userRepository.save(user)

    return user
  }
}

export default CreateUserService
