export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-[#F7F7F5] text-[#171717] border border-[#E6E6E1]',
    success: 'bg-[#E8EEE9] text-[#315C4B]',
    warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
    error: 'bg-red-50 text-red-800 border border-red-200',
    info: 'bg-blue-50 text-blue-800 border border-blue-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
