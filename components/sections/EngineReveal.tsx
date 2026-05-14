import type { ReactNode } from "react";

type EngineRevealProps = {
  engineSlot?: ReactNode;
};

export function EngineReveal({ engineSlot }: EngineRevealProps) {
  return (
    <section
      id="engineering"
      data-scroll-section="engine"
      className="relative bg-ink z-20 hair-t"
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 pt-24 pb-10">
        <div className="flex items-center justify-between text-[11px] tracking-wider2 uppercase text-mute">
          <div className="flex items-center gap-3">
            <span className="section-index">03</span>
            <span className="w-8 h-px bg-mute/40" />
            <span>Pogonska grupa</span>
          </div>
          <div className="hidden md:block">M177 · V8 Biturbo</div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 pb-32">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <div className="relative aspect-[5/6] lg:aspect-[4/5] w-full border hair">
              <span className="absolute -top-px -left-px w-6 h-6 border-t border-l border-chrome2/60" />
              <span className="absolute -top-px -right-px w-6 h-6 border-t border-r border-chrome2/60" />
              <span className="absolute -bottom-px -left-px w-6 h-6 border-b border-l border-chrome2/60" />
              <span className="absolute -bottom-px -right-px w-6 h-6 border-b border-r border-chrome2/60" />

              {engineSlot ?? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-display text-[11px] tracking-ultra uppercase text-mute">
                      [ 3D Engine ]
                    </div>
                    <div className="text-[10px] tracking-wider2 uppercase text-mute/60 mt-2">
                      Reserved slot
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute top-4 left-4 text-[10px] tracking-ultra uppercase text-mute/80 pointer-events-none">
                Pogled · Izometrija
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] tracking-ultra uppercase text-mute/80 pointer-events-none">
                Skala · 1:1
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between gap-12 lg:gap-8 lg:py-8">
            <div>
              <div className="text-[11px] tracking-ultra uppercase text-mute mb-4">
                Sažetak
              </div>
              <h2 className="font-display font-light text-4xl lg:text-5xl leading-[1.02] tracking-tight">
                Osam cilindara.
                <br />
                Biturbo punjenje.
                <br />
                Trenutni odziv.
              </h2>
              <p className="mt-6 text-mute text-[14px] leading-relaxed max-w-sm">
                Dva turbo punjača smeštena u V-formaciji isporučuju 850 Nm
                obrtnog momenta od najnižih obrtaja. Bez kašnjenja, bez
                kompromisa.
              </p>
            </div>

            <ul className="flex flex-col gap-px bg-line">
              <li className="bg-ink flex items-center py-5">
                <div className="w-16 flex items-center">
                  <span className="w-2 h-2 rounded-full chrome-bg" />
                  <span className="flex-1 h-px chrome-rule opacity-70 ml-3" />
                </div>
                <div className="flex-1 flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-[10px] tracking-ultra uppercase text-mute">
                      Zapremina
                    </div>
                    <div className="font-display text-2xl mt-1">3.982 cm³</div>
                  </div>
                  <div className="text-[10px] tracking-wider2 uppercase text-mute/70">
                    — 01
                  </div>
                </div>
              </li>

              <li className="bg-ink flex items-center py-5">
                <div className="w-16 flex items-center">
                  <span className="w-2 h-2 rounded-full chrome-bg" />
                  <span className="flex-1 h-px chrome-rule opacity-70 ml-3" />
                </div>
                <div className="flex-1 flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-[10px] tracking-ultra uppercase text-mute">
                      Snaga
                    </div>
                    <div className="font-display text-2xl mt-1">
                      <span className="chrome-text">612</span>
                      <span className="text-mute text-base ml-1">
                        KS / 450 kW
                      </span>
                    </div>
                  </div>
                  <div className="text-[10px] tracking-wider2 uppercase text-mute/70">
                    — 02
                  </div>
                </div>
              </li>

              <li className="bg-ink flex items-center py-5">
                <div className="w-16 flex items-center">
                  <span className="w-2 h-2 rounded-full chrome-bg" />
                  <span className="flex-1 h-px chrome-rule opacity-70 ml-3" />
                </div>
                <div className="flex-1 flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-[10px] tracking-ultra uppercase text-mute">
                      Obrtni moment
                    </div>
                    <div className="font-display text-2xl mt-1">
                      <span className="chrome-text">850</span>
                      <span className="text-mute text-base ml-1">Nm</span>
                    </div>
                  </div>
                  <div className="text-[10px] tracking-wider2 uppercase text-mute/70">
                    — 03
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
