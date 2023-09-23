import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Request } from 'express';
import { UsersService } from './users/users.service';
import { ApiTags } from '@nestjs/swagger';
const admin = require('./config/firebase.config');

@UseGuards(AuthGuard)
@ApiTags('Authentication')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async getHello(@Req() request: Request) {
    const token = request.headers.token;
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);
    return this.appService.getHello();
  }
}
