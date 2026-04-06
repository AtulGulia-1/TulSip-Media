import Link from "next/link";
import Image from "next/image";
import { LazyCamera3D } from "@/components/3d/LazyCamera3D";
import { CONFIG } from "@/lib/config";
import { SITE_COPY } from "@/lib/data/site-content";

export function HeroSection() {
  return (
    <section className="hero-texture relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(185,24,24,0.26),transparent_42%)]" />
      <div className="section-shell relative grid gap-10 py-12 lg:min-h-[85vh] lg:grid-cols-2 lg:items-center lg:py-14">
        <div className="space-y-6" data-reveal>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#e6dbb7]">
            <span className="h-[1px] w-7 bg-[#e6dbb7]" />
            {SITE_COPY.hero.badge}
          </p>

          <div className="space-y-1 text-[#f6f0cf]">
            <h1 className="font-display text-[clamp(2.8rem,11vw,5.2rem)] font-semibold leading-[0.92]">
              {SITE_COPY.hero.line1}
            </h1>
            <p className="soft-outline font-display text-[clamp(2.8rem,10.7vw,5.1rem)] italic leading-[0.85]">
              {SITE_COPY.hero.highlight}
            </p>
            <h2 className="font-display text-[clamp(2.8rem,11vw,5.2rem)] font-semibold leading-[0.92]">
              {SITE_COPY.hero.line2}
            </h2>
          </div>

          <p className="max-w-xl text-base leading-[1.65] text-[#b9ac97] sm:text-[1.15rem]">
            {SITE_COPY.hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={CONFIG.bookCallUrl}
              className="rounded-sm bg-[#b31313] px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ce1919]"
            >
              {SITE_COPY.hero.primaryCta} {"->"}
            </Link>
            <Link
              href="/portfolio"
              className="text-sm font-semibold text-[#f2e8c7] underline decoration-[#9d2323] decoration-1 underline-offset-4"
            >
              {SITE_COPY.hero.secondaryCta} {"->"}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center py-4" data-reveal>
          <div className="hero-ring relative h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_at_50%_45%,#7f0f0f_0%,#2b0707_60%,#180404_100%)] sm:h-[390px] sm:w-[390px] lg:h-[460px] lg:w-[460px]">
            <div className="absolute inset-0 grid place-items-center">
              {CONFIG.splineEnabled ? (
                <div className="h-[220px] w-[220px] overflow-hidden rounded-full sm:h-[280px] sm:w-[280px] lg:h-[340px] lg:w-[340px]">
                  <LazyCamera3D sceneUrl={CONFIG.splineSceneUrl} />
                </div>
              ) : (
                <div className="camera-spin relative h-[210px] w-[210px] sm:h-[270px] sm:w-[270px] lg:h-[330px] lg:w-[330px]">
                  <Image
                    src={CONFIG.cameraFallbackImage}
                    alt="Camera"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 210px, (max-width: 1024px) 270px, 330px"
                    priority
                  />
                </div>
              )}
            </div>
          </div>

          <div className="absolute right-0 top-4 rounded-md border border-white/20 bg-white/5 px-4 py-3 text-[#ece0bf] backdrop-blur sm:top-10">
            <p className="text-xs">ROI</p>
            <p className="mt-1 text-base font-semibold">3x Avg. ROI</p>
          </div>

          <div className="absolute -bottom-2 left-1/2 -translate-x-[70%] rounded-md border border-white/20 bg-white/5 px-4 py-3 text-[#ece0bf] backdrop-blur sm:bottom-8">
            <p className="text-xs">GRW</p>
            <p className="mt-1 text-base font-semibold">5+ Brands Grown</p>
          </div>
        </div>

        <div className="col-span-full mt-2 grid grid-cols-3 gap-4 border-t border-white/10 pt-5 text-[#eadfb8]" data-reveal>
          <div>
            <p className="font-display text-3xl font-semibold sm:text-4xl">5+</p>
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#bdae8a] sm:text-xs">Brands</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold sm:text-4xl">3x</p>
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#bdae8a] sm:text-xs">Avg. ROI</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold sm:text-4xl">5+</p>
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#bdae8a] sm:text-xs">Experts</p>
          </div>
        </div>
      </div>
    </section>
  );
}

