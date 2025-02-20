import { Star } from 'lucide-react';

interface RepositoryCardProps {
  name: string;
  description: string | null;
  starCount: number | null;
}

export default function RepositoryCard({
  name,
  description,
  starCount = 0,
}: RepositoryCardProps) {
  return (
    <div className="flex min-h-24 items-start rounded bg-gray-200 p-3">
      <div className="flex-1 overflow-hidden break-words">
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-sm">{description}</div>
      </div>
      <div className="flex w-10 items-center gap-1">
        <div className="text-sm font-semibold">{starCount}</div>
        <Star size="16" fill="black" />
      </div>
    </div>
  );
}
