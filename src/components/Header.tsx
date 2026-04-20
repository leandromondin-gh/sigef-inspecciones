'use client';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function Header({ title, subtitle, actions }: HeaderProps) {
  const today = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 border border-gray-200">
      <div>
        <h1 className="text-xl font-bold text-[#1a3a5c]">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        {actions}
        <div className="text-right hidden sm:block">
          <div className="text-xs text-gray-400 capitalize">{today}</div>
        </div>
        <button className="relative p-2 text-gray-400 hover:text-[#1a3a5c] transition-colors">
          <span className="text-xl">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-sm"></span>
        </button>
      </div>
    </div>
  );
}
