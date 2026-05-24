import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { QRCode } from "react-qr-code";

export default function PublicInvitation() {

  const { token } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [invitation, setInvitation] =
    useState<any>(null);

  const [error, setError] =
    useState("");

  useEffect(() => {

    loadInvitation();

  }, []);

  async function loadInvitation() {

    try {

      const response =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/v1/invitations/public/${token}`

        );

      setInvitation(
        response.data.data
      );

    } catch (err) {

      console.error(err);

      setError(
        "Convite não encontrado"
      );

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        Carregando...
      </div>

    );

  }

  if (error) {

    return (

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          color: "#dc2626",
        }}
      >
        {error}
      </div>

    );

  }

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          borderRadius: "24px",
          padding: "32px",
          boxSizing: "border-box",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >

        <h1
          style={{
            marginTop: 0,
            marginBottom: "12px",
          }}
        >
          Convite Digital
        </h1>

        <div
          style={{
            marginBottom: "30px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#16a34a",
          }}
        >
          LIBERADO
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >

          <QRCode
            value={invitation.token}
            size={240}
          />

        </div>

        <div
          style={{
            fontSize: "13px",
            color: "#9ca3af",
          }}
        >
          Apresente este QRCode na portaria
        </div>

      </div>

    </div>

  );

}