'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navSections = [
  {
    label: 'Principal',
    items: [
      { href: '/', label: 'Panel de Control' },
    ],
  },
  {
    label: 'Gestión',
    items: [
      { href: '/expedientes', label: 'Expedientes' },
      { href: '/expedientes/nuevo', label: 'Nueva Inspección' },
    ],
  },
  {
    label: 'Reportes',
    items: [
      { href: '/rendicion', label: 'Rendición de Cuentas' },
      { href: '/consulta', label: 'Consulta y Alarmas' },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { href: '/autorizados', label: 'Autorizados' },
      { href: '/configuracion', label: 'Configuración' },
    ],
  },
];

function NavItems({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <nav className="flex-1 px-3 py-4 overflow-y-auto">
      {navSections.map((section) => (
        <div key={section.label} className="mb-4">
          <div className="px-3 mb-1 text-[10px] font-bold text-[#4a6080] uppercase tracking-widest">
            {section.label}
          </div>
          {section.items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href) && item.href !== '/expedientes/nuevo');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-2 px-3 py-2 text-sm transition-all mb-0.5 border-l-2 ${
                  isActive
                    ? 'border-[#0072BC] bg-[#0072BC]/10 text-white font-semibold'
                    : 'border-transparent text-[#8ab0d0] hover:bg-[#243659] hover:text-white hover:border-[#4a6080]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const logoBlock = (
    <div className="px-5 py-5 border-b border-[#243659]">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#0072BC] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
          S
        </div>
        <div>
          <div className="font-bold text-sm leading-tight text-white">SIGEF</div>
          <div className="text-[10px] text-[#8ab0d0] leading-tight uppercase tracking-wide">Inspecciones Gremiales</div>
        </div>
      </div>
    </div>
  );

  const userBlock = (
    <div className="px-4 py-4 border-t border-[#243659]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#0072BC] flex items-center justify-center text-xs font-bold text-white">
          CR
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-white truncate">Carlos Rodríguez</div>
          <div className="text-[10px] text-[#8ab0d0] uppercase tracking-wide">Inspector</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#1b2a4a] text-white flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#0072BC] flex items-center justify-center font-bold text-sm">S</div>
          <div>
            <div className="font-bold text-sm">SIGEF</div>
            <div className="text-[9px] text-[#8ab0d0] uppercase tracking-wide">Inspecciones Gremiales</div>
          </div>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2 hover:bg-[#243659] transition-colors text-lg">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className={`md:hidden fixed top-0 left-0 z-50 h-full w-64 bg-[#1b2a4a] text-white flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#243659]">
          {logoBlock}
          <button onClick={() => setOpen(false)} className="text-[#8ab0d0] hover:text-white ml-2">✕</button>
        </div>
        <NavItems pathname={pathname} onClose={() => setOpen(false)} />
        {userBlock}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 bg-[#1b2a4a] text-white flex-col min-h-screen flex-shrink-0">
        {/* Top accent line */}
        <div className="h-1 bg-[#0072BC]" />
        {logoBlock}
        <NavItems pathname={pathname} />
        {userBlock}
      </aside>
    </>
  );
}
