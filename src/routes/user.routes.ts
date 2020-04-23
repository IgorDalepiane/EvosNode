import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'

const userRouter = Router()

userRouter.post('/register', async (request, response) => {
  const { email, password, confirmPassword } = request.body

  const createUserService = new CreateUserService()

  const user = await createUserService.execute({
    email,
    password,
    confirmPassword,
  })

  delete user.password

  return response.json(user)
})

// userRouter.post('/session', (request, response) => {

// })

export default userRouter
