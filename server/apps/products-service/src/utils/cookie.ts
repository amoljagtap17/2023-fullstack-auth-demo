import hkdf from '@panva/hkdf';
import { Request } from 'express';
import { jwtDecrypt } from 'jose';

export const cookieExtractor = async (req: Request) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['next-auth.session-token'];

    const encryptionSecret = await getDerivedEncryptionKey('');
    const { payload } = await jwtDecrypt(token, encryptionSecret, {
      clockTolerance: 15,
    });

    console.log('payload::', payload);

    token = payload;
  }

  return token;
};

async function getDerivedEncryptionKey(secret: string | Buffer) {
  return await hkdf(
    'sha256',
    secret,
    '',
    'Private Generated Encryption Key',
    32,
  );
}
