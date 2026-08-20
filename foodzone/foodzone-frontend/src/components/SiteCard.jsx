import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const fallbackImage =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" fill="%239ca3af" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';

export function SiteCard({
  image,
  imageAlt = "",
  badge,
  badgeDot = "#22c55e",
  title,
  description,
  tags = [],
  href,
  ctaText = "View Details",
  icon: Icon,
  iconWrapClass = "site-card-icon-wrap--orange",
  align = "left",
  footer,
  children,
  className = "",
  overlay,
  mediaChildren,
  onImageError,
}) {
  const visibleTags = tags.slice(0, 2);
  const extraTags = tags.length - visibleTags.length;
  const alignClass = align === "center" ? "site-card--center" : "";

  const handleImageError = (event) => {
    event.target.style.backgroundColor = "#f3f4f6";
    event.target.src = fallbackImage;
    onImageError?.(event);
  };

  return (
    <article className={`site-card ${alignClass} ${className}`.trim()}>
      {image && (
        <div className="site-card-media">
          <img
            src={image}
            alt={imageAlt || title || ""}
            className="site-card-image"
            onError={handleImageError}
          />
          {badge && (
            <span className="site-card-badge">
              <span className="site-card-badge-dot" style={{ backgroundColor: badgeDot }}></span>
              {badge}
            </span>
          )}
          {mediaChildren}
          {overlay}
          {!overlay && href && (
            <Link to={href} className="site-card-overlay">
              <span className="site-card-cta">
                <ArrowUpRight size={16} />
                {ctaText}
              </span>
            </Link>
          )}
        </div>
      )}

      <div className="site-card-body">
        {Icon && !image && (
          <div className={`site-card-icon-wrap ${iconWrapClass}`}>
            <Icon size={24} />
          </div>
        )}

        {children || (
          <>
            {title && <h3 className="site-card-title">{title}</h3>}
            {description && <p className="site-card-desc">{description}</p>}
            {tags.length > 0 && (
              <div className="site-card-tags">
                {visibleTags.map((tag) => (
                  <span key={tag} className="site-card-tag">{tag}</span>
                ))}
                {extraTags > 0 && <span className="site-card-tag">+{extraTags}</span>}
              </div>
            )}
          </>
        )}

        {footer}
      </div>
    </article>
  );
}

export function SiteStatCard({
  icon: Icon,
  iconWrapClass = "site-card-icon-wrap--orange",
  value,
  label,
  className = "",
}) {
  return (
    <article className={`site-card site-card--stat ${className}`.trim()}>
      <div className="site-card-body">
        <div className={`site-card-icon-wrap ${iconWrapClass}`}>
          <Icon size={24} />
        </div>
        <p className="site-card-stat-value">{value}</p>
        <p className="site-card-stat-label">{label}</p>
      </div>
    </article>
  );
}

export function SiteCardsGrid({ children, columns = 4, className = "", style }) {
  const columnClass = `site-cards-grid--${columns}`;
  return (
    <div className={`site-cards-grid ${columnClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
