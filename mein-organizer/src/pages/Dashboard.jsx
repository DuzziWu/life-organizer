import { useState } from "react";
import Sidebar from "../components/Sidebar";
import WidgetGrid from "../components/WidgetGrid";

const WIDGET_TYPES = [
  {
    id: "wetter",
    title: "Wetter",
    description: "Zeigt das aktuelle Wetter an.",
  },
  {
    id: "mail",
    title: "Mail",
    description: "Deine neuesten E-Mails.",
  },
  {
    id: "finanzen",
    title: "Finanzen",
    description: "Überblick über deine Finanzen.",
  },
  {
    id: "kalender",
    title: "Kalender",
    description: "Deine nächsten Termine.",
  },
  {
    id: "verein",
    title: "Verein",
    description: "Neuigkeiten aus deinem Verein.",
  },
];

export default function Dashboard() {
  const [widgets, setWidgets] = useState([
    // Beispiel-Widget zu Beginn, kann leer sein
    { id: 1, title: "Wetter", description: "Zeigt das aktuelle Wetter an." },
  ]);
  const [addOpen, setAddOpen] = useState(false);

  const addWidget = (widgetType) => {
    setWidgets((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        title: widgetType.title,
        description: widgetType.description,
      },
    ]);
    setAddOpen(false);
  };

  const removeWidget = (id) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-neutral-900 font-sans">
      <Sidebar />
      <main className="flex-1 min-h-screen transition-all flex flex-col items-center py-10 ml-16">
        <div className="w-full max-w-4xl flex flex-col gap-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-neutral-100">Dein Dashboard</h1>
            <button
              className="px-4 py-2 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-semibold transition"
              onClick={() => setAddOpen(true)}
            >
              + Widget hinzufügen
            </button>
          </div>
          <WidgetGrid widgets={widgets} onRemove={removeWidget} />
        </div>

        {/* Add-Widget Modal */}
        {addOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-neutral-800 rounded-2xl p-8 w-full max-w-md flex flex-col gap-5">
              <h2 className="text-xl font-semibold text-neutral-100 mb-2">Widget auswählen</h2>
              {WIDGET_TYPES.map((w) => (
                <button
                  key={w.id}
                  className="flex flex-col items-start p-4 rounded-xl hover:bg-neutral-700 transition"
                  onClick={() => addWidget(w)}
                >
                  <span className="text-base text-neutral-100 font-medium">{w.title}</span>
                  <span className="text-sm text-neutral-400">{w.description}</span>
                </button>
              ))}
              <button
                className="mt-4 px-4 py-2 rounded-xl bg-neutral-700 hover:bg-neutral-600 text-neutral-100 transition"
                onClick={() => setAddOpen(false)}
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
