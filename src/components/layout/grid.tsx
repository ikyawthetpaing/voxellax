interface GridProps {
  children: React.ReactNode;
}
export function Grid({ children }: GridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {children}
    </div>
  );
}