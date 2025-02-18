import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-primary text-4xl font-bold">404</h1>
      <p className="text-muted-foreground mt-4 text-lg">Oops! Page not found</p>
      <Link
        to="/"
        className="bg-primary mt-6 inline-block rounded px-4 py-2 text-white"
      >
        Go back to Home
      </Link>
    </div>
  );
}
