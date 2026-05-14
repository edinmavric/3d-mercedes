export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-ink/70 hair-b">
        <nav className="max-w-[1600px] mx-auto px-8 lg:px-12 h-[72px] flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <svg
              viewBox="0 0 40 40"
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              aria-hidden
            >
              <circle cx="20" cy="20" r="18.5" />
              <circle cx="20" cy="20" r="14" strokeOpacity="0.35" />
              <path
                d="M20 6 L20 20 M20 20 L7.9 27 M20 20 L32.1 27"
                strokeLinecap="round"
              />
            </svg>
            <div className="leading-none">
              <div className="font-display text-[15px] tracking-wider2 uppercase">
                Mercedes-Benz
              </div>
              <div className="text-[10px] tracking-ultra uppercase text-mute mt-1">
                Novi Pazar
              </div>
            </div>
          </a>

          <ul className="hidden lg:flex items-center gap-10 text-[12px] tracking-wider2 uppercase">
            <li>
              <a
                href="#models"
                className="hover:text-white text-mute transition-colors"
              >
                Modeli
              </a>
            </li>
            <li>
              <a
                href="#engineering"
                className="hover:text-white text-mute transition-colors"
              >
                Inženjering
              </a>
            </li>
            <li>
              <a
                href="#performance"
                className="hover:text-white text-mute transition-colors"
              >
                Performanse
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-white text-mute transition-colors"
              >
                Kontakt
              </a>
            </li>
          </ul>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 pl-5 pr-2 py-2 border hair rounded-full hover:border-chrome2 transition-colors"
          >
            <span className="text-[11px] tracking-wider2 uppercase">
              Zakaži probnu vožnju
            </span>
            <span className="w-7 h-7 rounded-full chrome-bg flex items-center justify-center text-ink">
              <svg
                viewBox="0 0 16 16"
                className="w-3 h-3"
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
        </nav>
      </div>
    </header>
  );
}
