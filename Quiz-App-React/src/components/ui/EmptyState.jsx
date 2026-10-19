import { ArrowLeft } from "lucide-react";

export default function EmptyState({ icon, title, text, action, actionText }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action && (
        <button className="secondary-button" onClick={action}>
          {actionText}
          <ArrowLeft size={15} />
        </button>
      )}
    </div>
  );
}
