import { Module } from '@core/di'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
