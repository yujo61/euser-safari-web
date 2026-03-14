"use client";

import { useEffect } from "react";

export default function TypebotWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.innerHTML = `
      import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3/dist/web.js'

      Typebot.initBubble({
        typebot: "my-typebot-p9yb2oo",
        apiHost: "https://bot.euserai.com",
        theme: {
          button: { 
            backgroundColor: "#D4AF37", 
            size: "large" 
          },
          chatWindow: { 
            backgroundColor: "#000000", 
            width: "440px", 
            height: "680px" 
          },
          header: { 
            title: "Benuki Safari Expert", 
            backgroundColor: "#000000", 
            textColor: "#FFFFFF" 
          }
        },
      });
    `;
    document.body.appendChild(script);

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return null;
}
