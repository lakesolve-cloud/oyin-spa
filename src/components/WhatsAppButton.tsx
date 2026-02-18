import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/2348000000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-[#ffffff] group-hover:scale-110 transition-transform" />
    </a>
  );
};

export default WhatsAppButton;
