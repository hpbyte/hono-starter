import { Injectable } from '@core/di'
import type { HttpController } from '@shared/types/http'
import type { Hono } from 'hono'
import { UserService } from './user.service'

@Injectable()
export class UserController implements HttpController {
  constructor(private readonly userService: UserService) {}

  registerRoutes(app: Hono) {
    app.get('/users', async (context) => {
      const users = await this.userService.getUsers()
      return context.json(users)
    })
  }
}
