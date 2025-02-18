export function UserListSkeleton() {
  return (
    <div>
      <div className="animate-pulse">
        <div className="m-auto h-8 w-1/2 rounded bg-gray-200" />
      </div>

      <div className="my-5 space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-10 w-full rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
