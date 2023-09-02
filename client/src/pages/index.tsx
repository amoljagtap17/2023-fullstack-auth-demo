import { Login, Products } from "@/components/sections";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>Fullstack Auth Demo</title>
        <meta name="description" content="Fullstack Auth Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home Page!</h1>
      <Login />
      {status === "authenticated" ? <Products /> : null}
    </>
  );
}
