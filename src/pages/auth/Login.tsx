import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";
import { PATHS } from "../../router/paths";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // jeśli user wszedł na /app/coś i został przerzucony na login, wrócimy tam po zalogowaniu
  const from = (location.state as any)?.from?.pathname || PATHS.app;

  function handleLogin() {
    login();
    navigate(from, { replace: true });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Logowanie</h1>

      <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
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
          onClick={handleLogin}
          className="w-full rounded-xl bg-indigo-500 px-4 py-2 font-semibold hover:bg-indigo-400"
        >
          Zaloguj
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-300">
        Nie masz konta?{" "}
        <Link to={PATHS.register} className="underline">
          Zarejestruj się
        </Link>
      </p>
    </div>
  );
}
