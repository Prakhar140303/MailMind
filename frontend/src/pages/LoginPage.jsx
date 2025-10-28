import { useEffect, useState } from "react";

function LoginPage() {
  const [geminiKey, setGeminiKey] = useState("");
  const canLogin = Boolean(geminiKey.trim());
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };
  useEffect(() => {
      const saved = sessionStorage.getItem("gemini_api_key");
      if (saved) setGeminiKey(saved);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-slate-200 shadow-lg rounded-2xl p-8 md:p-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-xl bg-slate-900 text-white grid place-items-center shadow mb-4">
              <span className="text-2xl font-bold">M</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              MailMind
            </h1>
            <p className="mt-2 text-slate-600 text-sm md:text-base">
              AI‑powered Gmail sorting assistant
            </p>
          </div>

          <div className="mt-6">
            <label htmlFor="geminiKey" className="block text-sm font-medium text-slate-700">
              Gemini API key
            </label>
            <input
              id="geminiKey"
              type="password"
              value={geminiKey}
              onChange={(e) => {
                setGeminiKey(e.target.value);
                try {
                  const api_value = e.target.value;
                  if (api_value && api_value.trim()) {
                    sessionStorage.setItem("gemini_api_key", api_value.trim());
                  } else {
                    sessionStorage.removeItem("gemini_api_key");
                  }
                } catch {
                  console.error("Failed to save Gemini API key to sessionStorage");
                }
              }}
              placeholder="Enter your Gemini API key"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <p className="mt-2 text-xs text-slate-500">Stored only in this browser session.</p>
          </div>

          <button
            onClick={handleLogin}
            disabled={!canLogin}
            aria-disabled={!canLogin}
            className={`mt-8 w-full inline-flex items-center justify-center gap-3 rounded-xl border border-slate-300 px-5 py-3 text-base font-medium transition ${
              canLogin
                ? "bg-white text-slate-900 shadow-sm hover:bg-slate-50"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <img src="/google_login.png" alt="Google" className="h-5 w-5" />
            <span>Sign in with Google</span>
          </button>

          <div className="mt-6 text-xs text-slate-500 text-center">
            We’ll redirect you to Google to sign in
          </div>
        </div>

        <div className="mt-6 text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} MailMind
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
