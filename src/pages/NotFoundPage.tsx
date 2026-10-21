import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-wrapper min-h-[100dvh] w-full flex flex-col overflow-x-hidden relative bg-deep-dark">
      <PageMeta
        title="Page Not Found | TulSip Media"
        description="The page you requested could not be found. Return to the TulSip Media homepage or explore our website development work."
        canonicalPath="/404"
        robots="noindex, follow"
      />
      {/* Supplied 404 Video Background Layer */}
      <video
        src="/videos/page_not_found.mp4"
        poster="/img/posters/page_not_found.webp"
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full object-cover opacity-35 pointer-events-none"
      />
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top left, rgba(241, 234, 218, 0.90), rgba(189, 160, 126, 0.45))'
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-[700px] w-full mx-auto px-5 pt-[100px] pb-[40px] text-center">
        
        <p className="text-[15px] font-semibold uppercase tracking-widest text-[#462C28] mb-3">
          Page not found (404)
        </p>

        <div className="relative inline-block mb-3.5">
          <h1 
            className="font-medium text-[#1E1110] m-0"
            style={{
              fontSize: 'clamp(26px, 5vw, 52px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.08
            }}
          >
            Whoops! Nothing here yet
          </h1>
        </div>

        <p className="text-[14px] text-[#462C28] leading-[1.7] max-w-[470px] mb-7">
          The page you are looking for may have moved. Explore our <span className="inline-flex bg-[#BDA07E] text-[12.5px] font-semibold px-3 py-[2px] rounded-md text-[#1E1110] mx-1">website development</span> services, review our selected work, or <span className="inline-flex bg-[#BDA07E] text-[12.5px] font-semibold px-3 py-[2px] rounded-md text-[#1E1110] mx-1">contact us</span> to discuss your project.
        </p>

        {/* Navigation Cards */}
        <div className="flex flex-col gap-3 w-full max-w-[460px] mt-auto">
          
          {/* Card 1 */}
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="group bg-light-beige/95 rounded-[18px] p-[18px_22px] flex items-center justify-between border border-royal-beige/45 shadow-[0_2px_12px_rgba(30, 17, 16, 0.08)] hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(30, 17, 16, 0.16)] transition-all duration-300 w-full text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F1EADA] flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#1E1110]" aria-hidden="true">
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
                  <path d="M9 21V12h6v9" fill="#F1EADA" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-[#1E1110]">Homepage</span>
                <span className="text-[12px] text-[#462C28]">Website development &amp; digital services</span>
              </div>
            </div>
            <span className="text-[21px] text-[#1E1110] font-light group-hover:translate-x-[6px] transition-transform">
              &rsaquo;
            </span>
          </button>

          {/* Card 2 */}
          <button 
            type="button"
            onClick={() => navigate('/case-studies')}
            className="group bg-light-beige/95 rounded-[18px] p-[18px_22px] flex items-center justify-between border border-royal-beige/45 shadow-[0_2px_12px_rgba(30, 17, 16, 0.08)] hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(30, 17, 16, 0.16)] transition-all duration-300 w-full text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F1EADA] flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-[#1E1110]" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" fill="currentColor" />
                  <circle cx="12" cy="12" r="3.5" fill="#F1EADA" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-[#1E1110]">Selected Work</span>
                <span className="text-[12px] text-[#462C28]">Explore case studies &amp; digital concepts</span>
              </div>
            </div>
            <span className="text-[21px] text-[#1E1110] font-light group-hover:translate-x-[6px] transition-transform">
              &rsaquo;
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
