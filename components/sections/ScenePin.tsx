export function ScenePin() {
  return (
    <section
      data-scroll-section="scene"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Static mobile fallback — visible only when no 3D canvas mounted (below 768px) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center md:hidden">
        <svg
          viewBox="0 0 320 110"
          className="w-[78%] opacity-80"
          fill="none"
          stroke="#9A9A9A"
          strokeWidth="1"
          aria-hidden
        >
          <path d="M10 78 L40 76 L70 60 L120 48 L200 46 L260 56 L290 68 L310 78 L300 86 L260 88 L40 88 L10 86 Z" />
          <circle cx="80" cy="86" r="14" />
          <circle cx="240" cy="86" r="14" />
          <circle cx="80" cy="86" r="6" strokeOpacity="0.5" />
          <circle cx="240" cy="86" r="6" strokeOpacity="0.5" />
        </svg>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-10 left-0 right-0 px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto flex items-start justify-between text-[11px] tracking-wider2 uppercase text-mute">
            <div className="flex items-center gap-3">
              <span className="section-index">02</span>
              <span className="w-8 h-px bg-mute/40" />
              <span>Predstavljamo</span>
            </div>
            <div className="text-right">
              <div>S-Klasa · W223</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 px-8 lg:px-12">
          <div className="max-w-[1600px] mx-auto flex items-end justify-between">
            <div className="text-[10px] tracking-ultra uppercase text-mute leading-loose">
              <div>Rotacija · Auto</div>
              <div>Osvetljenje · Studio</div>
            </div>
            <div className="font-display text-[10px] tracking-ultra uppercase text-mute hidden md:block">
              Prevucite za interakciju
            </div>
            <div className="text-right text-[10px] tracking-ultra uppercase text-mute leading-loose">
              <div>Materijal · Obsidian Black</div>
              <div>Točkovi · AMG 21&quot;</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
