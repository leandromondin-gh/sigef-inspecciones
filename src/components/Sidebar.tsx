'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Panel Principal' },
  { href: '/expedientes', label: 'Expedientes' },
  { href: '/expedientes/nuevo', label: 'Nueva Inspección' },
  { href: '/rendicion', label: 'Rendición de Cuentas' },
  { href: '/consulta', label: 'Consulta / Alarmas' },
  { href: '/autorizados', label: 'Autorizados' },
  { href: '/configuracion', label: 'Configuración' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navContent = (
    <>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href) && item.href !== '/expedientes/nuevo');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-all ${
                isActive
                  ? 'bg-[#0072BC] text-white font-semibold'
                  : 'text-[#a8c6df] hover:bg-[#243659] hover:text-white'
              }`}
            >
              <span className={`w-1 h-4 rounded-sm flex-shrink-0 ${isActive ? 'bg-white' : 'bg-transparent'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-[#243659]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#243659] rounded-sm flex items-center justify-center text-xs font-bold text-[#a8c6df]">
            CR
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">Carlos Rodríguez</div>
            <div className="text-[11px] text-[#8ab0d0] truncate">Inspector</div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#1b2a4a] text-white flex items-center justify-between px-4 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0072BC] rounded flex items-center justify-center font-bold text-sm">S</div>
          <div>
            <div className="font-bold text-sm">SIGEF</div>
            <div className="text-[10px] text-[#8ab0d0]">Sistema de Inspecciones</div>
          </div>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2 rounded hover:bg-[#243659] transition-colors">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={`md:hidden fixed top-0 left-0 z-50 h-full w-64 bg-[#1b2a4a] text-white flex flex-col border border-gray-300 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-5 py-6 border-b border-[#243659] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0072BC] rounded flex items-center justify-center font-bold text-lg">S</div>
            <div>
              <div className="font-bold text-sm">SIGEF</div>
              <div className="text-[11px] text-[#8ab0d0]">Sistema de Inspecciones</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-[#8ab0d0] hover:text-white">✕</button>
        </div>
        {navContent}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-[#1b2a4a] text-white flex-col min-h-screen border border-gray-200 flex-shrink-0">
        <div className="px-5 py-6 border-b border-[#243659]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0072BC] rounded flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              S
            </div>
            <div>
              <div className="font-bold text-sm leading-tight">SIGEF</div>
              <div className="text-[11px] text-[#8ab0d0] leading-tight">Sistema de Inspecciones</div>
            </div>
          </div>
        </div>
        {navContent}
      </aside>
    </>
  );
}
