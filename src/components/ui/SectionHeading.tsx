import { Link } from 'react-router-dom';

export const SectionHeading = ({ title, viewAllHref }: { title: string; viewAllHref?: string }) => (
  <div className="mb-4 flex items-baseline justify-between">
    <h2 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h2>
    {viewAllHref && (
      <Link to={viewAllHref} className="text-sm font-medium text-brand-600 hover:text-brand-700">
        See all
      </Link>
    )}
  </div>
);
