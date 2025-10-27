import { useEffect } from "react";

function Dashboard() {
  useEffect(() => {

    const token = new URLSearchParams(window.location.search).get("access_token");
    if (token) {
      localStorage.setItem("gmail_token", token);
      console.log("Access Token:", token);
    }
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>
      <p>You're now logged in! Your access token is saved in localStorage.</p>
    </div>
  );
}

export default Dashboard;
