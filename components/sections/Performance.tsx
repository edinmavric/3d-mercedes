export function Performance() {
  return (
    <section
      id="performance"
      data-scroll-section="performance"
      className="relative bg-ink z-20 hair-t"
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 pt-24 pb-10">
        <div className="flex items-center justify-between text-[11px] tracking-wider2 uppercase text-mute">
          <div className="flex items-center gap-3">
            <span className="section-index">04</span>
            <span className="w-8 h-px bg-mute/40" />
            <span>Performanse</span>
          </div>
          <div className="hidden md:block">Mereno · Nürburgring Nordschleife</div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 pb-32">
        <h2 className="font-display font-light text-5xl lg:text-7xl leading-[0.95] tracking-tight max-w-3xl">
          Brojevi koji govore
          <br />
          jezikom inženjera.
        </h2>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-0 hair-t">
          <div className="hair-b md:hair-r py-12 md:px-10">
            <div className="text-[10px] tracking-ultra uppercase text-mute">
              Ubrzanje 0–100
            </div>
            <div className="font-display font-light leading-none mt-6">
              <span className="text-[clamp(4rem,18vw,7rem)] md:text-[clamp(3rem,10vw,8.75rem)] chrome-text">4,1</span>
              <span className="text-3xl text-mute ml-2">s</span>
            </div>
            <div className="mt-6 text-[12px] text-mute leading-relaxed max-w-xs">
              Sa 4MATIC pogonom na sve točkove i Race Start funkcijom — bez
              gubitka trakcije.
            </div>
          </div>

          <div className="hair-b md:hair-r py-12 md:px-10">
            <div className="text-[10px] tracking-ultra uppercase text-mute">
              Maksimalna brzina
            </div>
            <div className="font-display font-light leading-none mt-6">
              <span className="text-[clamp(4rem,18vw,7rem)] md:text-[clamp(3rem,10vw,8.75rem)] chrome-text">250</span>
              <span className="text-3xl text-mute ml-2">km/h</span>
            </div>
            <div className="mt-6 text-[12px] text-mute leading-relaxed max-w-xs">
              Elektronski ograničena. AMG Driver&apos;s paket podiže granicu na
              300 km/h.
            </div>
          </div>

          <div className="hair-b py-12 md:px-10">
            <div className="text-[10px] tracking-ultra uppercase text-mute">
              Koeficijent otpora
            </div>
            <div className="font-display font-light leading-none mt-6">
              <span className="text-[clamp(4rem,18vw,7rem)] md:text-[clamp(3rem,10vw,8.75rem)] chrome-text">0,22</span>
              <span className="text-3xl text-mute ml-2">Cd</span>
            </div>
            <div className="mt-6 text-[12px] text-mute leading-relaxed max-w-xs">
              Aerodinamika referentne klase — najniža vrednost u segmentu
              luksuznih limuzina.
            </div>
          </div>
        </div>

        <div className="mt-px grid grid-cols-2 md:grid-cols-4 hair-b">
          <div className="hair-r py-6 md:px-10">
            <div className="text-[10px] tracking-ultra uppercase text-mute">
              Potrošnja
            </div>
            <div className="font-display text-2xl mt-2">
              7,4 <span className="text-mute text-sm">l/100km</span>
            </div>
          </div>
          <div className="hair-r py-6 md:px-10">
            <div className="text-[10px] tracking-ultra uppercase text-mute">
              CO₂
            </div>
            <div className="font-display text-2xl mt-2">
              169 <span className="text-mute text-sm">g/km</span>
            </div>
          </div>
          <div className="hair-r py-6 md:px-10">
            <div className="text-[10px] tracking-ultra uppercase text-mute">
              Domet
            </div>
            <div className="font-display text-2xl mt-2">
              1.080 <span className="text-mute text-sm">km</span>
            </div>
          </div>
          <div className="py-6 md:px-10">
            <div className="text-[10px] tracking-ultra uppercase text-mute">
              Masa
            </div>
            <div className="font-display text-2xl mt-2">
              2.065 <span className="text-mute text-sm">kg</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
