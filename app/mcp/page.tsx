"use client";

const CONNECTOR_URL = "https://api.upspring.ai/mcp";
const CONNECT_CTA_URL = "https://claude.ai/directory/connectors/upspring";

const clientLogos: { src: string; alt: string; text?: string }[] = [
  { src: "/assets/clients/ridge.svg", alt: "Ridge" },
  { src: "/assets/clients/adidas-logo.svg", alt: "Adidas" },
  { src: "/assets/clients/delta-children.png", alt: "Delta Children" },
  { src: "/assets/clients/publicis.png", alt: "Publicis Groupe" },
  { src: "/assets/clients/onebone.svg", alt: "One Bone" },
  { src: "/assets/clients/yves.png", alt: "Yves Rocher" },
  { text: "Baking Steel" },
  { src: "/assets/clients/stella-chewys.png", alt: "Stella & Chewy's" },
  { src: "/assets/clients/miscn-logo.png", alt: "MISCN" },
  { src: "/assets/clients/cape-diablo.png", alt: "Cape Diablo" },
  { src: "/assets/clients/bezel.png", alt: "Bezel" },
  { text: "Casper" },
  { src: "/assets/clients/steve.png", alt: "Steve Madden" },
  { src: "/assets/clients/fct.png", alt: "FCT" },
];

function MarqueeTrack() {
  return (
    <div className="marquee-track">
      {clientLogos.map((item, i) =>
        item.src ? (
          <img key={i} src={item.src} alt={item.alt} />
        ) : (
          <span key={i}>{item.text}</span>
        )
      )}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <div className="page">
        <div className="brand-row">
          <img src="/assets/upspring-mcp-lockup-v3.png" alt="upspring.ai MCP" />
        </div>

        <h1>
          A <span className="em">portal</span> for a whole new
          <br />
          world of knowledge.
        </h1>

        <p className="official-badge">
          <img src="/assets/claude-burst.png" alt="" />
          Official Claude Connector
        </p>

        <p className="kicker-sub">Stop burning your tokens.</p>

        <p className="subhead">
          Plug Upspring into Claude, or any AI client that supports custom
          connectors, and ask about competitors, industries, and your own ad
          performance — in plain language.
        </p>

        <div className="hero-frame">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/poster.jpg"
          >
            <source src="/assets/portal-hero.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="connector">
          <div className="connector-chip">
            <span className="dot" />
            <span>{CONNECTOR_URL}</span>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(CONNECTOR_URL)}
            >
              Copy
            </button>
          </div>
          <p className="connector-note">
            Add as a custom connector. No API keys. About a minute.
          </p>
        </div>

        <div className="cta">
          <a className="btn-primary" href={CONNECT_CTA_URL}>
            <img className="btn-claude-icon" src="/assets/claude-burst.png" alt="" />
            Connect Upspring →
          </a>
        </div>

        <div className="trust">
          <span className="trust-label">Works with</span>
          <div className="trust-icons">
            <img src="/assets/claude-icon.svg" alt="Claude" />
            <img src="/assets/chatgpt-logo.svg" alt="ChatGPT" />
            <img src="/assets/gemini.webp" alt="Gemini" />
            <img src="/assets/perplexity.webp" alt="Perplexity" />
            <img src="/assets/clients/cursor.png" alt="Cursor" />
          </div>
        </div>

        <div className="clients">
          <p className="clients-label">Trusted by · Industry leaders</p>
          <div className="marquee">
            <MarqueeTrack />
            <MarqueeTrack />
          </div>
        </div>

        <footer>
          <img src="/assets/upspring-mcp-icon-v2.png" alt="" />
          <span>
            Upspring · MCP ·{" "}
            <a href="https://www.upspring.ai/mcp-docs">How it works →</a>
          </span>
        </footer>
      </div>

      <style>{`
        :root{
          --bg:#FFFFFF;
          --ink:#141210;
          --ink-muted:#6B655C;
          --ink-faint:#9B958B;
          --coral:#F0745C;
          --coral-deep:#CF5540;
          --border:#ECE7DE;
          --border-strong:#DED7CA;
          --radius-sm:10px;
          --radius-md:14px;
          --radius-lg:16px;
          --radius-xl:24px;
          --radius-pill:9999px;
          --shadow-md: 0 24px 60px -24px rgba(20,18,16,.22);
          --font: "Geist", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
          --font-serif: "Fraunces", "Iowan Old Style", "Palatino Linotype", Georgia, serif;
        }

        *{ box-sizing:border-box; margin:0; padding:0; }

        html, body{
          background:var(--bg);
          color:var(--ink);
          font-family:var(--font);
          -webkit-font-smoothing:antialiased;
          min-height:100vh;
          width:100%;
          overflow-x:hidden;
        }

        .page{
          width:100%;
          max-width:900px;
          margin:0 auto;
          padding:64px 24px 56px;
          display:flex;
          flex-direction:column;
          align-items:center;
          text-align:center;
        }
        .page > *{ max-width:100%; min-width:0; }

        .brand-row{
          display:flex;
          align-items:center;
          margin-bottom:56px;
        }
        .brand-row img{ height:32px; width:auto; display:block; }

        h1{
          font-family:var(--font-serif);
          font-weight:520;
          font-size:clamp(26px, 4.2vw, 42px);
          line-height:1.18;
          letter-spacing:-0.01em;
          color:var(--ink);
          max-width:30ch;
        }
        h1 .em{
          font-style:italic;
          font-optical-sizing:auto;
          color:var(--coral-deep);
        }

        .official-badge{
          margin-top:18px;
          display:inline-flex;
          align-items:center;
          gap:7px;
          background:rgba(240,116,92,.1);
          color:var(--coral-deep);
          font-size:12px;
          font-weight:600;
          letter-spacing:.02em;
          padding:6px 13px;
          border-radius:var(--radius-pill);
        }
        .official-badge img{
          height:14px;
          width:14px;
          display:block;
        }

        .kicker-sub{
          margin-top:14px;
          font-family:var(--font-serif);
          font-style:italic;
          font-weight:500;
          font-size:clamp(17px, 2vw, 21px);
          color:var(--coral-deep);
        }

        .subhead{
          margin-top:18px;
          font-size:17px;
          line-height:1.55;
          color:var(--ink-muted);
          max-width:46ch;
        }

        .hero-frame{
          margin-top:44px;
          width:100%;
          max-width:820px;
          min-width:0;
          border-radius:var(--radius-xl);
          border:1px solid var(--border);
          box-shadow:var(--shadow-md);
          overflow:hidden;
          background:#0B0B0C;
          aspect-ratio:16/9;
        }
        .hero-frame video{
          width:100%;
          height:100%;
          display:block;
          object-fit:cover;
        }

        .connector{
          margin-top:36px;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:10px;
        }
        .connector-chip{
          display:flex;
          align-items:center;
          gap:10px;
          max-width:100%;
          background:var(--bg);
          border:1px solid var(--border);
          border-radius:var(--radius-md);
          padding:11px 16px;
          font-family:"SF Mono", "JetBrains Mono", ui-monospace, Menlo, monospace;
          font-size:14px;
          color:var(--ink);
          box-shadow:0 1px 2px rgba(32,24,16,.04);
        }
        .connector-chip > span{
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          min-width:0;
        }
        .connector-chip .dot{
          width:7px; height:7px; border-radius:50%;
          background:var(--coral);
          flex:none;
        }
        .connector-chip button{ flex:none; }
        .connector-chip button{
          border:none;
          background:var(--border);
          color:var(--ink-muted);
          font-family:var(--font);
          font-size:12px;
          font-weight:600;
          border-radius:var(--radius-pill);
          padding:5px 11px;
          cursor:pointer;
        }
        .connector-note{
          font-size:13px;
          color:var(--ink-faint);
        }

        .cta{
          margin-top:26px;
        }
        .btn-primary{
          display:inline-flex;
          align-items:center;
          gap:8px;
          background:var(--coral);
          color:#FFFFFF;
          font-family:var(--font);
          font-weight:600;
          font-size:16px;
          text-decoration:none;
          padding:14px 28px;
          border-radius:var(--radius-pill);
          box-shadow:0 12px 24px -10px rgba(240,116,92,.55);
          transition:transform .15s ease, box-shadow .15s ease;
        }
        .btn-primary:hover{
          transform:translateY(-1px);
          box-shadow:0 16px 28px -10px rgba(240,116,92,.6);
        }
        .btn-claude-icon{
          height:20px;
          width:20px;
          display:block;
          filter:brightness(0) invert(1);
        }

        .trust{
          margin-top:60px;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:16px;
        }
        .trust-label{
          font-size:11px;
          font-weight:600;
          letter-spacing:.08em;
          text-transform:uppercase;
          color:var(--ink-faint);
        }
        .trust-icons{
          display:flex;
          align-items:center;
          gap:28px;
        }
        .trust-icons img{
          height:26px;
          width:auto;
          opacity:.55;
          filter:grayscale(1);
        }

        .clients{
          margin-top:64px;
          width:100%;
        }
        .clients-label{
          font-size:11px;
          font-weight:600;
          letter-spacing:.08em;
          text-transform:uppercase;
          color:var(--ink-faint);
          margin-bottom:20px;
        }
        .marquee{
          display:flex;
          width:100%;
          overflow:hidden;
          -webkit-mask-image:linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
          mask-image:linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
        }
        .marquee-track{
          flex:none;
          display:flex;
          align-items:center;
          gap:48px;
          padding-right:48px;
          width:max-content;
          animation:scroll-left 32s linear infinite;
        }
        .marquee-track span{
          font-family:var(--font);
          font-weight:600;
          font-size:16px;
          color:var(--ink-faint);
          white-space:nowrap;
        }
        .marquee-track img{
          height:20px;
          width:auto;
          display:block;
          filter:grayscale(1);
          opacity:.6;
        }
        @keyframes scroll-left{
          from{ transform:translateX(0); }
          to{ transform:translateX(-100%); }
        }

        footer{
          margin-top:72px;
          display:flex;
          align-items:center;
          gap:8px;
          font-size:13px;
          color:var(--ink-faint);
        }
        footer img{ height:14px; width:auto; opacity:.7; }
        footer a{
          color:var(--ink-faint);
          text-decoration:underline;
          text-underline-offset:2px;
        }

        @media (max-width:640px){
          .page{ padding:40px 20px 44px; }
          .brand-row{ margin-bottom:32px; }
          .brand-row img{ height:26px; }
          h1{ font-size:clamp(24px, 7.5vw, 32px); line-height:1.2; }
          .kicker-sub{ margin-top:12px; }
          .subhead{ margin-top:16px; font-size:15px; line-height:1.5; }
          .hero-frame{ margin-top:32px; border-radius:var(--radius-lg); }
          .connector{ margin-top:28px; width:100%; }
          .connector-chip{ width:100%; font-size:12px; padding:10px 12px; }
          .connector-note{ text-align:center; }
          .cta{ margin-top:22px; width:100%; }
          .btn-primary{ width:100%; justify-content:center; font-size:15px; padding:14px 20px; }
          .trust{ margin-top:44px; }
          .trust-icons{ gap:20px; flex-wrap:wrap; justify-content:center; }
          .clients{ margin-top:48px; }
          .marquee-track{ gap:32px; padding-right:32px; }
          footer{ margin-top:52px; padding:0 8px; text-align:center; line-height:1.5; }
        }
      `}</style>
    </>
  );
}
