import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WordsPullUp from './components/WordsPullUp';

const AdsHero = () => {
  return (
    <section className="h-screen p-4 md:p-6 bg-deep-dark w-full overflow-hidden">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-deep-dark">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-dark/30 via-transparent to-deep-dark/60 pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-16 flex flex-col md:flex-row items-end justify-between gap-8 pb-10">
          
          <div className="w-full md:w-8/12">
            <h1 className="m-0">
              <WordsPullUp 
                text="TulSip Ads"
                showAsterisk={true}
                className="text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[13vw] 2xl:text-[14vw] font-medium leading-[0.85] tracking-[-0.07em] text-light-beige"
              />
            </h1>
          </div>

          <div className="w-full md:w-4/12 flex flex-col items-start gap-6 pb-2">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-primary/80 text-xs sm:text-sm md:text-base leading-[1.35]"
            >
              Paid search and social campaigns paired with dedicated conversion landing pages, clear offer hierarchy, and structured creative testing.
            </motion.p>
            
            <motion.a
              href="/contact"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center gap-2 hover:gap-3 bg-primary text-deep-dark rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-all duration-300"
            >
              <span className="font-medium text-sm sm:text-base">Discuss a campaign</span>
              <div className="bg-deep-dark rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <ArrowRight className="text-light-beige w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdsHero;
