import { useState } from "react";

export default function DemoSticker() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      backgroundColor: '#6e5c29',
      color: 'white',
      padding: '8px 14px',
      borderRadius: '5px',
      width: '300px',
      height: '100px',
      fontSize: '1.2rem',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    }}>
      Hi! Thanks for visiting.
      This is just a practice project, you can see original project at dev.centrixhub.ai
      <button onClick={() => setVisible(false)} style={{
        background: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: '1rem',
        cursor: 'pointer',
        lineHeight: 1,
      }}>
        ✕
      </button>
    </div>
  );
}
