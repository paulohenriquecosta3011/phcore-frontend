import { useEffect, useState } from "react";

export default function PWAInstall() {

  const [deferredPrompt, setDeferredPrompt] =
    useState<any>(null);

  const [installed, setInstalled] =
    useState(false);

  const [isDesktop, setIsDesktop] =
    useState(false);


  useEffect(() => {

    // Não mostra o botão em PC ou notebook
    const desktop =
      window.matchMedia(
        "(min-width: 768px)"
      ).matches;

    setIsDesktop(desktop);


    if (desktop) {

      return;

    }


    // Verifica se o aplicativo já está instalado
    const isStandalone =
      window.matchMedia(
        "(display-mode: standalone)"
      ).matches ||
      (window.navigator as any).standalone === true;


    if (isStandalone) {

      setInstalled(true);

      return;

    }


    // Evento disparado quando o navegador
    // permite instalar o PWA
    const handleBeforeInstallPrompt =
      (event: any) => {

        console.log(
          "PWA disponível para instalação"
        );

        event.preventDefault();

        setDeferredPrompt(event);

      };


    // Evento disparado após a instalação
    const handleAppInstalled = () => {

      console.log(
        "PWA instalado com sucesso"
      );

      setInstalled(true);

      setDeferredPrompt(null);

    };


    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );


    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );


    return () => {

      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );


      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );

    };


  }, []);



  async function handleInstall() {

    if (!deferredPrompt) {

      alert(
        "O navegador ainda não liberou a instalação automática. Use o menu ⋮ do Chrome e escolha 'Instalar aplicativo'."
      );

      return;

    }


    // Abre a janela oficial do navegador
    deferredPrompt.prompt();


    const result =
      await deferredPrompt.userChoice;


    console.log(
      "Resultado da instalação:",
      result
    );


    // Esconde o aviso quando o usuário aceita
    if (
      result.outcome === "accepted"
    ) {

      setInstalled(true);

    }


    // O evento só pode ser usado uma vez
    setDeferredPrompt(null);

  }



  // Não mostra no PC ou se já estiver instalado
  if (
    installed ||
    isDesktop
  ) {

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
        boxShadow:
          "0 4px 15px rgba(0,0,0,0.2)",
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