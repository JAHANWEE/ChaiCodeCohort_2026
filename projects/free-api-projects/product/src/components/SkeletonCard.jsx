import './SkeletonCard.css';

export default function SkeletonCard({ view }) {
  if (view === 'list') {
    return (
      <div className="skeleton-row" aria-hidden="true">
        <div className="skel skel-img-sm" />
        <div className="skel-info">
          <div className="skel skel-line short" />
          <div className="skel skel-line medium" />
          <div className="skel skel-line short" />
        </div>
        <div className="skel-desc">
          <div className="skel skel-line full" />
          <div className="skel skel-line medium" />
        </div>
        <div className="skel-meta">
          <div className="skel skel-line short" />
          <div className="skel skel-line short" />
        </div>
      </div>
    );
  }

  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skel skel-img" />
      <div className="skel-body">
        <div className="skel skel-line short" />
        <div className="skel skel-line medium" />
        <div className="skel skel-line short" />
        <div className="skel skel-line short" />
        <div className="skel skel-line medium" />
      </div>
    </div>
  );
}
