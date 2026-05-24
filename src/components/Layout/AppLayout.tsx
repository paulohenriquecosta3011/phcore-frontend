import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";

function useIsMobile() {

  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {

    const check = () =>
      setIsMobile(
        window.innerWidth <= 768
      );

    check();

    window.addEventListener(
      "resize",
      check
    );

    return () =>
      window.removeEventListener(
        "resize",
        check
      );

  }, []);

  return isMobile;

}

export function AppLayout() {

  const isMobile =
    useIsMobile();

  const [menuOpen, setMenuOpen] =
    useState(false);

  useEffect(() => {

    if (!isMobile) {

      setMenuOpen(false);

    }

  }, [isMobile]);

  return (

    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >

      {/* SIDEBAR DESKTOP */}

      {!isMobile && (

        <aside
          style={{
            flexShrink: 0,
          }}
        >
          <Sidebar />
        </aside>

      )}

      {/* SIDEBAR MOBILE */}

      {isMobile && menuOpen && (

        <>

          {/* overlay escuro */}

          <div
            onClick={() =>
              setMenuOpen(false)
            }
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "rgba(0,0,0,0.5)",
              zIndex: 10,
            }}
          />

          {/* sidebar flutuante */}

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100%",
              width: "260px",
              background: "#111827",
              zIndex: 20,
            }}
          >
          <Sidebar
              onNavigate={() =>
                setMenuOpen(false)
              }
          />
          </div>

        </>

      )}

      {/* CONTEÚDO */}

      <main
        style={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
        }}
      >

        {/* botão hambúrguer no mobile */}

        {isMobile && (

          <button
            onClick={() =>
              setMenuOpen(true)
            }
            style={{
              margin: "10px",
              padding: "8px 12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
            }}
          >
            ☰ Menu
          </button>

        )}

        <Outlet />

      </main>

    </div>

  );

}