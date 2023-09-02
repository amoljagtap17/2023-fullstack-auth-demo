import hkdf from "@panva/hkdf";
import { EncryptJWT, jwtDecrypt } from "jose";
import NextAuth, { NextAuthOptions } from "next-auth";
// @ts-ignore
import { v4 as uuid } from "uuid";

const customOauthProvider: any = {
  id: process.env.AUTH_PROVIDER as string,
  name: process.env.AUTH_PROVIDER as string,
  type: "oauth",
  version: "2.0",
  clientId: process.env.AUTH_CLIENT_ID as string,
  clientSecret: process.env.AUTH_CLIENT_SECRET as string,
  params: { grant_type: "authorization_code" },
  wellKnown: process.env.AUTH_URL_WELLKNOWN as string,
  authorization: { params: { scope: "openid email profile" } },
  idToken: true,
  checks: ["pkce", "state"],
  profile(profile: any) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
    };
  },
};

const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

const now = () => (Date.now() / 1000) | 0;

async function getDerivedEncryptionKey(secret: string | Buffer) {
  return await hkdf(
    "sha256",
    secret,
    "",
    "Private Generated Encryption Key",
    32
  );
}

export const authOptions: NextAuthOptions = {
  providers: [customOauthProvider],
  session: {
    strategy: "jwt",
    maxAge: 60 * parseInt(process.env.SESSION_TIMEOUT as string),
  },
  useSecureCookies: false,
  jwt: {
    async encode(params) {
      const { token = {}, secret, maxAge = DEFAULT_MAX_AGE } = params;
      const encryptionSecret = await getDerivedEncryptionKey(secret);

      return await new EncryptJWT(token)
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .setIssuedAt()
        .setExpirationTime(now() + maxAge)
        .setJti(uuid())
        .encrypt(encryptionSecret);
    },
    async decode(params) {
      const { token, secret } = params;

      if (!token) return null;

      const encryptionSecret = await getDerivedEncryptionKey(secret);
      const { payload } = await jwtDecrypt(token, encryptionSecret, {
        clockTolerance: 15,
      });

      return payload;
    },
  },
};

export default NextAuth(authOptions);
