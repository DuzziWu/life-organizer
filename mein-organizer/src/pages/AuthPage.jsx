import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); 

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    let result;

    if (mode === "login") {
      result = await supabase.auth.signInWithPassword({ email, password });
      if (result.error) {
        setError(result.error.message);
      } else {
        navigate("/dashboard"); // Korrekte Weiterleitung nach erfolgreichem Login
      }
    } else {
      // Registrierung + Profile anlegen
      result = await supabase.auth.signUp({ email, password });
      if (result.error) {
        setError(result.error.message);
      } else if (result.data.user) {
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: result.data.user.id,
            email: email,
            username: displayName || email.split("@")[0],
            setup_complete: false,
          });
        if (insertError) {
          setError("Profil konnte nicht erstellt werden: " + insertError.message);
        } else {
          setSuccess("Registrierung erfolgreich! Bitte bestätige deine E-Mail-Adresse, bevor du dich einloggst.");
          setEmail("");
          setPassword("");
          setDisplayName("");
          // Nach Registrierung KEINE automatische Weiterleitung
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center font-sans">
      <div className="w-full max-w-sm p-8 bg-neutral-800 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-semibold text-neutral-100 mb-6 text-center select-none tracking-tight">Life Organizer</h1>
        {success && (<div className="mb-4 text-green-400 text-sm">{success}</div>)}
        <form onSubmit={handleAuth} className="space-y-5">
          {mode === "register" && (
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-neutral-900 text-neutral-100 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 placeholder:text-neutral-400 transition"
              placeholder="Dein Name"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            className="w-full p-3 rounded-xl bg-neutral-900 text-neutral-100 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 placeholder:text-neutral-400 transition"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            className="w-full p-3 rounded-xl bg-neutral-900 text-neutral-100 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 placeholder:text-neutral-400 transition"
            placeholder="Passwort"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-semibold transition disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Bitte warten..." : mode === "login" ? "Login" : "Registrieren"}
          </button>
        </form>
        <div className="flex justify-between mt-6 text-neutral-400 text-sm">
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="hover:underline"
            type="button"
          >
            {mode === "login"
              ? "Noch keinen Account? Registrieren"
              : "Schon registriert? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
