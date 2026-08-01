

//useGuests.tsx

import { useEffect, useState } from "react";
import { getMyGuests } from "../../services/guest.service";
import type { Guest } from "../../types/guest";

export function useGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadGuests() {
    try {
      setLoading(true);

      const data = await getMyGuests();

      setGuests(data);
    } catch (error) {
      console.error("Erro ao carregar convidados:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGuests();
  }, []);

  return {
    guests,
    loading,
    reloadGuests: loadGuests,
  };
}