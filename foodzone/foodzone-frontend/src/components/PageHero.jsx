export default function PageHero({ tag, title, subtitle, image, children }) {
  return (
    <section className="relative min-h-[42vh] flex items-end overflow-hidden bg-charcoal-900">
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/80 to-charcoal-900/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/90 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 w-full">
        <span className="gold-tag mb-5">{tag}</span>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-4 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-cream/60 mt-4 max-w-xl text-base md:text-lg leading-relaxed">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
