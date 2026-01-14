import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Rejestracja</h1>

      <form className="mt-6 space-y-3">
        <input
          className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-2 outline-none"
          placeholder="Email"
        />
        <input
          className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-2 outline-none"
          placeholder="Hasło"
          type="password"
        />
        <button
          type="button"
          className="w-full rounded-xl bg-indigo-500 px-4 py-2 font-semibold hover:bg-indigo-400"
        >
          Załóż konto
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-300">
        Masz konto?{" "}
        <Link to="/auth/login" className="underline">
          Zaloguj się
        </Link>
      </p>
    </div>
  );
}
