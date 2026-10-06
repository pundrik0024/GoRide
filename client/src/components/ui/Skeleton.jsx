export default function Skeleton({ width = 'w-full', height = 'h-4', rounded = 'rounded-md', className = '' }) {
  return (
    <div className={`animate-pulse bg-[#E6E6E1] ${width} ${height} ${rounded} ${className}`}></div>
  );
}
