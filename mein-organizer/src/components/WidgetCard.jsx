// src/components/WidgetCard.jsx
export default function WidgetCard({ title, description, onRemove }) {
  return (
    <div className="bg-neutral-800 rounded-2xl p-5 shadow-lg flex flex-col min-h-[160px] relative">
      <button
        className="absolute top-3 right-4 text-neutral-500 hover:text-red-400 transition"
        onClick={onRemove}
        aria-label="Widget entfernen"
      >
        ×
      </button>
      <h2 className="text-lg font-semibold text-neutral-100 mb-2">{title}</h2>
      <p className="text-neutral-300">{description}</p>
    </div>
  );
}
