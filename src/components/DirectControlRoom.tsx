"use client";

import type { ControlRoomState } from "@/lib/types";
import { ControlRoomApp } from "./ControlRoomApp";

type Props = {
  initialState: ControlRoomState;
};

export function DirectControlRoom({ initialState }: Props) {
  return (
    <>
      <style jsx global>{`
        .sessionBox {
          display: none;
        }
      `}</style>
      <ControlRoomApp
        accessToken=""
        initialState={initialState}
        onSignOut={() => window.location.reload()}
        userEmail="Acceso directo"
      />
    </>
  );
}
