import { Controller, Get, Header, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
const admin = require('../config/firebase.config');

@UseGuards(AuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('auth')
  async getAuthenticatedUser(@Req() request: Request) {
    const token = request.headers?.token;
    const decodedToken = await admin.auth().verifyIdToken(token);
    return this.usersService.createUser({ email: decodedToken.email });
  }
}
