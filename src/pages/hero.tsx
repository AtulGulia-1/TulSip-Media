import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { SendHorizontal, ArrowUpRight, Pause, Play, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import CardHoverEffect from '../hook/cardHoverEffect';
import { trackAnalyticsEvent } from '../components/AnalyticsManager';

gsap.registerPlugin(ScrollTrigger);

type HeroInteractionState = 'idle' | 'transitioning';

interface HeroStoryStage {
  src: string;
  poster: string;
  step: string;
  title: string;
  caption: string;
  objectPosition: string;
}

const HERO_STORY_STAGES: HeroStoryStage[] = [
  {
    src: '/videos/website_builder.mp4',
    poster: '/img/posters/website_builder.webp',
    step: '01 / 05',
    title: 'Idea Genesis',
    caption: 'An idea begins to take shape',
    objectPosition: 'object-[50%_28%] sm:object-center',
  },
  {
    src: '/videos/strategy_planning.mp4',
    poster: '/img/posters/strategy_planning.webp',
    step: '02 / 05',
    title: 'Strategy & Direction',
    caption: 'Strategy and creative exploration establish the direction',
    objectPosition: 'object-center',
  },
  {
    src: '/videos/website_design.mp4',
    poster: '/img/posters/website_design.webp',
    step: '03 / 05',
    title: 'Interface Design',
    caption: 'Design transforms the concept into an interface',
    objectPosition: 'object-center',
  },
  {
    src: '/videos/coding-web.mp4',
    poster: '/img/posters/coding-web.webp',
    step: '04 / 05',
    title: 'Engineering & Architecture',
    caption: 'Coding and digital architecture bring it to life',
    objectPosition: 'object-center',
  },
  {
    src: '/videos/website_speed_race.mp4',
    poster: '/img/posters/website_speed_race.webp',
    step: '05 / 05',
    title: 'Speed & Launch',
    caption: 'Website performance and speed represent the finished experience',
    objectPosition: 'object-center',
  },
];

const HERO_INITIAL_STYLE = {
  '--rotate-x': '0deg',
  '--rotate-y': '0deg',
} as CSSProperties;

const Hero = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const primaryVideoRef = useRef<HTMLVideoElement | null>(null);
  const transitionVideoRef = useRef<HTMLVideoElement | null>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [interactionState, setInteractionState] = useState<HeroInteractionState>('idle');
  const [isPaused, setIsPaused] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const totalStages = HERO_STORY_STAGES.length;
  const nextStageIndex = (currentStageIndex + 1) % totalStages;
  const activeStage = HERO_STORY_STAGES[currentStageIndex];
  const upcomingStage = HERO_STORY_STAGES[nextStageIndex];
  const isTransitioning = interactionState === 'transitioning';

  const handleMouseMove = CardHoverEffect();

  // Synchronize primary background video whenever currentStageIndex or pause state changes
  useEffect(() => {
    const primaryVideo = primaryVideoRef.current;
    if (!primaryVideo) return;

    const targetSrc = HERO_STORY_STAGES[currentStageIndex].src;
    if (primaryVideo.getAttribute('data-loaded-src') !== targetSrc) {
      primaryVideo.setAttribute('data-loaded-src', targetSrc);
      primaryVideo.poster = HERO_STORY_STAGES[currentStageIndex].poster;
      primaryVideo.src = targetSrc;
      primaryVideo.load();
    }

    if (isPaused) {
      primaryVideo.dataset.userPaused = 'true';
      primaryVideo.pause();
    } else {
      delete primaryVideo.dataset.userPaused;
      primaryVideo.play().catch(() => {});
    }
  }, [currentStageIndex, isPaused]);

  // Preload upcoming stage video into the hidden transition layer while idle (deferred on initial load)
  useEffect(() => {
    if (interactionState !== 'idle') return;
    const transitionVideo = transitionVideoRef.current;
    if (!transitionVideo) return;

    const loadUpcoming = () => {
      const upcoming = HERO_STORY_STAGES[nextStageIndex];
      if (transitionVideo.getAttribute('data-loaded-src') !== upcoming.src) {
        transitionVideo.setAttribute('data-loaded-src', upcoming.src);
        transitionVideo.poster = upcoming.poster;
        transitionVideo.src = upcoming.src;
        transitionVideo.load();
      }
      transitionVideo.pause();
      gsap.set(transitionVideo, { clearProps: 'all' });
    };

    if (currentStageIndex === 0 && !transitionVideo.getAttribute('data-loaded-src')) {
      const timer = setTimeout(loadUpcoming, 2500);
      return () => clearTimeout(timer);
    } else {
      loadUpcoming();
    }
  }, [currentStageIndex, interactionState, nextStageIndex]);

  // Clean up any active GSAP timeline on unmount
  useEffect(() => {
    return () => {
      activeTimelineRef.current?.kill();
      activeTimelineRef.current = null;
    };
  }, []);

  const handleVideoTransition = useCallback(() => {
    if (interactionState !== 'idle') return;
    setInteractionState('transitioning');
  }, [interactionState]);

  useGSAP(() => {
    if (interactionState !== 'transitioning') return;

    const transitionVideo = transitionVideoRef.current;
    const primaryVideo = primaryVideoRef.current;
    if (!transitionVideo || !primaryVideo) {
      setCurrentStageIndex((prev) => (prev + 1) % totalStages);
      setInteractionState('idle');
      return;
    }

    activeTimelineRef.current?.kill();

    const targetIdx = (currentStageIndex + 1) % totalStages;
    const targetStage = HERO_STORY_STAGES[targetIdx];

    const tl = gsap.timeline({
      onStart: () => {
        if (!isPaused) {
          transitionVideo.currentTime = 0;
          transitionVideo.play().catch(() => {});
        }
      },
      onComplete: () => {
        // Commit new stage to primary video before hiding transition overlay so there is zero flash
        primaryVideo.setAttribute('data-loaded-src', targetStage.src);
        primaryVideo.poster = targetStage.poster;
        primaryVideo.src = targetStage.src;
        if (!isPaused) {
          primaryVideo.play().catch(() => {});
        }
        gsap.set(transitionVideo, { clearProps: 'all' });
        setCurrentStageIndex(targetIdx);
        setInteractionState('idle');
        activeTimelineRef.current = null;
      },
    });

    activeTimelineRef.current = tl;

    tl.set(transitionVideo, {
      width: '13rem',
      height: '13rem',
      borderRadius: '0.75rem',
      opacity: 1,
      zIndex: 15,
    }).to(transitionVideo, {
      width: '100%',
      height: '100%',
      borderRadius: '0rem',
      ease: 'power3.inOut',
      duration: 0.38,
    });
  }, [interactionState]);

  useEffect(() => {
    const onMotionState = (e: Event) => {
      const custom = e as CustomEvent<{ paused: boolean }>;
      if (typeof custom.detail?.paused === 'boolean') {
        setIsPaused(custom.detail.paused);
      }
    };
    window.addEventListener('tulsip:motion-state', onMotionState);
    return () => window.removeEventListener('tulsip:motion-state', onMotionState);
  }, []);

  const togglePlayback = () => {
    const nextPaused = !isPaused;
    setIsPaused(nextPaused);
    if (primaryVideoRef.current) {
      if (nextPaused) {
        primaryVideoRef.current.dataset.userPaused = 'true';
        primaryVideoRef.current.pause();
      } else {
        delete primaryVideoRef.current.dataset.userPaused;
        primaryVideoRef.current.play().catch(() => {});
      }
    }
    window.dispatchEvent(
      new CustomEvent('tulsip:toggle-motion', { detail: { paused: nextPaused } })
    );
  };

  useGSAP(() => {
    gsap.set(videoContainerRef.current, {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    });
    gsap.to(videoContainerRef.current, {
      clipPath: 'polygon(0 0, 50% 0, 89% 100%, 31% 100%)',
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: videoContainerRef.current,
        start: '25% 25%',
        end: '100% center',
        scrub: 1,
      },
    });
  }, []);

  return (
    <section
      id="hero"
      className="full-height group relative"
      style={HERO_INITIAL_STYLE}
      onMouseMove={handleMouseMove}
    >
      <div className="center relative z-30 size-full" ref={videoContainerRef}>
        {/* Subtle edge legibility scrim preserving full clarity around the center character & logo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] bg-[linear-gradient(90deg,rgba(30,17,16,0.78)_0%,rgba(30,17,16,0.34)_36%,transparent_58%),linear-gradient(180deg,rgba(30,17,16,0.52)_0%,transparent_20%,transparent_76%,rgba(30,17,16,0.68)_100%)]"
        />

        <div className="absolute left-10 top-24 z-20 max-w-xl pr-4 max-md:left-5 max-md:top-20">
          <div
            aria-hidden="true"
            className="special-font hero-heading text-light-beige"
          >
            TUL<span>S</span>IP
          </div>
          <p className="mt-1 font-general text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-royal-beige max-md:text-[0.62rem]">
            Local brands. Global Voices.
          </p>
          <h1 className="mt-2 font-general text-lg font-bold tracking-tight text-light-beige sm:text-xl md:text-2xl">
            Website Development for Businesses Ready to Grow
          </h1>
          <p className="mt-2 max-w-md font-robert-regular text-sm leading-relaxed text-light-beige/90 max-lg:text-xs">
            TulSip Media designs and develops purposeful websites, e-commerce storefronts, and custom web applications that help businesses communicate their value, build credibility, and turn visitors into meaningful enquiries.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="/contact"
              id="watch-trailer"
              onClick={() => trackAnalyticsEvent('project_cta_click', { cta_location: 'hero_primary' })}
              className="center trailer-button w-fit gap-x-2 rounded-2xl bg-cta glow-cta px-6 py-2.5 font-general text-[0.7rem] font-bold uppercase tracking-wider text-deep-dark transition-transform hover:scale-105"
            >
              <SendHorizontal fill="#1E1110" size={12} /> Discuss Your Project
            </a>
            <a
              href="/case-studies"
              onClick={() => trackAnalyticsEvent('portfolio_item_click', { item_slug: 'hero_explore_work' })}
              className="center w-fit gap-x-1.5 rounded-2xl border border-royal-beige/50 bg-deep-dark/65 px-5 py-2.5 font-general text-[0.7rem] font-semibold uppercase tracking-wider text-light-beige backdrop-blur-sm transition-colors hover:border-royal-beige hover:bg-dark-brown/80"
            >
              Explore Our Work <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Interactive Story Stage & Accessible Playback Bar */}
        <div className="absolute bottom-5 left-10 z-20 flex flex-wrap items-center gap-2.5 max-md:bottom-16 max-md:left-5">
          <button
            type="button"
            onClick={handleVideoTransition}
            disabled={isTransitioning}
            title="Click the center TulSip emblem or press here to advance the 5-stage brand story"
            className="flex items-center gap-2.5 rounded-2xl border border-royal-beige/35 bg-deep-dark/75 px-3.5 py-2 text-left backdrop-blur-md transition-colors hover:border-royal-beige hover:bg-dark-brown/80 disabled:opacity-60"
          >
            <Sparkles size={13} className="shrink-0 text-royal-beige" aria-hidden="true" />
            <div>
              <div className="font-general text-[0.62rem] font-bold uppercase tracking-[0.18em] text-royal-beige">
                {activeStage.step} · {activeStage.title}
              </div>
              <div className="font-robert-regular text-[0.68rem] text-light-beige/85 max-sm:hidden">
                {activeStage.caption} — Click center emblem for {upcomingStage.title}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={togglePlayback}
            aria-pressed={isPaused}
            aria-label={isPaused ? 'Play background video motion' : 'Pause background video motion'}
            className="flex items-center gap-1.5 rounded-2xl border border-royal-beige/35 bg-deep-dark/75 px-3 py-2 font-general text-[0.65rem] font-semibold uppercase tracking-wider text-light-beige backdrop-blur-md transition-colors hover:border-royal-beige hover:bg-dark-brown/80"
          >
            {isPaused ? <Play size={12} className="text-royal-beige" /> : <Pause size={12} className="text-royal-beige" />}
            <span>{isPaused ? 'Play Motion' : 'Pause Motion'}</span>
          </button>
        </div>

        {/* Primary Full-Screen Hero Video */}
        <video
          ref={primaryVideoRef}
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          data-auto-resume="true"
          className={`primary-video ${activeStage.objectPosition}`}
          poster={activeStage.poster}
          src={HERO_STORY_STAGES[0].src}
          draggable="false"
          controls={false}
          disablePictureInPicture
          aria-label={`TulSip Media brand narrative stage: ${activeStage.title} — ${activeStage.caption}`}
        />

        {/* Expanding Transition Video Layer (Centered via inset-0 m-auto, expands smoothly from center during transition) */}
        <video
          ref={transitionVideoRef}
          preload="metadata"
          muted
          loop
          playsInline
          data-hero-transition="true"
          className={`absolute inset-0 m-auto pointer-events-none size-0 rounded-xl object-cover opacity-0 ${upcomingStage.objectPosition}`}
          poster={upcomingStage.poster}
          src={HERO_STORY_STAGES[1].src}
          draggable="false"
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
        />

        {/* Single Original Central TulSip Media Interactive Logo (Centered via inset-0 m-auto in .secondary-video so 3D tilt never shifts its center) */}
        <button
          type="button"
          onClick={handleVideoTransition}
          disabled={isTransitioning}
          aria-label={`Click the TulSip Media logo to advance hero story to stage ${nextStageIndex + 1}: ${upcomingStage.title}`}
          className={`secondary-video overflow-hidden border-0 bg-transparent p-0 ${
            isTransitioning
              ? 'pointer-events-none !size-0 opacity-0'
              : 'opacity-100'
          }`}
        >
          <img
            src="/img/token.jpeg"
            alt="TulSip Media"
            width={208}
            height={208}
            draggable={false}
            className="size-full rounded-xl object-cover select-none"
          />
        </button>

        <div
          aria-hidden="true"
          className="special-font hero-heading absolute bottom-4 right-5 z-20 text-light-beige"
        >
          ME<span>D</span>IA
        </div>
      </div>
      <div
        aria-hidden="true"
        className="special-font hero-heading absolute bottom-4 right-5 text-light-beige"
      >
        ME<span>D</span>IA
      </div>
    </section>
  );
};

export default Hero;
