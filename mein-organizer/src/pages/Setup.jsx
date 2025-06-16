import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const timezones = [
  "Europe/Berlin",
  "Europe/London",
  "America/New_York",
  "Asia/Tokyo",
  // ... beliebig viele weitere
];

export default function Setup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [timezone, setTimezone] = useState(timezones[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Profil-Daten laden
  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        setProfile(data);
        setName(data?.username || "");
        setCity(data?.city || "");
        setTimezone(data?.timezone || timezones[0]);
      });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase
      .from("profiles")
      .update({
        username: name,
        city,
        timezone,
        setup_complete: true,
      })
      .eq("id", user.id);
    setLoading(false);
    if (error) {
      setError("Fehler beim Speichern: " + error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-neutral-100 text-center mb-4">
          Willkommen beim Setup!
        </h2>
        <label className="text-neutral-200 font-medium">
          Dein Name
          <input
            className="w-full p-3 rounded-xl bg-neutral-900 text-neutral-100 border border-neutral-700 focus:outline-none mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="text-neutral-200 font-medium">
          Wohnort
          <input
            className="w-full p-3 rounded-xl bg-neutral-900 text-neutral-100 border border-neutral-700 focus:outline-none mt-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label className="text-neutral-200 font-medium">
          Zeitzone
          <select
            className="w-full p-3 rounded-xl bg-neutral-900 text-neutral-100 border border-neutral-700 focus:outline-none mt-2"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            required
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </label>
        {error && <div className="text-red-400">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-semibold transition disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Speichern..." : "Setup abschließen"}
        </button>
      </form>
    </div>
  );
}
