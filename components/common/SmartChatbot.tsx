"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type ChatRole = "user" | "bot";
type SupportedLang = "en" | "hi" | "es" | "ar";
type Intent = "greeting" | "services" | "pricing" | "contact" | "book" | "default";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

const TRANSLATIONS: Record<SupportedLang, Record<Intent, string>> = {
  en: {
    greeting: "Hi! Welcome to TulSip Media. How can I help your brand grow today?",
    services:
      "We offer Social Media Management, Ad Creatives, Branding, Website Design, Performance Marketing, Content Creation, Analytics Reporting, and SEO/SEM.",
    pricing:
      "Our engagement modes are scoped to your goals, channels, and current baseline. I can guide you to the right starting point.",
    contact:
      "You can reach us from the Contact page, WhatsApp CTA, or Book a Free Journey Audit button. Want me to guide you to the best option?",
    book: "Great choice. Please use the Book a Free Journey Audit CTA and share your business goal, target audience, and monthly budget.",
    default:
      "Thanks for your message. I can help with services, pricing, campaign planning, and booking a strategy call."
  },
  hi: {
    greeting: "Namaste! TulSip Media me aapka swagat hai. Aaj main aapki brand growth me kaise madad karun?",
    services:
      "Hamari services: Social Media Management, Ad Creatives, Branding, Website Design, Performance Marketing, Content Creation, Analytics Reporting, aur SEO/SEM.",
    pricing:
      "Hamare engagement modes aapke goal, channels aur current baseline ke hisaab se scope hote hain. Main aapko best starting option suggest kar sakta hoon.",
    contact:
      "Aap Contact page, WhatsApp CTA, ya Book a Free Journey Audit button se humse connect kar sakte hain. Kya main best option suggest karun?",
    book:
      "Bahut badhiya. Book a Free Journey Audit CTA use karke apna business goal, target audience aur monthly budget share karein.",
    default:
      "Message ke liye dhanyavaad. Main services, pricing, campaign planning aur strategy call booking me madad kar sakta hoon."
  },
  es: {
    greeting: "Hola. Bienvenido a TulSip Media. Como puedo ayudarte a crecer tu marca hoy?",
    services:
      "Ofrecemos gestion de redes sociales, creativos publicitarios, branding, diseno web, marketing de rendimiento, creacion de contenido, reportes analiticos y SEO/SEM.",
    pricing:
      "Nuestros modos de trabajo se definen segun tus objetivos, canales y punto de partida. Puedo ayudarte a elegir la mejor opcion inicial.",
    contact:
      "Puedes contactarnos desde la pagina de contacto, el CTA de WhatsApp o el boton Book a Free Journey Audit.",
    book:
      "Excelente. Usa el CTA Book a Free Journey Audit y comparte tu objetivo de negocio, publico objetivo y presupuesto mensual.",
    default:
      "Gracias por tu mensaje. Puedo ayudarte con servicios, precios, plan de crecimiento y reserva de llamada."
  },
  ar: {
    greeting: "Marhaban! Ahlan bik fi TulSip Media. Kayfa yumkinuni musaeadatuk fi numu ealamatik alyawm?",
    services:
      "Nuqaddim idarat al social media, ielanat ibdaeia, branding, tasmim mawqie, taswiq bil ada', sinaeat muhtawa, taqarir tahliliyya wa SEO/SEM.",
    pricing:
      "Nuhaddid namat altaeawun hasb ahdafak, alqanaat, wa almasar alhali. Yumkinuni musaeadatuk liikhtiyar bidaya munasiba.",
    contact: "Yumkinuk altawasul maena eabr safhat al contact aw CTA WhatsApp aw Book a Free Journey Audit.",
    book:
      "Mumtaz. Istakhdim Book a Free Journey Audit wa sharik hadaf amalak, aljumhur almustahdaf, wa almizaniya alshahriya.",
    default:
      "Shukran lirisalatak. Astatie musaeadatak bilkhadamat, alasaar, khutatu alnmu, wa hajz mukalama."
  }
};

function detectLanguage(text: string): SupportedLang {
  if (/[\u0600-\u06FF]/.test(text)) return "ar";
  if (/[\u0900-\u097F]/.test(text)) return "hi";

  const lower = text.toLowerCase();
  if (/\b(hola|precio|servicios|gracias|marca|contacto)\b/.test(lower)) return "es";

  return "en";
}

function detectIntent(text: string): Intent {
  const lower = text.toLowerCase();

  if (/(hi|hello|hey|namaste|hola|marhaban)/.test(lower)) return "greeting";
  if (
    /(service|services|seo|ads|branding|website|social|servicios|khadamat|muhtawa)/.test(
      lower
    )
  )
    return "services";
  if (/(price|pricing|package|cost|plan|budget|rs|precio|costo|sier|baqa)/.test(lower))
    return "pricing";
  if (
    /(contact|email|phone|location|address|map|office|direccion|ubicacion|ittisal|mawqie)/.test(
      lower
    )
  )
    return "contact";
  if (/(book|call|meeting|consult|consultation|llamada|reserva|hajz|mukalama)/.test(lower))
    return "book";

  return "default";
}

export function SmartChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [nudge, setNudge] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      text: TRANSLATIONS.en.greeting
    }
  ]);

  const visibleMessages = useMemo(() => messages.slice(-8), [messages]);

  useEffect(() => {
    if (open) {
      setShowHint(false);
      setNudge(false);
      return;
    }

    const interval = setInterval(() => {
      setShowHint(true);
      setNudge(true);
      window.setTimeout(() => setNudge(false), 1200);
      window.setTimeout(() => setShowHint(false), 2200);
    }, 10000);

    return () => clearInterval(interval);
  }, [open]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: value
    };

    const lang = detectLanguage(value);
    const intent = detectIntent(value);
    const botMessage: ChatMessage = {
      id: `b-${Date.now()}`,
      role: "bot",
      text: TRANSLATIONS[lang][intent]
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[320px] max-w-[calc(100vw-2.5rem)]">
      {open ? (
        <div className="theme-card rounded-2xl p-3 shadow-2xl">
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
            <p className="font-display text-2xl text-[#f6f0cf]">TulSip Assistant</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-sm border border-white/20 px-2 py-1 text-xs text-[#f3e7c5]"
            >
              Close
            </button>
          </div>

          <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
            {visibleMessages.map((message) => (
              <div
                key={message.id}
                className={`rounded-xl px-3 py-2 text-sm leading-6 ${
                  message.role === "user"
                    ? "ml-8 bg-[#b31313]/30 text-[#f8eecf]"
                    : "mr-8 border border-white/10 bg-white/5 text-[#d9ccb0]"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message..."
              className="theme-input w-full rounded-xl px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="theme-btn-primary rounded-sm px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em]"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="flex items-end justify-end gap-2">
          {showHint && (
            <div className="rounded-full border border-white/20 bg-[#2b0b0b]/90 px-3 py-1 text-xs font-semibold text-[#f3e7c5]">
              Need help?
            </div>
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open chatbot"
            className={`grid h-12 w-12 place-items-center rounded-full bg-[#b31313] text-white shadow-lg transition ${
              nudge ? "scale-110 shadow-[0_0_0_8px_rgba(179,19,19,0.22)]" : "scale-100"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 5.5C4 4.12 5.12 3 6.5 3H17.5C18.88 3 20 4.12 20 5.5V13.5C20 14.88 18.88 16 17.5 16H10L6 20V16H6.5C5.12 16 4 14.88 4 13.5V5.5Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="9.5" r="1" fill="currentColor" />
              <circle cx="12" cy="9.5" r="1" fill="currentColor" />
              <circle cx="15" cy="9.5" r="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

