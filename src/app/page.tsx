import Link from 'next/link';
import Header from '@/components/Header';
import { mockExpedientes } from '@/lib/mock-data';
import { ESTADO_LABELS, ESTADO_COLORS, EstadoExpediente } from '@/lib/types';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);
}

function KpiCard({ label, value, sub, borderColor }: { label: string; value: string | number; sub?: string; borderColor: string }) {
  return (
    <div className={`bg-white border border-gray-200 border-t-4 ${borderColor} p-5`}>
      <div className="text-2xl font-bold text-[#1b2a4a] leading-tight">{value}</div>
      <div className="text-sm font-semibold text-gray-700 mt-2">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{children}</h2>;
}

export default function Dashboard() {
  const totalExpedientes = mockExpedientes.length;
  const expedientesActivos = mockExpedientes.filter(e => e.estado !== 'FINALIZADO').length;
  const expedientesConAlarma = mockExpedientes.filter(e => e.tieneAlarma).length;
  const totalDeuda = mockExpedientes.reduce((acc, e) => acc + (e.montoDeuda ?? 0), 0);

  const porEstado = mockExpedientes.reduce((acc, e) => {
    acc[e.estado] = (acc[e.estado] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const alarmas = mockExpedientes
    .filter(e => e.tieneAlarma)
    .sort((a, b) => (a.fechaVencimientoAlarma ?? '').localeCompare(b.fechaVencimientoAlarma ?? ''));

  const recientes = [...mockExpedientes]
    .sort((a, b) => b.fechaUltimaActuacion.localeCompare(a.fechaUltimaActuacion))
    .slice(0, 4);

  return (
    <div className="flex-1">
      <Header
        title="Panel de Control"
        subtitle="Sistema de Expedientes Administrativos de Inspección Gremial y Obra Social"
        actions={
          <Link href="/expedientes/nuevo"
            className="bg-[#0072BC] hover:bg-[#005f9e] text-white text-sm font-semibold px-4 py-2 transition-colors flex items-center gap-2">
            + Nueva Inspección
          </Link>
        }
      />

      <div className="p-6 space-y-7 max-w-7xl">
        <div>
          <SectionTitle>Resumen General</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard label="Expedientes Activos" value={expedientesActivos} sub={`de ${totalExpedientes} en total`} borderColor="border-t-[#0072BC]" />
            <KpiCard label="Con Alarma Activa" value={expedientesConAlarma} sub="Plazos próximos a vencer" borderColor="border-t-red-500" />
            <KpiCard label="Deuda Determinada" value={formatCurrency(totalDeuda)} sub="Capital + intereses" borderColor="border-t-orange-500" />
            <KpiCard label="Finalizados" value={mockExpedientes.filter(e => e.estado === 'FINALIZADO').length} sub="Pagados o archivados" borderColor="border-t-green-500" />
          </div>
        </div>

        <div>
          <SectionTitle>Acceso Rápido</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: '/expedientes/nuevo', label: 'Nueva Inspección', desc: 'Iniciar un nuevo expediente', accent: 'border-l-[#0072BC] hover:bg-blue-50/50' },
              { href: '/rendicion', label: 'Rendición de Cuentas', desc: 'Panel contable y financiero', accent: 'border-l-green-600 hover:bg-green-50/50' },
              { href: '/consulta', label: 'Consulta y Alarmas', desc: 'Buscar expedientes y alertas', accent: 'border-l-orange-500 hover:bg-orange-50/50' },
              { href: '/autorizados', label: 'Autorizados', desc: 'Gestión de usuarios y roles', accent: 'border-l-purple-600 hover:bg-purple-50/50' },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className={`bg-white border border-gray-200 border-l-4 ${item.accent} p-4 transition-colors`}>
                <div className="font-semibold text-[#1b2a4a] text-sm">{item.label}</div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="bg-white border border-gray-200 p-5">
            <SectionTitle>Estado de Expedientes</SectionTitle>
            <div className="space-y-3">
              {Object.entries(porEstado).map(([estado, count]) => (
                <div key={estado} className="flex items-center justify-between gap-3">
                  <span className={`text-xs px-2 py-0.5 font-medium ${ESTADO_COLORS[estado as EstadoExpediente]}`}>
                    {ESTADO_LABELS[estado as EstadoExpediente]}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-20 bg-gray-100 h-1.5">
                      <div className="bg-[#0072BC] h-1.5" style={{ width: `${(count / totalExpedientes) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-700 w-4 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5">
            <SectionTitle>Alarmas Activas</SectionTitle>
            <div className="space-y-2">
              {alarmas.length === 0 && <p className="text-sm text-gray-400 py-4 text-center">Sin alarmas activas</p>}
              {alarmas.map(exp => {
                const vence = exp.fechaVencimientoAlarma ? new Date(exp.fechaVencimientoAlarma + 'T00:00:00') : null;
                const diasRestantes = vence ? Math.ceil((vence.getTime() - Date.now()) / 86400000) : null;
                const urgente = diasRestantes !== null && diasRestantes <= 3;
                return (
                  <Link key={exp.id} href={`/expedientes/${exp.id}`}
                    className="flex items-center justify-between border border-gray-200 p-3 hover:border-[#0072BC] hover:bg-blue-50/30 transition-colors">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#1b2a4a] truncate">{exp.numeroExpediente}</div>
                      <div className="text-xs text-gray-500 truncate mt-0.5">{exp.empresa.razonSocial}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">Vence: {exp.fechaVencimientoAlarma}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 font-bold flex-shrink-0 ml-2 ${urgente ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {diasRestantes !== null ? (diasRestantes <= 0 ? 'VENCIDO' : `${diasRestantes}d`) : '—'}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5">
            <SectionTitle>Actividad Reciente</SectionTitle>
            <div className="space-y-2">
              {recientes.map(exp => (
                <Link key={exp.id} href={`/expedientes/${exp.id}`}
                  className="block border border-gray-200 p-3 hover:border-[#0072BC] hover:bg-blue-50/30 transition-colors">
                  <div className="text-xs font-bold text-[#1b2a4a]">{exp.numeroExpediente}</div>
                  <div className="text-xs text-gray-600 mt-0.5 truncate">{exp.empresa.razonSocial}</div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className={`text-[10px] px-1.5 py-0.5 font-medium ${ESTADO_COLORS[exp.estado]}`}>
                      {ESTADO_LABELS[exp.estado]}
                    </span>
                    <span className="text-[10px] text-gray-400">{exp.fechaUltimaActuacion}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/expedientes"
              className="block text-center text-xs text-[#0072BC] font-semibold mt-3 py-2 border border-[#0072BC]/30 hover:bg-[#0072BC]/5 transition-colors">
              Ver todos los expedientes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
