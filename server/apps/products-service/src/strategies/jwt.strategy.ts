import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { cookieExtractor } from '../utils/cookie';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: 'abc123',
    });
  }

  async validate(payload: any) {
    console.log('JwtStrategy::', payload);

    return payload;
  }
}
