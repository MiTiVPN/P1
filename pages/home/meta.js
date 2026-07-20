module.exports = {
  outPath: 'index.html',
  footer: 'footer', // full footer with contact block
  head: `
<title>MiTiVPN — No-Log VPN for Censorship-Resistant, Borderless Internet Access</title>
<meta name="description" content="MiTiVPN is a no-log VPN built for blocked and filtered regions. Obfuscated handshakes that defeat deep packet inspection, multi-hop routing, and ephemeral RAM-only sessions — fast, private, and without borders. Launching soon on Windows, macOS, Linux, Android, and iOS.">
<meta name="keywords" content="VPN, no-log VPN, censorship-resistant VPN, VLESS, WireGuard, OpenVPN, Shadowsocks, SOCKS5, deep packet inspection, DPI bypass, obfuscated VPN, free VPN, privacy, unblock internet">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://mitivpn.com/">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="MiTiVPN">
<meta property="og:title" content="MiTiVPN — No-Log VPN for Censorship-Resistant, Borderless Internet Access">
<meta property="og:description" content="A no-log VPN built for blocked and filtered regions. Obfuscated handshakes, multi-hop routing, and ephemeral sessions — fast, private, and without borders.">
<meta property="og:url" content="https://mitivpn.com/">
<meta property="og:image" content="https://mitivpn.com/og-image.png">
<meta property="og:locale" content="en_US">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="MiTiVPN — No-Log VPN for Censorship-Resistant Internet Access">
<meta name="twitter:description" content="Obfuscated handshakes, multi-hop routing, ephemeral sessions. A VPN built for the places ordinary VPNs get blocked.">
<meta name="twitter:image" content="https://mitivpn.com/og-image.png">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MiTiVPN",
  "url": "https://mitivpn.com/",
  "email": "mitivpn@gmail.com",
  "description": "MiTiVPN is a no-log VPN built for blocked and filtered regions, using obfuscated handshakes, multi-hop routing, and ephemeral RAM-only sessions.",
  "sameAs": []
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When does MiTiVPN launch?",
      "acceptedAnswer": { "@type": "Answer", "text": "Soon. The network is being finished before it opens to the public. Join the notify list to be first to know." }
    },
    {
      "@type": "Question",
      "name": "Will there be a free tier?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. A free tier will exist from day one, since open access matters most where paying for it is hardest." }
    },
    {
      "@type": "Question",
      "name": "What platforms will be supported?",
      "acceptedAnswer": { "@type": "Answer", "text": "Windows, macOS, Linux, Android, and iOS are all planned for the initial release." }
    },
    {
      "@type": "Question",
      "name": "Do you keep connection logs?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. A strict no-log policy is a starting requirement of the architecture, not a promise added later." }
    },
    {
      "@type": "Question",
      "name": "How can I help or get involved?",
      "acceptedAnswer": { "@type": "Answer", "text": "Reach out by email — early testers, translators, and feedback are all welcome before launch." }
    }
  ]
}
</script>`
};
