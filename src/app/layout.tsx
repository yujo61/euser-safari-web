import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Euser Safaris | Premium Kenyan Wildlife Experiences",
  description: "Discover the magic of East Africa with Euser Safaris. 10 curated packages from Amboseli to the Maasai Mara.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} antialiased bg-black text-white`}
      >
        <Navbar />
        {children}
        <Footer />

        {/* Euser Chat Widget — Config */}
        <Script id="euser-chat-config" strategy="beforeInteractive">
          {`
            var lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase().split('-')[0];
            var greetings = {
              en: "Jambo! 🌍 Welcome to Euser Safaris! I'm Claire, your personal safari consultant. How can I help you today?",
              fr: "Jambo ! 🌍 Bienvenue chez Euser Safaris ! Je suis Claire, votre consultante safari. Comment puis-je vous aider ?",
              es: "¡Jambo! 🌍 ¡Bienvenido a Euser Safaris! Soy Claire, tu consultora de safaris. ¿Cómo puedo ayudarte?",
              de: "Jambo! 🌍 Willkommen bei Euser Safaris! Ich bin Claire, Ihre Safari-Beraterin. Wie kann ich helfen?",
              it: "Jambo! 🌍 Benvenuti in Euser Safaris! Sono Claire, la tua consulente safari. Come posso aiutarti?",
              sw: "Jambo! 🌍 Karibu Euser Safaris! Mimi ni Claire, mshauri wako wa safari. Naweza kukusaidia aje leo?",
              zh: "Jambo！🌍 欢迎来到 Euser Safaris！我是 Claire，您的私人游猎顾问。今天我能为您做些什么？",
              ar: "Jambo! 🌍 مرحبًا بكم في Euser Safaris! أنا كلير، مستشارة رحلات السفاري الخاصة بك. كيف يمكنني مساعدتك؟"
            };
            
            window.EuserChatConfig = {
              webhookUrl: "https://n8n.euserai.com/webhook/64c84dbd-29ca-489e-a78a-98053ea9682c",
              agentName: "Claire",
              agentTagline: "Safari Expert",
              brandColor: "#D4AF37",         // Theme color for UI elements
              bubbleColor: "#D4AF37",        // Background color of the floating chat button
              position: "bottom-right",      // "bottom-right" or "bottom-left"
              greeting: greetings[lang] || greetings.en
            };
          `}
        </Script>
        {/* Euser Chat Widget — Logic and Styles (Local) */}
        <Script src="/chat-widget/euser-chat.min.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

