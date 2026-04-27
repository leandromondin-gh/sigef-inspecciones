'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Icons = {
  panel: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  expedientes: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  nueva: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  rendicion: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  consulta: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  documentacion: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  autorizados: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  configuracion: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  chevronLeft: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  menu: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

const navSections = [
  {
    label: 'Principal',
    items: [{ href: '/', label: 'Panel de Control', icon: Icons.panel }],
  },
  {
    label: 'Gestión',
    items: [
      { href: '/expedientes', label: 'Expedientes', icon: Icons.expedientes },
      { href: '/expedientes/nuevo', label: 'Nueva Inspección', icon: Icons.nueva },
    ],
  },
  {
    label: 'Reportes',
    items: [
      { href: '/rendicion', label: 'Rendición de Cuentas', icon: Icons.rendicion },
      { href: '/consulta', label: 'Consulta y Alarmas', icon: Icons.consulta },
    ],
  },
  {
    label: 'Recursos',
    items: [
      { href: '/documentacion', label: 'Documentación', icon: Icons.documentacion },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { href: '/autorizados', label: 'Autorizados', icon: Icons.autorizados },
      { href: '/configuracion', label: 'Configuración', icon: Icons.configuracion },
    ],
  },
];

function NavContent({ collapsed, pathname, onClose }: { collapsed: boolean; pathname: string; onClose?: () => void }) {
  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    if (href === '/expedientes/nuevo') return pathname === '/expedientes/nuevo';
    return pathname.startsWith(href);
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navSections.map((section, si) => (
          <div key={section.label}>
            {/* Separador entre secciones */}
            {si > 0 && !collapsed && (
              <div className="mx-3 my-2 border-t border-white/5" />
            )}
            {si > 0 && collapsed && (
              <div className="mx-2 my-2 border-t border-white/5" />
            )}

            {/* Label de sección */}
            {!collapsed && (
              <div className="px-3 pb-1 pt-0.5 text-[10px] font-semibold tracking-widest uppercase text-[#3d5a7a]">
                {section.label}
              </div>
            )}

            {section.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  title={collapsed ? item.label : undefined}
                  className={`relative flex items-center gap-3 rounded-lg transition-all duration-150 group
                    ${collapsed ? 'justify-center px-0 py-2.5 mx-1' : 'px-3 py-2.5'}
                    ${active
                      ? 'bg-white/10 text-white'
                      : 'text-[#7a9bbf] hover:bg-white/5 hover:text-white'
                    }`}
                >
                  {/* Indicador activo */}
                  {active && !collapsed && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#0072BC] rounded-r-full" />
                  )}

                  {/* Ícono */}
                  <span className={`flex-shrink-0 transition-colors ${active ? 'text-[#4db3ff]' : 'text-[#4a7090] group-hover:text-[#7ab8e0]'}`}>
                    {item.icon}
                  </span>

                  {/* Label */}
                  {!collapsed && (
                    <span className={`text-[13px] font-medium leading-none ${active ? 'text-white' : ''}`}>
                      {item.label}
                    </span>
                  )}

                  {/* Tooltip cuando está colapsado */}
                  {collapsed && (
                    <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-xl border border-white/10 transition-opacity duration-150">
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Usuario */}
      <div className={`border-t border-white/5 p-3 ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0072BC] to-[#0099e6] flex items-center justify-center text-[11px] font-bold text-white shadow">
            IP
          </div>
        ) : (
          <div className="flex items-center gap-3 px-1 py-0.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0072BC] to-[#0099e6] flex items-center justify-center text-[11px] font-bold text-white shadow flex-shrink-0">
              IP
            </div>
            <div>
              <div className="text-[13px] font-semibold text-white leading-tight">Dr. Pecorelli</div>
              <div className="text-[10px] text-[#4a7090] mt-0.5">Inspector</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') setCollapsed(true);
  }, []);

  function toggleCollapsed() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('sidebar-collapsed', String(next));
  }

  return (
    <>
      {/* ── Mobile top bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0e1e30] border-b border-white/5 flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#0072BC] rounded flex items-center justify-center font-bold text-sm text-white">S</div>
          <span className="font-bold text-sm text-white tracking-tight">SIGEF</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-[#7a9bbf] hover:text-white hover:bg-white/8 transition-colors"
        >
          {mobileOpen ? Icons.close : Icons.menu}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={`md:hidden fixed top-0 left-0 z-50 h-full w-64 bg-[#0e1e30] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-4 h-14 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#0072BC] rounded flex items-center justify-center font-bold text-sm text-white">S</div>
            <span className="font-bold text-sm text-white">SIGEF</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded text-[#7a9bbf] hover:text-white">
            {Icons.close}
          </button>
        </div>
        <NavContent collapsed={false} pathname={pathname} onClose={() => setMobileOpen(false)} />
      </div>

      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden md:flex flex-col bg-[#0e1e30] flex-shrink-0 transition-[width] duration-300 ease-in-out overflow-hidden min-h-screen"
        style={{ width: collapsed ? '56px' : '248px' }}
      >
        {/* Logo + toggle */}
        <div className={`flex items-center h-14 flex-shrink-0 border-b border-white/5 ${collapsed ? 'justify-center px-2' : 'px-4 justify-between'}`}>
          {!collapsed && (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 bg-[#0072BC] rounded flex items-center justify-center font-bold text-sm text-white flex-shrink-0">S</div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-white leading-none tracking-tight">SIGEF</div>
                <div className="text-[9px] text-[#3d5a7a] uppercase tracking-widest leading-none mt-1">Inspecciones Gremiales</div>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-7 h-7 bg-[#0072BC] rounded flex items-center justify-center font-bold text-sm text-white">S</div>
          )}
          <button
            onClick={toggleCollapsed}
            className={`p-1.5 rounded-md text-[#3d5a7a] hover:text-white hover:bg-white/8 transition-all flex-shrink-0 ${collapsed ? 'mt-2 rotate-180' : ''}`}
            title={collapsed ? 'Expandir' : 'Colapsar'}
          >
            {Icons.chevronLeft}
          </button>
        </div>

        <NavContent collapsed={collapsed} pathname={pathname} />
      </aside>
    </>
  );
}
