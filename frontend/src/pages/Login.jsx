import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the field-level error as soon as the user edits it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError("");
  }

  function validate() {
    const next = {};

    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }

    if (!form.password) {
      next.password = "Password is required.";
    } else if (form.password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", {
        email: form.email.trim(),
        password: form.password,
      });

      localStorage.setItem("auralis_token", data.token);
      localStorage.setItem("auralis_user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      {/* Left brand panel — hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-400 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center font-display font-bold">
              A
            </div>
            <span className="font-display font-semibold text-lg tracking-wide">
              Auralis
            </span>
          </div>

          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight mb-4">
              Focus on your work.
              <br />
              We'll handle the sign-in.
            </h1>
            <p className="text-brand-100 max-w-sm">
              Auralis brings your projects, teams, and tools into a single
              calm workspace — built for people who'd rather build than
              fiddle with logins.
            </p>
          </div>

          <p className="text-brand-100 text-sm">
            © {new Date().getFullYear()} Auralis Labs. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white font-display font-bold">
              A
            </div>
            <span className="font-display font-semibold text-lg text-slate-800">
              Auralis
            </span>
          </div>

          <h2 className="font-display text-2xl font-semibold text-slate-900 mb-1">
            Welcome back
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            Sign in to continue to your dashboard.
          </p>

          {serverError && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-brand-400/50 ${
                  errors.email
                    ? "border-red-400 focus:border-red-400"
                    : "border-slate-300 focus:border-brand-500"
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-brand-600 hover:text-brand-700"
                  onClick={() => alert("This is a demo — no email is sent.")}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full rounded-lg border px-3.5 py-2.5 pr-16 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-brand-400/50 ${
                    errors.password
                      ? "border-red-400 focus:border-red-400"
                      : "border-slate-300 focus:border-brand-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-6 rounded-lg bg-slate-100 px-4 py-3 text-xs text-slate-500">
            Demo credentials: <strong>demo@auralis.io</strong> /{" "}
            <strong>Passw0rd!</strong>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <button
              type="button"
              className="font-medium text-brand-600 hover:text-brand-700"
              onClick={() => alert("This is a demo — sign-up isn't wired up.")}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
