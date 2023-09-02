import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: function extractJWT(req: Request): string {
        console.log('req2::', req.cookies['next-auth.session-token']);

        return 'string';
      },
      ignoreExpiration: false,
      secretOrKey: 'abc123',
    });
  }

  async validate(payload: any) {
    console.log('JwtStrategy::', payload);

    return { userId: payload.sub, username: payload.username };
  }
}
