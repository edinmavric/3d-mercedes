import { LenisProvider } from "@/components/scroll/LenisProvider";
import { HeroSceneMount } from "@/components/scene/HeroSceneMount";
import { EngineSceneMount } from "@/components/scene/EngineSceneMount";
import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/sections/Hero";
import { ScenePin } from "@/components/sections/ScenePin";
import { EngineReveal } from "@/components/sections/EngineReveal";
import { Performance } from "@/components/sections/Performance";
import { Models } from "@/components/sections/Models";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <LenisProvider>
      <div id="canvas-root" aria-hidden="true" />
      <HeroSceneMount />
      <Nav />
      <main className="relative">
        <Hero />
        <ScenePin />
        <EngineReveal engineSlot={<EngineSceneMount />} />
        <Performance />
        <Models />
        <SiteFooter />
      </main>
    </LenisProvider>
  );
}
