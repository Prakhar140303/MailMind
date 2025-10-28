function LoginPage() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

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

          <button
            onClick={handleLogin}
            className="mt-8 w-full inline-flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-900 text-base font-medium shadow-sm hover:bg-slate-50 transition"
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
