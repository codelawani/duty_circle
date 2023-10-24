'use client';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';

export const LoginButton = () => {
  const { status } = useSession();
  return (
    <>
      {status !== 'authenticated' ? (
        <Button className=' text-sky-600' onClick={() => signIn()}>
          Sign In{' '}
        </Button>
      ) : null}
    </>
  );
};
export const LogoutButton = () => {
  const { status } = useSession();
  return (
    <>
      {status === 'authenticated' ? (
        <Button className=' text-red-500' onClick={() => signOut()}>
          Sign Out
        </Button>
      ) : null}
    </>
  );
};
