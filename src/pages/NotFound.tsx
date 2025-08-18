import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-dvh grid place-items-center p-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">404</h1>
        <p className="mt-2">Page not found.</p>
        <Link to="/" className="underline mt-3 inline-block">
          Go home
        </Link>
      </div>
    </main>
  );
}
