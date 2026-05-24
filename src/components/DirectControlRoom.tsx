"use client";

import { useEffect, useState } from "react";
import type { ControlRoomState } from "@/lib/types";
import { ControlRoomApp } from "./ControlRoomApp";

const STORAGE_KEY = "mvog-lab-state";

type Props = {
  initialState: ControlRoomState;
};

export function DirectControlRoom({ initialState }: Props) {
  const [loaded, setLoaded] = useState<ControlRoomState | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setLoaded(JSON.parse(saved) as ControlRoomState);
        return;
      }
    } catch {
      // ignore parse errors
    }
    setLoaded(initialState);
  }, [initialState]);

  function handleStateChange(state: ControlRoomState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors (private mode, quota, etc.)
    }
  }

  if (!loaded) return null;

  return (
    <ControlRoomApp
      accessToken=""
      initialState={loaded}
      onSignOut={() => {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
      }}
      userEmail="MVOG"
      onStateChange={handleStateChange}
    />
  );
}
