export type Invitation = {
  id_convite: number;

  cpf_convidado: string;

  nome_convidado: string;

  telefone_convidado: string;

  foto_convidado: string | null;

  dataconvite: string;

  data_Final: string;

  status: string;

  token: string;

  status_portaria: string;
};