'use client';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumb?: { label: string; href?: string }[];
}

export default function Header({ title, subtitle, actions, breadcrumb }: HeaderProps) {
  const today = new Date().toLocaleDateString('es-AR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="sticky top-0 md:top-0 top-14 z-10">
      <div className="h-[3px] bg-gradient-to-r from-[#0072BC] to-[#0099e6]" />
      <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          {breadcrumb && breadcrumb.length > 0 && (
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-semibold text-[#0072BC] uppercase tracking-widest">SIGEF</span>
              {breadcrumb.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="text-gray-300 text-[10px]">/</span>
                  <span className="text-[10px] text-gray-400">{crumb.label}</span>
                </span>
              ))}
            </div>
          )}
          {!breadcrumb && (
            <div className="text-[10px] font-semibold text-[#0072BC] uppercase tracking-widest mb-1">SIGEF</div>
          )}
          <h1 className="text-base font-bold text-gray-900 leading-tight truncate">{title}</h1>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xl">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {actions}
          <div className="hidden lg:block text-right border-l border-gray-100 pl-3">
            <div className="text-[11px] text-gray-400 capitalize">{today}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
