export function ScenePin() {
  return (
    <section
      data-scroll-section="scene"
      className="relative h-[65vh] md:h-screen w-full overflow-hidden pointer-events-none"
    >
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
          <div className="max-w-[1600px] mx-auto flex items-end justify-between gap-4">
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
