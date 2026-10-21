import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/teamData';

const AboutTeam = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalMembers = TEAM_MEMBERS.length;
  const activeMember = TEAM_MEMBERS[activeIndex] || TEAM_MEMBERS[0];

  const navigate = (direction: "next" | "prev") => {
    if (totalMembers <= 1 || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 650);

    setActiveIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % totalMembers;
      }
      return (prev - 1 + totalMembers) % totalMembers;
    });
  };

  return (
    <div 
      className="relative w-full overflow-hidden min-h-screen py-16 px-4 md:px-8 flex items-center justify-center"
      style={{ 
        backgroundColor: activeMember.bg || '#1E1110',
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background Noise & Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' opacity='0.08' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Giant Ghost Text */}
      <div 
        className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-[2]"
        style={{
          top: '15%',
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(80px, 18vw, 340px)',
          fontWeight: 900,
          color: 'white',
          opacity: 0.08,
          lineHeight: 1,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap'
        }}
      >
        {activeMember.name.split(' ')[0]}
      </div>

      <div className="relative z-20 max-w-6xl w-full mx-auto">
        
        {/* Top Tagline */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-brown/55 border border-royal-beige/30 text-royal-beige text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles size={14} /> Agency Leadership & Vision
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-light-beige uppercase tracking-tight">
            Meet The Mind Behind <span className="text-royal-beige">TulSip Media</span>
          </h2>
        </div>

        {/* SINGLE MEMBER SPOTLIGHT MODE (When totalMembers === 1) */}
        {totalMembers === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-dark-brown/35 border border-royal-beige/20 rounded-3xl p-6 md:p-12 backdrop-blur-md">
            
            {/* Member Profile Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-80 md:w-80 md:h-[420px] rounded-2xl overflow-hidden border-2 border-royal-beige/50 shadow-2xl bg-deep-dark">
                <img 
                  src={activeMember.image} 
                  alt={activeMember.name} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-xs uppercase tracking-widest text-royal-beige font-bold block">
                    FOUNDER & STRATEGIST
                  </span>
                  <span className="text-sm font-semibold text-light-beige">TulSip Media</span>
                </div>
              </div>
            </div>

            {/* Member Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono text-royal-beige uppercase tracking-widest block mb-1">
                  LEAD STRATEGIST
                </span>
                <h3 className="text-4xl md:text-6xl font-black text-light-beige uppercase tracking-tight">
                  {activeMember.name}
                </h3>
                <p className="text-lg text-royal-beige font-medium mt-1">
                  {activeMember.role}
                </p>
              </div>

              <p className="text-sm md:text-base text-light-beige/85 leading-relaxed">
                {activeMember.description}
              </p>

              {/* Skills Badges */}
              {activeMember.skills && (
                <div>
                  <span className="text-xs uppercase text-royal-beige font-bold tracking-wider block mb-2">
                    Core Specializations
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeMember.skills.map((skill, i) => (
                      <span key={i} className="text-xs bg-dark-brown/55 border border-royal-beige/25 text-light-beige px-3.5 py-1.5 rounded-full font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Contact & Strategy Audit CTA */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a 
                  href="/contact" 
                  className="px-6 py-3 rounded-full bg-royal-beige hover:bg-light-beige text-deep-dark font-bold uppercase tracking-wider text-xs transition-all shadow-lg shadow-royal-beige/20"
                >
                  Book Strategy Call With Atul
                </a>
                {activeMember.email && (
                  <a 
                    href={`mailto:${activeMember.email}`}
                    className="flex items-center gap-2 text-xs text-light-beige/85 hover:text-light-beige font-semibold transition-colors"
                  >
                    <Mail size={16} className="text-royal-beige" /> {activeMember.email}
                  </a>
                )}
              </div>
            </div>

          </div>
        ) : (
          /* MULTI MEMBER CAROUSEL MODE (When more team members are added to teamData.ts) */
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM_MEMBERS.map((member, idx) => (
                <div key={member.id || idx} className="bg-dark-brown/35 border border-royal-beige/20 rounded-2xl p-6 space-y-4">
                  <img src={member.image} alt={member.name} className="w-full h-64 object-cover rounded-xl" />
                  <h4 className="text-2xl font-bold text-light-beige">{member.name}</h4>
                  <p className="text-xs text-royal-beige uppercase font-semibold">{member.role}</p>
                  <p className="text-xs text-light-beige/85">{member.description}</p>
                </div>
              ))}
            </div>
            
            {/* Nav controls for carousel */}
            <div className="flex justify-center gap-4 mt-8">
              <button onClick={() => navigate("prev")} className="p-3 rounded-full border border-royal-beige/30 text-light-beige hover:bg-dark-brown/55">
                <ArrowLeft size={20} />
              </button>
              <button onClick={() => navigate("next")} className="p-3 rounded-full border border-royal-beige/30 text-light-beige hover:bg-dark-brown/55">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AboutTeam;
