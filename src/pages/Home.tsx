import { UserList, UserSearchForm } from '@/features';

export default function Home() {
  return (
    <main className="m-auto w-full max-w-5xl p-12">
      <UserSearchForm />
      <UserList />
    </main>
  );
}
