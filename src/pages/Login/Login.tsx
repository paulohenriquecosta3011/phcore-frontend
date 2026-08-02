import { useEffect, useState } from "react";
import "./Login.css";

import { useLoginState } from "../../hooks/login/useLoginState";
import { useLoginController } from "../../hooks/login/useLoginController";
import { Link } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");

  const state = useLoginState();
  const controller = useLoginController();

  const {
    companies,
    selectedCompany,
    setSelectedCompany,
    error,
    loading,
    loadCompanies,
    login,
  } = controller;

  // 🔹 bootstrap (carregar email salvo e empresas)
  useEffect(() => {
    const savedEmail = localStorage.getItem("lastEmail");

    if (savedEmail) {
      state.setEmail(savedEmail);
      loadCompanies(savedEmail);
    }
  }, []);

  // 🔹 salvar email
  useEffect(() => {
    if (state.email) {
      localStorage.setItem("lastEmail", state.email);
    }
  }, [state.email]);

  // 🔹 salvar empresa
  useEffect(() => {
    if (selectedCompany) {
      localStorage.setItem("selectedCompany", String(selectedCompany));
    }
  }, [selectedCompany]);

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Club App</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) => state.setEmail(e.target.value)}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="email"
          spellCheck={false}     
        />

        {/* SENHA */}
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

     {/* EMPRESA - somente aparece quando houver mais de uma */}
        {companies.length > 1 && (
          <div className="form-group">
            <label>Empresa</label>

            <select
              className="select-company"
              value={selectedCompany ?? ""}
              onChange={(e) =>
                setSelectedCompany(Number(e.target.value))
              }
            >
              <option value="">
                Selecione uma empresa
              </option>

              {companies.map((c: any) => (
                <option
                  key={c.id_empresa}
                  value={c.id_empresa}
                >
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* BOTÃO LOGIN */}
        <button
          disabled={loading}
          onClick={() => login(state.email, password)}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <Link
          to="/forgot-password"
          className="forgot-password"
        >
          Esqueci minha senha
        </Link>
        <div className="app-version">
          Versão 1.1<br />
          Atualizado em 02/08/2026
        </div>
      </div>
    </div>
  );
}