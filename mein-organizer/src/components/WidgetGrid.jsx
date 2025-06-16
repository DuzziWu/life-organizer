// src/components/WidgetGrid.jsx
import WidgetCard from "./WidgetCard";

export default function WidgetGrid({ widgets, onRemove }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {widgets.map((w, i) => (
        <WidgetCard
          key={w.id}
          title={w.title}
          description={w.description}
          onRemove={() => onRemove(w.id)}
        />
      ))}
    </div>
  );
}
