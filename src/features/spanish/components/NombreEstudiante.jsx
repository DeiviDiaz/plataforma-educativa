
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'lengua_viva_nombre_estudiante';

export default function NombreEstudiante() {
  const [nombre, setNombre] = useState(
    () => localStorage.getItem(STORAGE_KEY) || ''
  );
  const [nombreTemporal, setNombreTemporal] = useState(nombre);
  const [abierto, setAbierto] = useState(!nombre);

  useEffect(() => {
    setNombreTemporal(nombre);
  }, [nombre]);

  const guardarNombre = (e) => {
    e.preventDefault();
    const limpio = nombreTemporal.trim().replace(/\s+/g, ' ');
    if (!limpio) return;

    localStorage.setItem(STORAGE_KEY, limpio);
    setNombre(limpio);
    setAbierto(false);
  };

  return (
    <>
      {nombre && (
        <button
          onClick={() => setAbierto(true)}
          className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700"
        >
          👋 Hola, {nombre} · Cambiar
        </button>
      )}

      {abierto && (
        <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-slate-950/70 p-4">
            <form
            onSubmit={guardarNombre}
            className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
            >
            <div className="mb-4 text-5xl">📚</div>

            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-600">
              Lengua Viva · Español
            </p>

            <h2 className="mb-2 text-2xl font-black text-slate-900">
              ¡Bienvenido!
            </h2>

            <p className="mb-6 text-sm text-slate-600">
              ¿Cómo te llamas? Escribe tu nombre para comenzar a aprender.
            </p>

            <input
              type="text"
              value={nombreTemporal}
              onChange={(e) => setNombreTemporal(e.target.value)}
              placeholder="Escribe tu nombre"
              maxLength={40}
              required
              autoFocus
              className="mb-5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <button
              type="submit"
              disabled={!nombreTemporal.trim()}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              Comenzar a aprender →
            </button>

            <p className="mt-4 text-xs text-slate-400">
              Tu nombre se conservará en este navegador.
            </p>
          </form>
        </div>
      )}
    </>
  );
}

