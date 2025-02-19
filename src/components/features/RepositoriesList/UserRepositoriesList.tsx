import RepositoryCard from './RepositoryCard';
import { useGetUserRepositories } from './useGetUserRepositories';
import UserRepositoriesListSkeleton from './UserRepositoriesListSkeleton';

export default function UserRepositoriesList({
  username,
}: {
  username: string;
}) {
  const { isLoading, error, data } = useGetUserRepositories(username);

  if (isLoading) {
    return <UserRepositoriesListSkeleton />;
  }

  // Would use a common error boundary type layout to have consistent UI and
  // avoid repetation of code in production grade project.
  if (error) {
    return (
      <div className="w-full text-center" role="alert">
        <p className="text-destructive">
          Error fetching the user repositories data
        </p>
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="my-4 w-full text-left md:text-center" role="status">
        <p>{`No repositories available for "${username}"`}</p>
      </div>
    );
  }

  return (
    <div className="my-3 ml-6 grid grid-cols-1 gap-2 md:grid-cols-2">
      {data.map((item) => (
        <RepositoryCard
          key={item.id}
          name={item.name}
          description={item.description}
          starCount={item.stargazers_count}
        />
      ))}
    </div>
  );
}
