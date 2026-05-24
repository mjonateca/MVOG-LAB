"use client";

import { useCallback, useRef } from "react";
import type { ControlRoomState } from "@/lib/types";
import { ControlRoomApp } from "./ControlRoomApp";

type Props = {
  initialState: ControlRoomState;
};

export function DirectControlRoom({ initialState }: Props) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleStateChange = useCallback((state: ControlRoomState) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetch("/api/state", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      }).catch(() => {
        // silent fail — UI already updated optimistically
      });
    }, 2000); // 2s debounce: aguarda que el usuario termine de editar
  }, []);

  return (
    <ControlRoomApp
      accessToken=""
      initialState={initialState}
      onSignOut={() => window.location.reload()}
      userEmail="MVOG"
      onStateChange={handleStateChange}
    />
  );
}
