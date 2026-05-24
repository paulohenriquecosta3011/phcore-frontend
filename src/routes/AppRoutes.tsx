//AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

import { PrivateRoute } from "./PrivateRoute";
import { AppLayout } from "../components/Layout/AppLayout";
import Guests from "../pages/Guests/Guests";
import GuestCreate from "../pages/Guests/GuestCreate";
import InvitationList from "../pages/Invitations/InvitationList";
import PublicInvitation from "../pages/PublicInvitation/PublicInvitation";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/convite/:token"element={<PublicInvitation/>}  />
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/guests" element={<Guests />} />
        <Route path="/guests/new" element={<GuestCreate />} />
        {/* 👇 ADICIONE ISSO */}
        <Route  path="/invitations/list"  element={<InvitationList />}/>

        <Route path="/invitations/new" element={<div>Gerar Convite</div>} />
        <Route path="/messages" element={<div>Recados</div>} />

      </Route>

      <Route path="*" element={<Navigate to="/login" />} />

    
    </Routes>
  );
}