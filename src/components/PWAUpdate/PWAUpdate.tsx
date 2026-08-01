import { useRegisterSW } from "virtual:pwa-register/react";
import { useState } from "react";

export default function PWAUpdate() {
  const [showUpdate, setShowUpdate] = useState(false);

  const {
    updateServiceWorker,
  } = useRegisterSW({
    onNeedRefresh() {
      setShowUpdate(true);
    },
  });

  if (!showUpdate) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          maxWidth: "400px",
          width: "90%",
          textAlign: "center",
        }}
      >
        <h2>
          Nova versão disponível
        </h2>

        <p>
          Uma nova versão do PHCore está pronta.
        </p>

        <button
          onClick={() => updateServiceWorker(true)}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Atualizar agora
        </button>
      </div>
    </div>
  );
}