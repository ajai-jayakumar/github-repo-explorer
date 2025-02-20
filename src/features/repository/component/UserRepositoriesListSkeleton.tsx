export default function UserRepositoriesListSkeleton() {
  return (
    <div
      className="my-3 ml-6 grid grid-cols-1 gap-2 md:grid-cols-2"
      data-testid="repositories-list-skeleton"
    >
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-30 w-full rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
