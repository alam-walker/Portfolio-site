'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { site } from './content';

const PANELS = ['about', 'work', 'contact'];

function Window({ id, title, onClose, children }) {
  return (
    <div
      className="window"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
    >
      <div className="titlebar">
        <h2 id={`${id}-title`}>{title}</h2>
        <button className="close" onClick={onClose} aria-label="Close panel">
          ×
        </button>
      </div>
      <div className="window-body">{children}</div>
    </div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(null);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <div className="stage">
      <Image
        src="/hero.png"
        alt="8-bit pixel art of a developer coding at night, city lights outside the window"
        fill
        priority
        sizes="100vw"
        className="bg"
      />
      <div className="scrim" aria-hidden="true" />

      <header className="topbar">
        <h1>
          <button className="wordmark" onClick={close} aria-label="Bahauddin Alam — home">
            Bahauddin
            <br />
            Alam
          </button>
        </h1>
        <nav className="nav" aria-label="Primary">
          {PANELS.map((panel) => (
            <button
              key={panel}
              onClick={() => setOpen(open === panel ? null : panel)}
              aria-expanded={open === panel}
              aria-controls={`panel-${panel}`}
            >
              {panel}
            </button>
          ))}
        </nav>
      </header>

      <p className="corner" aria-hidden="true">
        © {new Date().getFullYear()} — {site.role}
      </p>

      {open && (
        <div
          className="overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {open === 'about' && (
            <Window id="panel-about" title="About" onClose={close}>
              <p className="pixel-heading">{site.statement}</p>
              <p className="lede">{site.lede}</p>
              <ul className="stack" aria-label="Tech stack">
                {site.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </Window>
          )}

          {open === 'work' && (
            <Window id="panel-work" title="Work" onClose={close}>
              <p className="pixel-heading">What I do.</p>
              <div>
                {site.capabilities.map((item, i) => (
                  <div className="cap" key={item.title}>
                    <span className="num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Window>
          )}

          {open === 'contact' && (
            <Window id="panel-contact" title="Contact" onClose={close}>
              <p className="pixel-heading">Let&rsquo;s build something great.</p>
              <p className="lede">Have something to build? My inbox is always open.</p>
              <p>
                <a className="btn-pixel" href={`mailto:${site.email}`}>
                  Say hello
                </a>
              </p>
              <div className="socials">
                <a href={site.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            </Window>
          )}
        </div>
      )}
    </div>
  );
}
