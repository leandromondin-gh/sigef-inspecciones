import Link from 'next/link';
import Header from '@/components/Header';
import { mockExpedientes } from '@/lib/mock-data';
import { ESTADO_LABELS, ESTADO_COLORS, EstadoExpediente } from '@/lib/types';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border-l-4 ${color}`}>
      <div className="text-2xl font-bold text-[#1a3a5c]">{value}</div>
      <div className="text-sm font-medium text-gray-700 mt-1">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
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

  const alarmas = mockExpedientes.filter(e => e.tieneAlarma).sort((a, b) =>
    (a.fechaVencimientoAlarma ?? '').localeCompare(b.fechaVencimientoAlarma ?? '')
  );

  const recientes = [...mockExpedientes]
    .sort((a, b) => b.fechaUltimaActuacion.localeCompare(a.fechaUltimaActuacion))
    .slice(0, 4);

  return (
    <div className="flex-1">
      <Header
        title="Panel Principal"
        subtitle="Sistema de Expedientes Administrativos de Inspección Gremial y Obra Social"
        actions={
          <Link
            href="/expedientes/nuevo"
            className="bg-[#0072BC] hover:bg-[#005f9e] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>＋</span> Nueva Inspección
          </Link>
        }
      />

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Expedientes Activos" value={expedientesActivos} sub={`de ${totalExpedientes} totales`} color="border-blue-500" />
          <StatCard label="Con Alarma Activa" value={expedientesConAlarma} sub="Próximos vencimientos" color="border-red-500" />
          <StatCard label="Deuda Determinada" value={formatCurrency(totalDeuda)} sub="Capital + intereses" color="border-orange-500" />
          <StatCard label="Finalizados" value={mockExpedientes.filter(e => e.estado === 'FINALIZADO').length} sub="Año 2025-2026" color="border-green-500" />
        </div>

        {/* Quick Access */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Acceso Rápido</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/expedientes/nuevo', icon: '📄', label: 'Nueva Inspección', desc: 'Iniciar expediente', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
              { href: '/rendicion', icon: '📊', label: 'Rendición de Cuentas', desc: 'Panel contable', color: 'bg-green-50 border-green-200 hover:bg-green-100' },
              { href: '/consulta', icon: '🔍', label: 'Consulta', desc: 'Buscar y alarmas', color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100' },
              { href: '/autorizados', icon: '👥', label: 'Autorizados', desc: 'Gestión de accesos', color: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className={`${item.color} border rounded-xl p-5 text-center transition-all`}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-semibold text-[#1a3a5c] text-sm">{item.label}</div>
                <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Estado de expedientes */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="font-semibold text-[#1a3a5c] mb-4 flex items-center gap-2">
              <span>📋</span> Estado de Expedientes
            </h2>
            <div className="space-y-3">
              {Object.entries(porEstado).map(([estado, count]) => (
                <div key={estado} className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${ESTADO_COLORS[estado as EstadoExpediente]}`}>
                    {ESTADO_LABELS[estado as EstadoExpediente]}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-[#1a3a5c] h-1.5 rounded-full"
                        style={{ width: `${(count / totalExpedientes) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-700 w-4 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alarmas */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="font-semibold text-[#1a3a5c] mb-4 flex items-center gap-2">
              <span>🔔</span> Alarmas Próximas
            </h2>
            <div className="space-y-3">
              {alarmas.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">Sin alarmas activas</p>
              )}
              {alarmas.map(exp => {
                const vence = exp.fechaVencimientoAlarma
                  ? new Date(exp.fechaVencimientoAlarma + 'T00:00:00')
                  : null;
                const hoy = new Date();
                const diasRestantes = vence
                  ? Math.ceil((vence.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
                  : null;
                const urgente = diasRestantes !== null && diasRestantes <= 3;
                return (
                  <Link key={exp.id} href={`/expedientes/${exp.id}`}
                    className="block border rounded-lg p-3 hover:border-[#1a3a5c] transition-colors">
                    <div className="flex justify-between items-start gap-2">
                      <div className="text-xs font-semibold text-[#1a3a5c] truncate">{exp.numeroExpediente}</div>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-bold flex-shrink-0 ${urgente ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {diasRestantes !== null ? (diasRestantes <= 0 ? 'VENCIDO' : `${diasRestantes}d`) : '-'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate">{exp.empresa.razonSocial}</div>
                    <div className="text-xs text-gray-400 mt-0.5">Vence: {exp.fechaVencimientoAlarma}</div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="font-semibold text-[#1a3a5c] mb-4 flex items-center gap-2">
              <span>⏱</span> Actividad Reciente
            </h2>
            <div className="space-y-3">
              {recientes.map(exp => (
                <Link key={exp.id} href={`/expedientes/${exp.id}`}
                  className="block border rounded-lg p-3 hover:border-[#1a3a5c] transition-colors">
                  <div className="text-xs font-semibold text-[#1a3a5c]">{exp.numeroExpediente}</div>
                  <div className="text-xs text-gray-600 mt-0.5 truncate">{exp.empresa.razonSocial}</div>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${ESTADO_COLORS[exp.estado]}`}>
                      {ESTADO_LABELS[exp.estado]}
                    </span>
                    <span className="text-[10px] text-gray-400">{exp.fechaUltimaActuacion}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/expedientes" className="block text-center text-sm text-[#1a3a5c] font-medium mt-3 hover:underline">
              Ver todos →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
