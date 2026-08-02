import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createGuest,
  findGuestByCpf,
} from "../../services/guest.service";

function formatCPF(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

function formatPhone(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
}

export default function GuestCreate() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  

  const [guestExists, setGuestExists] =
    useState(false);

  const [fotoPreview, setFotoPreview] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCpfBlur() {
    if (!cpf) return;

    try {
      const data = await findGuestByCpf(
        cpf.replace(/\D/g, "")
      );

      if (data.exists) {
        setGuestExists(true);

        setNome(data.convidado.nome || "");

        setTelefone(
          data.convidado.telefone || ""
        );

        setFotoPreview(
          `${import.meta.env.VITE_API_URL}/uploads/${data.convidado.foto}`
        );
      } else {
        setGuestExists(false);

        setNome("");
        setTelefone("");
        setFotoPreview("");
      }
    } catch (error) {
      console.error(error);
    }
  }

 function handleFotoChange(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];

  console.log("Arquivo selecionado:", file);

  if (!file) {
    return;
  }

  setFoto(file);

  const previewUrl = URL.createObjectURL(file);

  setFotoPreview(previewUrl);
}
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (!foto && !guestExists) {
      setError("Selecione uma foto.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("nome", nome);

      formData.append(
        "cpf",
        cpf.replace(/\D/g, "")
      );

      formData.append(
        "telefone",
        telefone
      );

      if (foto) {
        formData.append("foto", foto);
      }

      await createGuest(formData);

      navigate("/guests");
    } catch (err: any) {
      console.log(err.response.data);

      const message =
        err?.response?.data?.message;

      if (
        message ===
        "An invite for this CPF and date already exists."
      ) {
        navigate("/guests");
        return;
      }

      setError(
        message ||
          "Erro ao cadastrar convidado."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          maxWidth: "500px",
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid #ddd",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            marginBottom: "24px",
          }}
        >
        <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#f3f4f6",
              border: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {fotoPreview ? (
              <img
                src={fotoPreview}
                alt="Foto"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <span
                style={{
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                Sem foto
              </span>
            )}
          </div>

          <h1
            style={{
              margin: 0,
            }}
          >
            Convidado
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >

          {/* CPF */}
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) =>
              setCpf(
                formatCPF(
                  e.target.value
                )
              )
            }
            onBlur={handleCpfBlur}
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border:
                "1px solid #ccc",
            }}
          />

          {/* Nome */}
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) =>
              setNome(
                e.target.value
              )
            }
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border:
                "1px solid #ccc",
            }}
          />

          {/* Telefone */}
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) =>
              setTelefone(
                formatPhone(
                  e.target.value
                )
              )
            }
            style={{
              padding: "12px",
              borderRadius: "8px",
              border:
                "1px solid #ccc",
            }}
          />

          {/* Fotos */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <button
              type="button"
              disabled={guestExists}
              onClick={() =>
                fileInputRef.current?.click()
              }
              style={{
                padding: "12px 20px",
                background: "#2563eb",
                color: "#fff",
                borderRadius: "8px",
                border: "none",
                cursor: guestExists
                  ? "not-allowed"
                  : "pointer",
                opacity: guestExists ? 0.5 : 1,
              }}
            >
              🖼️ Escolher foto
            </button>

           
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              disabled={guestExists}
              onChange={handleFotoChange}
              style={{
                display: "none",
              }}
            />

           
          </div>

          {error && (
            <div
              style={{
                color: "#dc2626",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {loading
              ? "Processando..."
              : guestExists
              ? "Adicionar"
              : "Cadastrar"}
          </button>

        </form>
      </div>
    </div>
  );
}