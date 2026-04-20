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
    <div className="sticky top-0 z-10 md:top-0 top-14">
      <div className="h-1 bg-[#0072BC]" />
      <div className="bg-white border-b border-gray-300 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">SIGEF</div>
          <h1 className="text-lg font-bold text-[#1b2a4a]">{title}</h1>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5 max-w-xl">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-4">
          {actions}
          <div className="text-right hidden sm:block border-l border-gray-200 pl-4">
            <div className="text-xs text-gray-400 capitalize">{today}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
