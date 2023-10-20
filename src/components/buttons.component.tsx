'use client';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export const LoginButton = () => {
  const { status } = useSession();
  return (
    <>
      {status !== 'authenticated' ? (
        <button className=' text-sky-600' onClick={() => signIn()}>
          Sign In{' '}
        </button>
      ) : null}
    </>
  );
};
export const LogoutButton = () => {
  const { status } = useSession();
  return (
    <>
      {status === 'authenticated' ? (
        <button className=' text-red-500' onClick={() => signOut()}>
          Sign Out
        </button>
      ) : null}
    </>
  );
};
