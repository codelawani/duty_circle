'use client';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';

export const LoginButton = () => {
  const { status } = useSession();
  return (
    <>
      {status !== 'authenticated' ? (
        <Button
          className='hover:bg-accent hover:text-accent-foreground  bg-gradient text-black border-x-main-dark border border-y-cool-dark'
          onClick={() => signIn()}
        >
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
        <Button
          className='hover:bg-accent hover:text-accent-foreground
          bg-gradient text-black border-x-cool-light border border-y-main-light'
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      ) : null}
    </>
  );
};
