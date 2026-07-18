import { projects } from '../data';

// All scroll animation handled centrally in App.tsx → initProjects()
export default function Projects() {
  return (
    <section id="projects" className="project-wrapper relative">
      <div className="project-sticky sticky top-0 h-screen w-full flex flex-col px-6 md:px-10 pt-24 pb-6">
        {/* Header row */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="section-line w-0 h-px bg-primary/30" />
            <h2 className="text-xs uppercase tracking-[0.3em] font-medium">Selected Work</h2>
          </div>
          <div className="project-counter flex items-baseline gap-1.5">
            <span className="counter-current text-3xl md:text-4xl font-serif font-semibold leading-none tabular-nums">01</span>
            <span className="text-sm opacity-20 font-light">/</span>
            <span className="text-sm opacity-20 font-light">{String(projects.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-black/5 mb-4 rounded-full overflow-hidden">
          <div className="project-progress h-full bg-accent rounded-full" style={{ width: '0%' }} />
        </div>

        {/* Card stack */}
        <div className="project-stack relative flex-1 w-full overflow-hidden rounded-2xl border border-black/[0.04]">
          {projects.map((p, i) => (
            <div
              key={p.index}
              className="project-card absolute inset-0 flex flex-col md:flex-row rounded-2xl overflow-hidden cursor-pointer group"
              style={{ zIndex: (projects.length - i) * 10 }}
            >
              {/* Info */}
              <div className={`project-info w-full md:w-[40%] p-6 md:p-10 flex flex-col justify-between ${p.infoBg} relative z-10`}>
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[11px] font-mono font-medium opacity-25">{p.index}</span>
                    <div className="flex gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="project-tag text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/[0.03] font-medium opacity-50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="project-title text-4xl md:text-6xl font-serif font-semibold tracking-tight leading-none mb-6">
                    {p.title}
                  </h3>
                  <div className="project-desc">
                    <p className="text-sm md:text-base opacity-50 leading-relaxed max-w-sm">{p.description}</p>
                  </div>
                </div>
                <div className="project-cta flex items-center gap-3">
                  <span className="text-xs uppercase tracking-[0.2em] font-medium opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">
                    View project
                  </span>
                  <span className="text-sm opacity-40 group-hover:opacity-100 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">→</span>
                </div>
              </div>

              {/* Media */}
              <div className={`project-media w-full md:w-[60%] h-[240px] md:h-auto overflow-hidden relative ${p.mediaBg}`}>
                <img
                  src={p.image}
                  className="project-img w-full h-full object-cover"
                  alt={p.imageAlt}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
