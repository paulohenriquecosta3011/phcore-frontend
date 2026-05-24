//menu.ts
export const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Convites",
    children: [
      {
        label: "Lista de Convites",
        path: "/invitations/list",
      },
      {
        label: "Gerar Convite",
        path: "/invitations/new",
      },
    ],
  },
  {
    label: "Recados",
    path: "/messages",
  },
];