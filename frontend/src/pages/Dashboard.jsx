import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("auralis_user") || "null");

  function handleLogout() {
    localStorage.removeItem("auralis_token");
    localStorage.removeItem("auralis_user");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-display font-bold text-sm">
            A
          </div>
          <span className="font-display font-semibold text-slate-800">
            Auralis
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Log out
        </button>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
          ✓
        </div>
        <h1 className="font-display text-2xl font-semibold text-slate-900">
          You're signed in{user?.name ? `, ${user.name}` : ""}!
        </h1>
        <p className="mt-2 text-slate-500">
          This is a placeholder dashboard, just here to prove the login flow
          works end to end.
        </p>

        {user && (
          <div className="mx-auto mt-8 max-w-sm rounded-xl border border-slate-200 bg-white p-5 text-left text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-800">Name:</span>{" "}
              {user.name}
            </p>
            <p className="mt-1">
              <span className="font-medium text-slate-800">Email:</span>{" "}
              {user.email}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
