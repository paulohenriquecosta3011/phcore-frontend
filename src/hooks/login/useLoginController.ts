//useLoginController.tsx
import { useState } from "react";
import { useLoginActions } from "./useLoginActions";
import { useAuth } from "../useAuth";
import type { Company } from "../../types/company";
import { useNavigate } from "react-router-dom";


export function useLoginController() {
  const actions = useLoginActions();
  const { setToken } = useAuth();
  
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // 🔹 carregar empresas (bootstrap)
  const loadCompanies = async (email: string) => {
  const res = await actions.resolveCompanies(email);

    setCompanies(res.companies);

    if (res.selectedCompany) {
      setSelectedCompany(res.selectedCompany);
    }

    return res.companies;
  };

  // 🔹 login (fluxo completo)
  const login = async (email: string, password: string) => {
    try {
      setError(null);

   let companyId = selectedCompany;

if (!companyId) {

  const res = await actions.resolveCompanies(email);

  setCompanies(res.companies);

          if (res.selectedCompany) {
            companyId = res.selectedCompany;
            setSelectedCompany(companyId);
          } else {
            setError("Please select a company");
            return;
          }
        }

      setLoading(true);

      const result = await actions.doLogin(
        email,
        password,
         companyId
      );
      console.log(result);

      localStorage.setItem("token", result.token);
      setToken(result.token);

      navigate("/dashboard");
    } catch (err: any) {
      console.log("ERROR COMPLETO:", err);
console.log("RESPONSE:", err?.response);
console.log("DATA:", err?.response?.data);
const code = err?.response?.data?.code;
const message = err?.response?.data?.message;
switch (code) {
  case "INVALID_PASSWORD":
    setError("Email ou senha inválidos");
    break;

  case "USER_NOT_FOUND":
    setError("Usuário não encontrado");
    break;

  default:
    if (message) {
      setError(message);
    } else {
      setError("Erro inesperado. Tente novamente.");
    }
}

    } finally {
      setLoading(false);
    }
  };

  return {
    // state
    companies,
    selectedCompany,
    error,
    loading,

    // setters
    setSelectedCompany,

    // actions expostas para o Login.tsx
    loadCompanies,
    login,
  };
}