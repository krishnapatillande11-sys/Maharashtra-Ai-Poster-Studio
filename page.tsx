"use client";

import { useRef, useState } from "react";

const templates = [
  { name: "Birthday Celebration", tag: "Birthday", color: "birthday", title: "वाढदिवसाच्या हार्दिक शुभेच्छा" },
  { name: "Festival Greetings", tag: "Festival", color: "festival", title: "सणाच्या हार्दिक शुभेच्छा" },
  { name: "Business Promotion", tag: "Business", color: "business", title: "आपल्या व्यवसायाची जाहिरात" },
  { name: "Political Banner", tag: "Community", color: "political", title: "जनसेवेसाठी सदैव तत्पर" },
  { name: "Instagram Post", tag: "Social", color: "social", title: "Make your moment memorable" },
  { name: "Devotional Greeting", tag: "Festival", color: "devotional", title: "श्री गणेशाय नमः" },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("Marathi");
  const [posterText, setPosterText] = useState("वाढदिवसाच्या हार्दिक शुभेच्छा");
  const [personName, setPersonName] = useState("आपले नाव येथे");
  const [selected, setSelected] = useState(templates[0]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPay, setShowPay] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  async function generate() {
    setError("");
    if (prompt.trim().length < 8) {
      setError("Please enter a little more detail about the poster you want.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, language }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not generate image.");
      setImage(data.image);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function downloadPoster() {
    const node = document.getElementById("poster-preview");
    if (!node) return;
    // Download the current preview as an SVG image; uploaded/generated image backgrounds are included.
    const clone = node.cloneNode(true) as HTMLElement;
    clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    const serialized = new XMLSerializer().serializeToString(clone);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350"><foreignObject width="100%" height="100%">${serialized}</foreignObject></svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "maharashtra-ai-poster.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function startSubscription() {
    setError("");
    setShowPay(true);
    setError("To enable real monthly payments, add your Razorpay keys and a monthly plan ID to .env.local, then deploy the server. Do not share secret keys in chat.");
  }

  function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#"><span className="brand-mark">म</span><span>Maharashtra <b>AI Poster Studio</b></span></a>
        <div className="nav-links"><a href="#tools">AI Tools</a><a href="#templates">Templates</a><a href="#pricing">Pricing</a><button className="nav-cta" onClick={() => document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" })}>Create poster ↗</button></div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="spark">✦</span> YOUR IDEAS. YOUR LANGUAGE. YOUR DESIGN.</div>
          <h1>Turn your ideas into <em>beautiful posters.</em></h1>
          <p>Create birthday banners, festival greetings, business promotions and social posts in Marathi, Hindi or English — with AI or ready-to-edit templates.</p>
          <div className="hero-actions"><button className="primary" onClick={() => document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" })}>Start creating <span>→</span></button><a className="secondary" href="#templates">Explore templates</a></div>
          <div className="trust-row"><span>✦ Made for India</span><span>✦ Marathi-ready</span><span>✦ Beginner-friendly</span></div>
        </div>
        <div className="hero-art">
          <div className="poster-stack stack-back"><span>शुभेच्छा</span><small>CELEBRATE EVERY MOMENT</small></div>
          <div className="poster-stack stack-front"><div className="poster-sun">✺</div><span className="poster-kicker">आपल्या खास दिवसासाठी</span><strong>हार्दिक<br/>शुभेच्छा!</strong><div className="poster-line"></div><small>MAHARASHTRA AI POSTER STUDIO</small></div>
          <div className="floating-chip chip-one">✦ AI-powered design</div><div className="floating-chip chip-two">मराठी • हिंदी • English</div>
        </div>
      </section>

      <section className="stats"><div><strong>3</strong><span>Languages</span></div><div><strong>6+</strong><span>Starter templates</span></div><div><strong>∞</strong><span>Your creativity</span></div><div><strong>₹199</strong><span>Monthly premium plan</span></div></section>

      <section className="section" id="studio">
        <div className="section-heading"><div><div className="eyebrow">THE CREATION STUDIO</div><h2>Make something <em>memorable.</em></h2></div><p>Start with a prompt or customize a template. Your design preview updates as you edit.</p></div>
        <div className="studio-grid">
          <div className="editor-card">
            <div className="tab-row"><span className="active-tab">✦ AI Generator</span><span>▧ Template editor</span></div>
            <label htmlFor="prompt">Describe your poster</label>
            <textarea id="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Example: A premium Marathi birthday banner with gold lettering, festive lights and a royal blue background..." />
            <div className="field-row"><div><label htmlFor="language">Language</label><select id="language" value={language} onChange={e => setLanguage(e.target.value)}><option>Marathi</option><option>Hindi</option><option>English</option></select></div><div><label>Format</label><div className="format-pill">▯ Portrait 4:5</div></div></div>
            <button className="primary full" onClick={generate} disabled={loading}>{loading ? "Creating your design…" : "✦ Generate with AI"}</button>
            <div className="divider"><span>OR CUSTOMIZE A TEMPLATE</span></div>
            <label htmlFor="template">Choose a template</label>
            <select id="template" value={selected.name} onChange={e => setSelected(templates.find(t => t.name === e.target.value) || templates[0])}>{templates.map(t => <option key={t.name}>{t.name}</option>)}</select>
            <label htmlFor="posterText">Poster headline</label><input id="posterText" value={posterText} onChange={e => setPosterText(e.target.value)} />
            <label htmlFor="personName">Name / business</label><input id="personName" value={personName} onChange={e => setPersonName(e.target.value)} />
            <input ref={fileInput} type="file" accept="image/*" onChange={uploadPhoto} hidden />
            <button className="upload-btn" onClick={() => fileInput.current?.click()}>＋ Upload photo or logo</button>
            {error && <p className="notice">{error}</p>}
            <p className="small-note">AI generation requires an API key. Template editing works without one. Generated/uploaded images stay in this browser session.</p>
          </div>
          <div className="preview-area">
            <div className="preview-top"><span>LIVE PREVIEW</span><span className="live-dot">● PREVIEW</span></div>
            <div id="poster-preview" className={`poster-preview ${selected.color}`} style={image ? { backgroundImage: `linear-gradient(180deg, rgba(14,13,32,.10), rgba(14,13,32,.82)), url("${image}")` } : {}}>
              <div className="preview-decoration">✦</div><div className="preview-label">MAHARASHTRA AI POSTER STUDIO</div><div className="preview-title">{posterText || selected.title}</div><div className="preview-rule"></div><div className="preview-name">{personName}</div><div className="preview-bottom">आपल्या भावना, सुंदर डिझाइनमध्ये</div>
            </div>
            <div className="preview-actions"><button className="secondary" onClick={() => fileInput.current?.click()}>＋ Add image</button><button className="primary" onClick={downloadPoster}>Download preview ↓</button></div>
            <p className="small-note">Preview download is an SVG. For reliable print-ready PNG/JPG export, configure a production export service before launch.</p>
          </div>
        </div>
      </section>

      <section className="section templates-section" id="templates">
        <div className="section-heading"><div><div className="eyebrow">START WITH A TEMPLATE</div><h2>Good design, <em>made simpler.</em></h2></div><p>Choose a starting point, then personalize it with your words and images.</p></div>
        <div className="template-grid">{templates.map(t => <button className="template-card" key={t.name} onClick={() => { setSelected(t); setPosterText(t.title); document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" }); }}><div className={`template-thumb ${t.color}`}><span>✦</span><strong>{t.title}</strong><small>{t.tag.toUpperCase()}</small></div><div className="template-meta"><strong>{t.name}</strong><span>Customize ↗</span></div></button>)}</div>
      </section>

      <section className="pricing-section" id="pricing"><div className="eyebrow">SIMPLE PRICING</div><h2>Make more with <em>Premium.</em></h2><p className="pricing-intro">Start free. Upgrade when you're ready for more creative power.</p><div className="price-grid"><div className="price-card"><span className="plan-label">STARTER</span><h3>Free</h3><p>For trying out your ideas.</p><ul><li>✓ Template editor</li><li>✓ Basic customization</li><li>✓ Preview downloads</li><li>✓ Upload your own image</li></ul><button className="secondary full" onClick={() => document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" })}>Start for free</button></div><div className="price-card featured"><div className="popular">MOST POPULAR</div><span className="plan-label">PREMIUM</span><h3>₹199 <small>/ month</small></h3><p>For creators who want more.</p><ul><li>✓ AI image generation (usage limits apply)</li><li>✓ Premium template access</li><li>✓ Higher-resolution exports, once configured</li><li>✓ Marathi, Hindi and English</li><li>✓ Commercial-use terms clearly defined</li></ul><button className="primary full" onClick={startSubscription}>Get Premium →</button><p className="small-note">Payment activation needs a Razorpay account and configured monthly plan.</p></div></div></section>

      <footer><a className="brand" href="#"><span className="brand-mark">म</span><span>Maharashtra <b>AI Poster Studio</b></span></a><span>Made with creativity in Maharashtra 🇮🇳</span><span>© {new Date().getFullYear()} Maharashtra AI Poster Studio</span></footer>
      {showPay && <div className="modal-backdrop" onClick={() => setShowPay(false)}><div className="modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setShowPay(false)}>×</button><div className="modal-icon">₹</div><h3>Premium membership</h3><p>₹199/month</p><p className="small-note">Online checkout is not active yet. Add Razorpay credentials and a monthly plan ID on the server, then finish the subscription verification and webhook setup before accepting real payments.</p><button className="secondary full" onClick={() => setShowPay(false)}>Close</button></div></div>}
    </main>
  );
}
