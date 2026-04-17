'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Panel Principal', icon: '⊞' },
  { href: '/expedientes', label: 'Expedientes', icon: '📁' },
  { href: '/expedientes/nuevo', label: 'Nueva Inspección', icon: '＋' },
  { href: '/rendicion', label: 'Rendición de Cuentas', icon: '📊' },
  { href: '/consulta', label: 'Consulta / Alarmas', icon: '🔔' },
  { href: '/autorizados', label: 'Autorizados', icon: '👥' },
  { href: '/configuracion', label: 'Configuración', icon: '⚙' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1a3a5c] text-white flex flex-col min-h-screen shadow-xl">
      {/* Logo / Header */}
      <div className="px-5 py-6 border-b border-[#2a4a6c]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#f0a500] rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            S
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">SIGEF</div>
            <div className="text-[11px] text-[#8ab0d0] leading-tight">Sistema de Inspecciones</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href) && item.href !== '/expedientes/nuevo');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-[#f0a500] text-white font-semibold'
                  : 'text-[#a8c6df] hover:bg-[#2a4a6c] hover:text-white'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      <div className="px-4 py-4 border-t border-[#2a4a6c]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#2a4a6c] rounded-full flex items-center justify-center text-xs font-bold text-[#a8c6df]">
            CR
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">Carlos Rodríguez</div>
            <div className="text-[11px] text-[#8ab0d0] truncate">Inspector</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
