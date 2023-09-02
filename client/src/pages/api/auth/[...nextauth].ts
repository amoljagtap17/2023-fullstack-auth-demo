import NextAuth, { NextAuthOptions } from "next-auth";

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

export const authOptions: NextAuthOptions = {
  providers: [customOauthProvider],
  session: {
    strategy: "jwt",
    maxAge: 60 * parseInt(process.env.SESSION_TIMEOUT as string),
  },
  useSecureCookies: true,
};

export default NextAuth(authOptions);
