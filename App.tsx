
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

const hearts = [0, 1, 2, 3, 4];

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.8 8.7c0 5.1-8.8 10.5-8.8 10.5S3.2 13.8 3.2 8.7A4.5 4.5 0 0 1 12 6.6a4.5 4.5 0 0 1 8.8 2.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function CandleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 10h8v10H8zM10 10V6h4v4M12 3c1.2 1.4 1.5 2.1 0 3.2C10.5 5.1 10.8 4.4 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 20h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WindIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 8h11.5a2.5 2.5 0 1 0-2.3-3.5M3 12h16a2 2 0 1 1-1.8 2.9M3 16h8.5a2.5 2.5 0 1 1-2.3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.5c.8 5.1 3.1 7.4 8.2 8.2-5.1.8-7.4 3.1-8.2 8.2-.8-5.1-3.1-7.4-8.2-8.2 5.1-.8 7.4-3.1 8.2-8.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M19 17v4m-2-2h4M5 2v4M3 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 13V3m0 0L6.5 6.5M10 3l3.5 3.5M4 10.5v4A2.5 2.5 0 0 0 6.5 17h7a2.5 2.5 0 0 0 2.5-2.5v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OceanWaves() {
  return (
    <img
      className="ocean-waves"
      src="/water-motion.webp"
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}

function Heart() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 8.7c0 5.1-8.8 10.5-8.8 10.5S3.2 13.8 3.2 8.7A4.5 4.5 0 0 1 12 6.6a4.5 4.5 0 0 1 8.8 2.1Z" />
    </svg>
  );
}

function App() {
  const [shareStatus, setShareStatus] = useState('');
  const [candlesLit, setCandlesLit] = useState(true);
  const [candlePulse, setCandlePulse] = useState(0);
  const [wishOpen, setWishOpen] = useState(false);
  const [wishStatus, setWishStatus] = useState('');
  const [wishCelebration, setWishCelebration] = useState(0);
  const wishTriggerRef = useRef<HTMLButtonElement>(null);
  const wishConfirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (wishOpen) wishConfirmRef.current?.focus();
  }, [wishOpen]);

  async function shareWish() {
    const shareData = {
      title: 'Happy Birthday, Bhaursy!',
      text: 'A little magic, just for you. May all your dreams come true, always...',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus('Your birthday wish is ready to share.');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus('The birthday wish link has been copied.');
      } else {
        setShareStatus('Copy this page link to share the birthday wish.');
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      setShareStatus('Copy this page link to share the birthday wish.');
    }
  }

  function lightCandles() {
    setCandlesLit(true);
    setCandlePulse((pulse) => pulse + 1);
    setWishStatus('');
  }

  function blowOutCandles() {
    setCandlesLit(false);
    setCandlePulse((pulse) => pulse + 1);
    setWishStatus('The candles are out. Make a wish!');
  }

  function closeWish() {
    setWishOpen(false);
    wishTriggerRef.current?.focus();
  }

  function completeWish() {
    setWishOpen(false);
    setWishStatus('May all your dreams come true, always.');
    setWishCelebration((celebration) => celebration + 1);
    wishTriggerRef.current?.focus();
  }

  function keepFocusInDialog(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeWish();
      return;
    }

    if (event.key !== 'Tab') return;
    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('button');
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <main className="birthday-page">
      <div className="floating-hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <span className="floating-heart" key={heart}><Heart /></span>
        ))}
      </div>

      <section className="page-frame" aria-labelledby="birthday-title">
        <h1 className="visually-hidden" id="birthday-title">Happy Birthday, Bhaursy!</h1>
        <div className="greeting-topline" aria-hidden="true">
          <span className="topline-rule" />
          <span>A LITTLE MAGIC, JUST FOR YOU</span>
          <span className="topline-rule" />
        </div>

        <div className={`artwork-shell ${candlesLit ? 'candles-lit' : 'candles-out'}`}>
          <div className="artwork-scene">
            <img
              className="artwork"
              src="/bhaursy-birthday.png"
              alt="A pink beach sunset birthday scene with a cake, flowers, and hearts. It reads: A LITTLE MAGIC, JUST FOR YOU. Happy Birthday, Bhaursy! May all your dreams come true, always..."
              fetchPriority="high"
            />
            <OceanWaves />
            {candlesLit ? (
              <span
                key={`candle-${candlePulse}`}
                className="candle-warmth"
                aria-hidden="true"
              />
            ) : (
              <div className="candle-smoke" aria-hidden="true">
                <span className="smoke-puff smoke-puff-one" />
                <span className="smoke-puff smoke-puff-two" />
                <span className="smoke-puff smoke-puff-three" />
              </div>
            )}
            {wishCelebration > 0 && (
              <div key={`wish-${wishCelebration}`} className="wish-sparkles" aria-hidden="true">
                <span><SparkleIcon /></span>
                <span><HeartIcon /></span>
                <span><SparkleIcon /></span>
                <span><HeartIcon /></span>
                <span><SparkleIcon /></span>
              </div>
            )}
          </div>
        </div>

        <div className="birthday-controls" role="group" aria-label="Birthday actions">
          <button
            className="action-button"
            type="button"
            aria-pressed={candlesLit}
            onClick={lightCandles}
          >
            <CandleIcon />
            <span>Light the Candles</span>
            <HeartIcon />
          </button>
          <button
            className="action-button"
            type="button"
            aria-pressed={!candlesLit}
            onClick={blowOutCandles}
          >
            <WindIcon />
            <span>Blow Them Out</span>
            <HeartIcon />
          </button>
          <button
            ref={wishTriggerRef}
            className="action-button action-button-wish"
            type="button"
            onClick={() => setWishOpen(true)}
          >
            <SparkleIcon />
            <span>Make a Wish</span>
            <HeartIcon />
          </button>
        </div>

        <p className="action-status" role="status" aria-live="polite">
          {wishStatus}
        </p>

        <div className="under-art">
          <p className="after-note">A little piece of this sunset, just for you.</p>
          <button className="share-button" type="button" onClick={shareWish}>
            <ShareIcon />
            <span>Share this wish</span>
          </button>
        </div>
        <p className="share-status" role="status" aria-live="polite">{shareStatus}</p>
      </section>

      {wishOpen && (
        <div
          className="wish-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeWish();
          }}
        >
          <section
            className="wish-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wish-title"
            aria-describedby="wish-description"
            onKeyDown={keepFocusInDialog}
          >
            <button
              className="wish-close"
              type="button"
              aria-label="Close wish"
              onClick={closeWish}
            >
              <span aria-hidden="true">×</span>
            </button>
            <span className="wish-modal-icon"><SparkleIcon /></span>
            <h2 id="wish-title">Make a little wish</h2>
            <p id="wish-description">
              Close your eyes and think of something wonderful. Your wish is yours to keep.
            </p>
            <button
              ref={wishConfirmRef}
              className="wish-confirm"
              type="button"
              onClick={completeWish}
            >
              <span>I made my wish</span>
              <HeartIcon />
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
