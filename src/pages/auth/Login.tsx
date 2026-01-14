import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Logowanie</h1>

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
          Zaloguj
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-300">
        Nie masz konta?{" "}
        <Link to="/auth/register" className="underline">
          Zarejestruj się
        </Link>
      </p>
    </div>
  );
}
