import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
const admin = require('../config/firebase.config');

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.token;

    // validate token
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({ code: 401, error });
    }
  }
}
