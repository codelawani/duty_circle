import { LoginButton, LogoutButton } from './buttons.component';
export default function Header() {
  return (
    <div className='mt-4 ml-4'>
      <LoginButton /> <LogoutButton />
    </div>
  );
}
