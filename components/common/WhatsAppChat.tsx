import { CONFIG } from "@/lib/config";

export function WhatsAppChat() {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    CONFIG.whatsappMessage
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-[#25D366] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#062f17] shadow-lg transition hover:brightness-110"
    >
      WhatsApp Chat
    </a>
  );
}
