import clsx from 'clsx';
import CardHoverEffect from '../hook/cardHoverEffect';
import { JSX, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Send } from 'lucide-react';
import { DESIGN_TOKENS } from '../theme/tokens';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  title?: JSX.Element;
  description?: JSX.Element;
  video?: string;
  altText?: string;
  box: number;
}
const Card = ({ title, description, video, altText, box }: CardProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const derivedPoster = video ? video.replace('/videos/', '/img/posters/').replace(/\.mp4$/i, '.webp') : undefined;
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = CardHoverEffect();
  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseExit = () =>
    videoRef.current &&
    (videoRef.current.pause(), (videoRef.current.currentTime = 0));

  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      {
        rotationX: '-80deg',
        opacity: 0,
      },
      {
        opacity: 1,
        rotationX: '0deg',
        duration: 0.9,
        scrollTrigger: {
          trigger: cardRef.current,
          start: '-240% bottom',
          end: 'bottom top',
          toggleActions: 'restart none none none',
        },
      },
    );
  }, []);
  return (
    <div
      ref={cardRef}
      className={`group cursor-grab ${clsx(box, {
        'col-start-1 col-end-3 row-start-1 row-end-4': box === 1,
        'col-start-2 col-end-3 row-start-4 row-end-6': box === 2,
        'col-start-1 col-end-2 row-start-4 row-end-8': box === 3,
        'col-start-2 col-end-3 row-start-6 row-end-8': box === 4,
        'col-start-2 col-end-3 row-start-8 row-end-10': box === 5,
        'card-violet col-start-1 col-end-2 row-start-8 row-end-10': box === 6,
      })} `}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseExit}
    >
      <div className="relative size-full overflow-hidden rounded-lg border-[1px] border-royal-beige/30 bg-dark-brown/40 shadow-token-card transition-transform ease-linear will-change-transform [perspective:1000px] group-hover:border-royal-beige/60 group-hover:[transform:rotateX(var(--rotate-x))_rotateY(var(--rotate-y))_scale(0.95)]">
        {video && (
          <video
            preload="none"
            poster={derivedPoster}
            muted
            loop
            playsInline
            draggable="false"
            controls={false}
            disablePictureInPicture
            className="video-player size-full scale-125 object-cover"
            ref={videoRef}
            aria-label={altText}
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
        <div className="absolute left-4 top-4 w-72 max-w-64 max-md:max-w-44">
          {title}
          {description}
        </div>
        <div className="center absolute bottom-4 left-4 items-start gap-2 max-md:flex-col">
          {box !== 6 && box !== 5 && box !== 4 && (
            <a
              href="/contact"
              className="card-button flex items-center justify-center text-light-beige"
            >
              <Send
                size={12}
                className="max-md:size-3"
                fill={DESIGN_TOKENS.palette.lightBeige}
              />{' '}
              DISCUSS PROJECT
            </a>
          )}
          {box === 4 && (
            <a
              href="/case-studies"
              className="card-button flex items-center justify-center text-royal-beige"
            >
              EXPLORE WORK
              <Send
                size={12}
                className="max-md:size-3"
                fill={DESIGN_TOKENS.palette.royalBeige}
              />
            </a>
          )}
        </div>
        {box === 6 && (
          <img
            src="/Logo.png"
            className="absolute bottom-4 right-4 size-8 rounded-full drop-shadow-[0_0_14px_rgba(189,160,126,0.4)] md:size-10 lg:size-14"
            alt=""
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
};

export default Card;
