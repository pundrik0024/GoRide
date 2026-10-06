export default function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-[#E6E6E1] rounded-xl">
      {icon && (
        <span className="material-symbols-outlined text-6xl text-[#6B6B67] mb-4">
          {icon}
        </span>
      )}
      <h3 className="text-xl font-bold text-[#171717] mb-2">{title}</h3>
      <p className="text-[#6B6B67] mb-6 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2 bg-[#315C4B] text-white rounded-lg hover:bg-[#234F3E] transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
