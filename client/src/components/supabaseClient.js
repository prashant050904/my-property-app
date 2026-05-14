import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 🔹 Replace with your Supabase credentials
const supabase = createClient(
  "zumlbzmvlmtizywuvvur" // url 
                         // key
);

export default function App() {
  const [user, setUser] = useState(null);

  // 🔹 Check session
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🔹 Google Login
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  // 🔹 Logout
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h2>Google Auth</h2>

      {user ? (
        <>
          <p>Welcome: {user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={loginWithGoogle}>
          Sign in with Google
        </button>
      )}
    </div>
  );
}