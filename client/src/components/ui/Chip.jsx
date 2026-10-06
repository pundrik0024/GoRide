export default function Chip({ children, active, onClick, className = '' }) {
  const baseClasses = 'inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer border';
  const activeClasses = active 
    ? 'bg-[#315C4B] text-white border-[#315C4B]' 
    : 'bg-[#F7F7F5] text-[#6B6B67] border-[#E6E6E1] hover:border-[#171717] hover:text-[#171717]';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${activeClasses} ${className}`}
    >
      {children}
    </button>
  );
}
