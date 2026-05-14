export function Hero() {
  return (
    <section
      data-scroll-section="hero"
      className="relative min-h-screen flex flex-col justify-between pt-[72px]"
    >
      <div className="max-w-[1600px] mx-auto w-full px-8 lg:px-12 pt-12 flex items-start justify-between text-[11px] tracking-wider2 uppercase text-mute">
        <div className="flex items-center gap-3">
          <span className="section-index">01</span>
          <span className="w-8 h-px bg-mute/40" />
          <span>Hero</span>
        </div>
        <div className="text-right leading-relaxed hidden md:block">
          <div>43°08′ N · 20°31′ E</div>
          <div>Novi Pazar — Srbija</div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full px-8 lg:px-12 flex-1 flex items-center">
        <div className="w-full">
          <div className="flex items-center gap-6 mb-10">
            <span className="text-[11px] tracking-ultra uppercase text-mute">
              — Edicija 2026
            </span>
            <span className="h-px flex-1 chrome-rule opacity-70" />
          </div>

          <h1 className="font-display font-light leading-[0.92] tracking-[-0.02em] text-[18vw] md:text-[14vw] lg:text-[11.5vw] chrome-text">
            Inženjerska
            <br />
            perfekcija.
          </h1>

          <div className="mt-12 grid grid-cols-12 gap-6">
            <p className="col-span-12 md:col-span-5 md:col-start-7 text-mute text-[15px] leading-relaxed max-w-md">
              Sedamdeset godina preciznosti, sažeto u jednom potezu kontrolnog
              ramena. Otkrijte vozila koja redefinišu odnos između čoveka i mašine
              — dostupna u salonu Mercedes-Benz Novi Pazar.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full px-8 lg:px-12 pb-10 flex items-end justify-between">
        <div className="text-[11px] tracking-wider2 uppercase text-mute leading-relaxed">
          <div>Salon &amp; ovlašćeni servis</div>
          <div className="text-paper/70 mt-1">Od 1998.</div>
        </div>

        <div className="flex flex-col items-center gap-4 text-mute">
          <span className="text-[10px] tracking-ultra uppercase">Skroluj</span>
          <div className="relative w-px h-16 bg-line scroll-drip" />
        </div>

        <div className="text-right text-[11px] tracking-wider2 uppercase text-mute leading-relaxed">
          <div>Šest modela</div>
          <div className="text-paper/70 mt-1">U izložbenom prostoru</div>
        </div>
      </div>
    </section>
  );
}
