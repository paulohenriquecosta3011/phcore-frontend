import { useEffect, useState } from "react";

import { getMyInvitations } from "../../services/invitation.service";

import type { Invitation } from "../../types/invitation";

export function useInvitationList() {

  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const [loading, setLoading] = useState(false);

  async function loadInvitations() {

    try {

      setLoading(true);

      const data = await getMyInvitations();

      setInvitations(data);

    } catch (error) {

      console.error(
        "Erro ao carregar convites:",
        error
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadInvitations();

  }, []);

  return {
    invitations,
    loading,
    reloadInvitations: loadInvitations,
  };

}