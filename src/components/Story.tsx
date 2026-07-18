import { story } from '../data';

// Scroll animation (image expand, parallax, reveal lines) handled in App.tsx → initStory() + initRevealLines()
export default function Story() {
  // "em:" prefix → italic
  const renderLine = (line: string, i: number) => {
    if (line.startsWith('em:')) {
      return (
        <span key={i} className="reveal-line" data-reveal>
          <em>{line.slice(3)}</em>
        </span>
      );
    }
    return <span key={i} className="reveal-line" data-reveal>{line}</span>;
  };

  return (
    <section id="story" className="story-wrapper relative bg-bg py-32 md:py-0">
      <div className="story-sticky sticky top-0 min-h-screen w-full flex flex-col md:flex-row items-stretch px-6 md:px-10">
        {/* Desktop image — height animated by GSAP from 0 → 80vh */}
        <div className="hidden md:flex w-full md:w-[45%] items-center py-20">
          <div className="story-image-wrap w-full h-0 rounded-2xl overflow-hidden">
            <img
              src={story.image}
              className="w-full h-[80vh] object-cover"
              alt={story.imageAlt}
            />
          </div>
        </div>

        {/* Text */}
        <div className="w-full md:w-[55%] flex flex-col justify-center md:pl-16 py-20">
          <span className="reveal-line inline-block text-xs uppercase tracking-[0.3em] font-medium opacity-40 mb-8" data-reveal>
            {story.label}
          </span>
          <h2 className="text-4xl md:text-[4vw] font-serif font-semibold leading-[1.1] tracking-tight mb-8">
            {story.titleLines.map(renderLine)}
          </h2>

          {/* Mobile image */}
          <div className="md:hidden w-full h-[300px] rounded-xl overflow-hidden mb-8 img-reveal">
            <img src={story.image} className="w-full h-full object-cover" alt={story.imageAlt} />
          </div>

          <p className="reveal-line text-base md:text-lg opacity-60 leading-relaxed max-w-lg" data-reveal>
            {story.body}
          </p>
        </div>
      </div>
    </section>
  );
}
