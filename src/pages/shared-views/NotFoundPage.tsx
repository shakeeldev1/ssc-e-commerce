import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-bold text-slate-900">404</h1>
      <p className="mt-2 text-slate-500">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 font-medium text-brand-600 hover:text-brand-700">
        Back to home
      </Link>
    </div>
  );
};
