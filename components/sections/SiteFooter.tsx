export function SiteFooter() {
  return (
    <footer
      id="contact"
      data-scroll-section="footer"
      className="relative bg-ink z-20 hair-t"
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 pt-24 pb-12">
        <div className="flex items-center justify-between text-[11px] tracking-wider2 uppercase text-mute mb-16">
          <div className="flex items-center gap-3">
            <span className="section-index">06</span>
            <span className="w-8 h-px bg-mute/40" />
            <span>Kontakt</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="font-display font-light text-5xl lg:text-7xl leading-[0.95] tracking-tight chrome-text">
              Posetite
              <br />
              nas u salonu.
            </h2>
            <a
              href="#"
              className="mt-12 inline-flex items-center gap-3 pl-6 pr-2 py-3 border hair rounded-full hover:border-chrome2 transition-colors"
            >
              <span className="text-[11px] tracking-wider2 uppercase">
                Zakaži probnu vožnju
              </span>
              <span className="w-8 h-8 rounded-full chrome-bg flex items-center justify-center text-ink">
                <svg
                  viewBox="0 0 16 16"
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden
                >
                  <path
                    d="M3 8 L13 8 M9 4 L13 8 L9 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>

          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-8 lg:pt-4">
            <div>
              <div className="text-[10px] tracking-ultra uppercase text-mute">
                Adresa
              </div>
              <div className="font-display text-[15px] mt-4 leading-relaxed">
                Stevana Nemanje 142
                <br />
                36300 Novi Pazar
                <br />
                Srbija
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-ultra uppercase text-mute">
                Kontakt
              </div>
              <div className="font-display text-[15px] mt-4 leading-relaxed">
                +381 20 555 138
                <br />
                salon@mb-novipazar.rs
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-ultra uppercase text-mute">
                Radno vreme
              </div>
              <div className="font-display text-[15px] mt-4 leading-relaxed">
                Pon — Pet · 09–19h
                <br />
                Subota · 09–15h
                <br />
                <span className="text-mute">Nedelja · zatvoreno</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-ultra uppercase text-mute">
                Servis
              </div>
              <div className="font-display text-[15px] mt-4 leading-relaxed">
                +381 20 555 139
                <br />
                servis@mb-novipazar.rs
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 hair-t flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 40 40"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              aria-hidden
            >
              <circle cx="20" cy="20" r="18.5" />
              <path
                d="M20 6 L20 20 M20 20 L7.9 27 M20 20 L32.1 27"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-[10px] tracking-ultra uppercase text-mute">
              Mercedes-Benz · Ovlašćeni prodavac · Novi Pazar
            </div>
          </div>

          <ul className="flex items-center gap-8 text-[10px] tracking-wider2 uppercase text-mute">
            <li>
              <a href="#" className="hover:text-paper transition-colors">
                Politika privatnosti
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-paper transition-colors">
                Uslovi korišćenja
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-paper transition-colors">
                Kolačići
              </a>
            </li>
          </ul>

          <div className="text-[10px] tracking-ultra uppercase text-mute">
            © 2026 · Sva prava zadržana
          </div>
        </div>
      </div>
    </footer>
  );
}
