type Model = {
  segment: string;
  name: string;
  index: string;
  power: string;
  accel: string;
  price: string;
  silhouette: "sedan-s" | "sedan-e" | "suv-gle";
};

const MODELS: Model[] = [
  {
    segment: "Limuzina",
    name: "S-Klasa",
    index: "01",
    power: "503 KS",
    accel: "4,3 s",
    price: "€129.500",
    silhouette: "sedan-s",
  },
  {
    segment: "Limuzina",
    name: "E-Klasa",
    index: "02",
    power: "381 KS",
    accel: "4,9 s",
    price: "€78.900",
    silhouette: "sedan-e",
  },
  {
    segment: "SUV",
    name: "GLE",
    index: "03",
    power: "456 KS",
    accel: "5,3 s",
    price: "€96.200",
    silhouette: "suv-gle",
  },
];

function Silhouette({ kind }: { kind: Model["silhouette"] }) {
  if (kind === "sedan-s") {
    return (
      <svg
        viewBox="0 0 320 110"
        className="w-[80%] opacity-90"
        fill="none"
        stroke="#9A9A9A"
        strokeWidth="1"
      >
        <path d="M10 78 L40 76 L70 60 L120 48 L200 46 L260 56 L290 68 L310 78 L300 86 L260 88 L40 88 L10 86 Z" />
        <circle cx="80" cy="86" r="14" />
        <circle cx="240" cy="86" r="14" />
        <circle cx="80" cy="86" r="6" strokeOpacity="0.5" />
        <circle cx="240" cy="86" r="6" strokeOpacity="0.5" />
      </svg>
    );
  }
  if (kind === "sedan-e") {
    return (
      <svg
        viewBox="0 0 320 110"
        className="w-[80%] opacity-90"
        fill="none"
        stroke="#9A9A9A"
        strokeWidth="1"
      >
        <path d="M14 78 L44 74 L74 56 L130 44 L210 44 L260 54 L294 66 L308 78 L298 86 L260 88 L44 88 L14 86 Z" />
        <circle cx="84" cy="86" r="14" />
        <circle cx="244" cy="86" r="14" />
        <circle cx="84" cy="86" r="6" strokeOpacity="0.5" />
        <circle cx="244" cy="86" r="6" strokeOpacity="0.5" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 320 110"
      className="w-[80%] opacity-90"
      fill="none"
      stroke="#9A9A9A"
      strokeWidth="1"
    >
      <path d="M14 80 L40 78 L62 50 L100 38 L210 38 L250 46 L292 60 L308 76 L298 88 L40 88 L14 86 Z" />
      <circle cx="78" cy="88" r="16" />
      <circle cx="242" cy="88" r="16" />
      <circle cx="78" cy="88" r="7" strokeOpacity="0.5" />
      <circle cx="242" cy="88" r="7" strokeOpacity="0.5" />
    </svg>
  );
}

export function Models() {
  return (
    <section
      id="models"
      data-scroll-section="models"
      className="relative bg-ink z-20 hair-t"
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 pt-24 pb-10">
        <div className="flex items-center justify-between text-[11px] tracking-wider2 uppercase text-mute">
          <div className="flex items-center gap-3">
            <span className="section-index">05</span>
            <span className="w-8 h-px bg-mute/40" />
            <span>Modeli u salonu</span>
          </div>
          <a href="#" className="hover:text-paper transition-colors">
            Pogledaj sve →
          </a>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 pb-32">
        <div className="flex items-end justify-between mb-16">
          <h2 className="font-display font-light text-5xl lg:text-7xl leading-[0.95] tracking-tight">
            Tri ikone.
          </h2>
          <div className="text-[12px] text-mute max-w-xs hidden md:block">
            Svaki model dostupan za testiranje uz prethodnu najavu. Dostava širom
            regiona.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line">
          {MODELS.map((m) => (
            <a
              key={m.name}
              href="#"
              className="group bg-ink p-8 flex flex-col gap-8 hover:bg-[#0F0F0F] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] tracking-ultra uppercase text-mute">
                    {m.segment}
                  </div>
                  <div className="font-display text-3xl mt-2">{m.name}</div>
                </div>
                <div className="text-[10px] tracking-wider2 uppercase text-mute/70">
                  — {m.index}
                </div>
              </div>

              <div className="aspect-[16/9] w-full bg-gradient-to-b from-[#141414] to-[#0A0A0A] border hair flex items-center justify-center">
                <Silhouette kind={m.silhouette} />
              </div>

              <div className="grid grid-cols-3 gap-4 text-[11px]">
                <div>
                  <div className="text-mute tracking-wider2 uppercase text-[10px]">
                    Snaga
                  </div>
                  <div className="font-display mt-1">{m.power}</div>
                </div>
                <div>
                  <div className="text-mute tracking-wider2 uppercase text-[10px]">
                    0–100
                  </div>
                  <div className="font-display mt-1">{m.accel}</div>
                </div>
                <div>
                  <div className="text-mute tracking-wider2 uppercase text-[10px]">
                    Od
                  </div>
                  <div className="font-display mt-1">{m.price}</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 hair-t">
                <span className="text-[11px] tracking-wider2 uppercase">
                  Konfiguriši
                </span>
                <span className="w-7 h-7 rounded-full border hair flex items-center justify-center group-hover:chrome-bg group-hover:text-ink transition-all">
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden
                  >
                    <path
                      d="M3 8 L13 8 M9 4 L13 8 L9 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
