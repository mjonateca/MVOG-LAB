"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { ControlRoomState } from "@/lib/types";
import { ControlRoomApp } from "./ControlRoomApp";

const allowedEmails = new Set(["mjcalvo92@gmail.com", "vinelis13@gmail.com"]);

export function AuthenticatedControlRoom() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [state, setState] = useState<ControlRoomState | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Inicia sesión para entrar al laboratorio.");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setMessage("Supabase no está configurado.");
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const currentSession = data.session;
      setSession(currentSession);
      if (currentSession) {
        loadState(currentSession.access_token);
      } else {
        setLoading(false);
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setState(null);
      if (nextSession) {
        loadState(nextSession.access_token);
      }
    });

    return () => data.subscription.unsubscribe();
  }, [supabase]);

  async function loadState(token: string) {
    setLoading(true);
    const response = await fetch("/api/bootstrap", {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      setState(await response.json());
      setMessage("");
    } else {
      setMessage(response.status === 403 ? "Este usuario no tiene acceso a MVOG Lab." : "No se pudo cargar el laboratorio.");
      await supabase?.auth.signOut();
    }
    setLoading(false);
  }

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    const cleanEmail = email.trim().toLowerCase();
    if (!allowedEmails.has(cleanEmail)) {
      setMessage("Este email no está autorizado para entrar.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password
    });

    if (error) {
      setMessage("No se pudo iniciar sesión. Revisa email y contraseña.");
      setLoading(false);
      return;
    }
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setState(null);
    setSession(null);
    setMessage("Sesión cerrada.");
  }

  if (loading && !state) {
    return <AuthShell message="Cargando acceso..." />;
  }

  if (!session || !state) {
    return (
      <AuthShell message={message}>
        <form className="authForm" onSubmit={signIn}>
          <label>
            Email
            <input autoComplete="email" inputMode="email" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
          </label>
          <label>
            Contraseña
            <input autoComplete="current-password" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
          </label>
          <button className="btn" disabled={loading} type="submit">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </AuthShell>
    );
  }

  return <ControlRoomApp accessToken={session.access_token} initialState={state} onSignOut={signOut} userEmail={session.user.email || ""} />;
}

function AuthShell({ children, message }: { children?: ReactNode; message: string }) {
  return (
    <main className="authShell">
      <section className="authPanel">
        <div className="brand authBrand">
          <div className="brandMark">MV</div>
          <div>
            <h1>MVOG Lab</h1>
            <p>Acceso privado</p>
          </div>
        </div>
        <h2>Entra al control room</h2>
        <p>{message}</p>
        {children}
      </section>
    </main>
  );
}
