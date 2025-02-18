import { useSearchParams } from 'react-router';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui';

import { useGetUsers } from './useGetUsers';
import { UserListSkeleton } from './UserListSkeleton';
import UserRepositoriesList from './UserRepositoriesList';

export default function UserList() {
  const [searchParams] = useSearchParams();

  const username = searchParams.get('username') ?? '';
  const { isLoading, error, data } = useGetUsers(username);

  if (isLoading) {
    return <UserListSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full text-center" role="alert">
        <p className="text-destructive">Error fetching the user data</p>
      </div>
    );
  }

  if (!username) {
    return null;
  }

  if (data?.length === 0) {
    return (
      <div className="w-full text-left md:text-center" role="status">
        <p>{`No users available with username "${username}"`}</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 w-full text-left md:text-center" role="status">
        <p>{`Showing user${data.length === 1 ? '' : 's'} for "${username}"`}</p>
      </div>

      <Accordion type="multiple" className="space-y-2">
        {data.map((item) => (
          <AccordionItem key={item.id} value={item.login}>
            <AccordionTrigger className="bg-input-background px-4 font-semibold">
              {item.login}
            </AccordionTrigger>
            <AccordionContent>
              <UserRepositoriesList username={item.login} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
