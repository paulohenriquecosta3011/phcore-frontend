import { getCompaniesByEmail } from "../../services/company.service";
import type { Company } from "../../services/company.service";
import { login } from "../../services/auth.service";

export function useLoginActions() {


  // 🔹 1. Buscar empresas por email (camada segura)
  const fetchCompanies = async (email: string): Promise<Company[]> => {
    try {
      const result = await getCompaniesByEmail(email);

      // 🔍 debug seguro (pode remover depois)
      console.log("COMPANIES RESPONSE:", result);

      return result ?? [];
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
      return [];
    }
  };

  // 🔹 2. Resolver regra de empresa
  const resolveCompanies = async (email: string) => {
    const companies = await fetchCompanies(email);

    let selectedCompany: number | null = null;

    // 🔐 regra segura
    if (Array.isArray(companies) && companies.length === 1) {
      selectedCompany = companies[0]?.id_empresa ?? null;
    }

    return {
      companies: Array.isArray(companies) ? companies : [],
      selectedCompany,
    };
  };

  // 🔹 3. Login (somente API)
  const doLogin = async (
    email: string,
    password: string,
    companyId: number
  ) => {
    const result = await login(email, password, companyId);

    console.log("LOGIN RESPONSE:", result);

    return result;
  };

  return {
    fetchCompanies,
    resolveCompanies,
    doLogin,
  };
}