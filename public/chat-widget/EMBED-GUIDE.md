# Euser AI Chat Widget — Client Embed Guide

## Quick Setup (2 minutes)

Paste this code **just before the `</body>` tag** on your website:

```html
<script>
  window.EuserChatConfig = {
    webhookUrl: "YOUR_WEBHOOK_URL_HERE",
    agentName: "Your Agent Name",
    agentTagline: "Safari Expert",
    brandColor: "#D4AF37",
    greeting: "Welcome! How can I help you plan your perfect safari?"
  };
</script>
<script src="https://euserai.com/chat-widget/euser-chat.min.js"></script>
```

That's it! A chat bubble will appear in the bottom-right corner of your site.

---

## Customization Options

| Option | Type | Default | Description |
|:---|:---|:---|:---|
| `webhookUrl` | string | *required* | Your unique AI agent endpoint (provided by Euser AI) |
| `agentName` | string | "AI Assistant" | Name shown in the chat header |
| `agentTagline` | string | "Online" | Subtitle under the agent name |
| `brandColor` | string | "#D4AF37" | Primary color (hex). Used for buttons, accents |
| `greeting` | string | "Hello! How can I help?" | First message users see when opening the chat |
| `apiKey` | string | "" | Your API key for secure communication (provided by Euser AI) |
| `sessionTTL` | number | 7 | Days before user data expires and re-registration is required |

---

## How It Works

1. **Visitor opens your website** → gold chat bubble appears
2. **First-time visitor clicks bubble** → registration form collects name, email, phone, country
3. **User starts chatting** → messages are sent securely to your AI agent
4. **AI responds** → rich formatted responses with images, links, bold text
5. **User returns later** → their data is remembered, conversations persist

---

## Security Features

- ✅ All communication over HTTPS
- ✅ API key authentication per client
- ✅ XSS protection — all AI responses are sanitized
- ✅ Input validation — names, emails, phone numbers validated
- ✅ Rate limiting — prevents spam/abuse
- ✅ Session expiry — user data auto-clears after configured period
- ✅ No cookies — uses localStorage only (GDPR-friendly)

---

## Support

Contact Euser AI: hello@euserai.com | https://euserai.com
