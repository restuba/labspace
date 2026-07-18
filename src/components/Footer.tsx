import { site, footer } from '../data';

export default function Footer() {
  return (
    <footer className="bg-primary text-bg/70 px-6 md:px-10 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {footer.nav.map((item) => (
                <li key={item.label}><a href={item.href} className="footer-link">{item.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {footer.services.map((svc) => (
                <li key={svc}><a href="#services" className="footer-link">{svc}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4">Social</h4>
            <ul className="space-y-2 text-sm">
              {footer.social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link">
                    {item.label}
                    {' '}
                    ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] opacity-40 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href={`mailto:${site.email}`} className="footer-link">{site.email}</a></li>
              <li className="opacity-40">{site.location}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="font-serif text-3xl font-semibold text-bg tracking-tight">{site.name}</span>
          <span className="text-xs opacity-30">
            &copy;
            {site.year}
            {' '}
            {site.name}
            {' '}
            Digital. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
