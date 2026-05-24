//company.service.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export type Company = {
  id_empresa: number;
  nome: string;
};

type CompaniesResponse = {
  companies: Company[];
};

export const getCompaniesByEmail = async (
  email: string
): Promise<Company[]> => {
  console.log("Buscando empresas...");
console.log("URL:", `${API_URL}/api/v1/users/companies`);
  const response = await axios.post<{
    data: CompaniesResponse;
  }>(`${API_URL}/api/v1/users/companies`, {
    email,
  });

  return response.data.data?.companies || [];
};