import { useEffect, useState } from "react";

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {

    // Verifica se já está instalado como aplicativo
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      setInstalled(true);
      return;
    }


    // Evento disparado pelo Chrome quando o PWA pode ser instalado
    const handler = (event: any) => {
      console.log("PWA disponível para instalação");

      event.preventDefault();

      setDeferredPrompt(event);
    };


    window.addEventListener(
      "beforeinstallprompt",
      handler
    );


    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
    };

  }, []);


  async function handleInstall() {

    if (!deferredPrompt) {
      return;
    }


    // Abre o popup oficial do navegador
    deferredPrompt.prompt();


    const result =
      await deferredPrompt.userChoice;


    console.log(
      "Resultado instalação:",
      result
    );


    setDeferredPrompt(null);

  }


  if (installed || !deferredPrompt) {
    return null;
  }


  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        right: "20px",
        padding: "16px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        zIndex: 9999,
        textAlign: "center"
      }}
    >

      <h3>
        Instale o Clube App
      </h3>


      <p>
        Tenha acesso rápido pelo celular.
      </p>


      <button
        onClick={handleInstall}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Instalar aplicativo
      </button>

    </div>
  );
}