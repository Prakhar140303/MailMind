function LoginPage() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>MailMind</h1>
      <p>AI-powered Gmail sorting assistant</p>
      <button 
        onClick={handleLogin}
        className="p-4 text-2xl bg-[#4285F4] text-white rounded-lg hover:bg-[#357ae8] cursor-pointer"
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4285F4",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default LoginPage;
