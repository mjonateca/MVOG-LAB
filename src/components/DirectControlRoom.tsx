"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ControlRoomState } from "@/lib/types";
import { ControlRoomApp } from "./ControlRoomApp";

type Props = {
  initialState: ControlRoomState;
};

type SyncStatus = "ready" | "saving" | "saved" | "error";

const POLL_INTERVAL_MS = 12_000;
const SAVE_DEBOUNCE_MS = 1_200;

export function DirectControlRoom({ initialState }: Props) {
  const [state, setState] = useState(initialState);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("ready");
  const [syncMessage, setSyncMessage] = useState("Sincronizado con GitHub JSON");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateHashRef = useRef(stableHash(initialState));
  const skipNextSaveRef = useRef(true);

  const loadRemoteState = useCallback(async () => {
    const response = await fetch("/api/state", { cache: "no-store" });
    if (!response.ok) {
      const body = await response.json().catch(() => ({})) as { error?: string };
      throw new Error(body.error || `No se pudo leer GitHub JSON (${response.status})`);
    }
    return response.json() as Promise<ControlRoomState>;
  }, []);

  const refreshFromGitHub = useCallback(async () => {
    try {
      const remoteState = await loadRemoteState();
      const remoteHash = stableHash(remoteState);
      if (remoteHash !== stateHashRef.current) {
        skipNextSaveRef.current = true;
        stateHashRef.current = remoteHash;
        setState(remoteState);
        setSyncStatus("saved");
        setSyncMessage("Cambios recibidos desde GitHub");
      }
    } catch (error) {
      setSyncStatus("error");
      setSyncMessage(cleanError(error));
    }
  }, [loadRemoteState]);

  useEffect(() => {
    const interval = window.setInterval(refreshFromGitHub, POLL_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [refreshFromGitHub]);

  const handleStateChange = useCallback((nextState: ControlRoomState) => {
    const nextHash = stableHash(nextState);

    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      stateHashRef.current = nextHash;
      setState(nextState);
      return;
    }

    stateHashRef.current = nextHash;
    setState(nextState);
    setSyncStatus("saving");
    setSyncMessage("Guardando en GitHub JSON...");

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch("/api/state", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nextState)
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({})) as { error?: string };
          throw new Error(body.error || `No se pudo escribir GitHub JSON (${response.status})`);
        }

        setSyncStatus("saved");
        setSyncMessage("Guardado en GitHub JSON");
      } catch (error) {
        setSyncStatus("error");
        setSyncMessage(cleanError(error));
      }
    }, SAVE_DEBOUNCE_MS);
  }, []);

  return (
    <>
      <div className={`syncBanner ${syncStatus}`} role="status" aria-live="polite">
        <span />
        {syncMessage}
      </div>
      <ControlRoomApp
        accessToken=""
        initialState={state}
        onSignOut={() => window.location.reload()}
        userEmail="MVOG"
        onStateChange={handleStateChange}
      />
    </>
  );
}

function stableHash(value: unknown) {
  return JSON.stringify(value);
}

function cleanError(error: unknown) {
  return error instanceof Error ? error.message.replace(/^Error:\s*/, "") : "Error sincronizando con GitHub";
}
