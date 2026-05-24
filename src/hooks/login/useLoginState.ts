//useLoginState.ts

import { useState } from "react";

export function useLoginState() {
   const [email, setEmail] = useState(() => {
    return localStorage.getItem("lastEmail") || "";
  });

  return {
    email,
    setEmail
  };
}