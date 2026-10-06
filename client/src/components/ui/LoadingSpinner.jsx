export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-8 w-full h-full min-h-[200px]">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#E6E6E1] border-t-[#315C4B]"></div>
    </div>
  );
}
