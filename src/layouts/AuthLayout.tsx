import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow">
        <Link to="/" className="block text-center font-bold text-xl">
          VolleyFox
        </Link>

        <div className="mt-6">
          <Outlet />
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} VolleyFox
        </p>
      </div>
    </div>
  );
}
