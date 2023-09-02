import { signIn, signOut, useSession } from "next-auth/react";

export function Login() {
  const { data: session } = useSession();

  console.log("session::", session);

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
}
