import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { story } from '../data';

export default function Story() {
  const wrapperRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const imageWrap = imageWrapRef.current;
    if (!wrapper || !imageWrap) return;

    gsap.to(imageWrap, {
      height: '80vh',
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    const img = imageWrap.querySelector<HTMLElement>('img');
    if (img) {
      gsap.to(img, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    const mobileImg = wrapper.querySelector<HTMLElement>('.img-reveal');
    if (mobileImg) {
      gsap.to(mobileImg, {
        clipPath: 'inset(0 0 0 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: mobileImg,
          start: 'top 85%',
          once: true,
        },
      });
    }
  }, { scope: wrapperRef });
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
    <section id="story" ref={wrapperRef} className="story-wrapper relative bg-bg py-32 md:py-0">
      <div className="story-sticky sticky top-0 min-h-screen w-full flex flex-col md:flex-row items-stretch px-6 md:px-10">
        {/* Desktop image — height animated by GSAP from 0 → 80vh */}
        <div className="hidden md:flex w-full md:w-[45%] items-center py-20">
          <div ref={imageWrapRef} className="story-image-wrap w-full h-0 rounded-2xl overflow-hidden">
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
