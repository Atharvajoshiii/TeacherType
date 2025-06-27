export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="w-full py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-white">Question Paper Generator</h1>
        </div>
      </header>
      {children}
    </div>
  );
}
