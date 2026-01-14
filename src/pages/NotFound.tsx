import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-2 text-slate-600">Nie znaleziono strony.</p>
      <Link className="mt-4 inline-block underline" to="/app">
        Wróć do aplikacji
      </Link>
    </div>
  );
}
