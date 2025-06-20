export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen max-w-2xl gap-4 mx-auto">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-gray-100"></div>
    </div>
  );
}
