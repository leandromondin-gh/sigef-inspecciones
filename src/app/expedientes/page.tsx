'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { mockExpedientes } from '@/lib/mock-data';
import { ESTADO_LABELS, ESTADO_COLORS, EstadoExpediente } from '@/lib/types';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);
}

export default function ExpedientesPage() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<EstadoExpediente | 'TODOS'>('TODOS');
  const [filtroInspector, setFiltroInspector] = useState('TODOS');

  const expedientesFiltrados = mockExpedientes.filter(exp => {
    const matchBusqueda =
      busqueda === '' ||
      exp.numeroExpediente.toLowerCase().includes(busqueda.toLowerCase()) ||
      exp.empresa.razonSocial.toLowerCase().includes(busqueda.toLowerCase()) ||
      exp.empresa.cuit.includes(busqueda) ||
      exp.caratula.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === 'TODOS' || exp.estado === filtroEstado;
    const matchInspector = filtroInspector === 'TODOS' || exp.inspector.id === filtroInspector;
    return matchBusqueda && matchEstado && matchInspector;
  });

  const inspectores = Array.from(new Set(mockExpedientes.map(e => e.inspector.id))).map(id =>
    mockExpedientes.find(e => e.inspector.id === id)!.inspector
  );

  return (
    <div className="flex-1">
      <Header
        title="Expedientes"
        subtitle={`${expedientesFiltrados.length} expediente${expedientesFiltrados.length !== 1 ? 's' : ''} encontrado${expedientesFiltrados.length !== 1 ? 's' : ''}`}
        actions={
          <Link
            href="/expedientes/nuevo"
            className="bg-[#0072BC] hover:bg-[#005f9e] text-white text-sm font-semibold px-4 py-2 rounded transition-colors flex items-center gap-2"
          >
            <span>＋</span> Nueva Inspección
          </Link>
        }
      />

      <div className="p-6">
        {/* Filtros */}
        <div className="bg-white rounded border border-gray-200 p-4 mb-6 flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-64">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Buscar</label>
            <input
              type="text"
              placeholder="N° expediente, empresa, CUIT, carátula..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a4a]/30 focus:border-[#1b2a4a]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Estado</label>
            <select
              value={filtroEstado}
              onChange={e => setFiltroEstado(e.target.value as EstadoExpediente | 'TODOS')}
              className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a4a]/30 focus:border-[#1b2a4a] bg-white"
            >
              <option value="TODOS">Todos los estados</option>
              {Object.entries(ESTADO_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Inspector</label>
            <select
              value={filtroInspector}
              onChange={e => setFiltroInspector(e.target.value)}
              className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b2a4a]/30 focus:border-[#1b2a4a] bg-white"
            >
              <option value="TODOS">Todos</option>
              {inspectores.map(i => (
                <option key={i.id} value={i.id}>{i.apellido}, {i.nombre}</option>
              ))}
            </select>
          </div>
          {(busqueda || filtroEstado !== 'TODOS' || filtroInspector !== 'TODOS') && (
            <button
              onClick={() => { setBusqueda(''); setFiltroEstado('TODOS'); setFiltroInspector('TODOS'); }}
              className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded hover:bg-gray-50"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Tabla */}
        <div className="bg-white rounded border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600 border-b-2 border-[#1b2a4a]">
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">N° Expediente</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">Empresa / CUIT</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">Requirente</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">Inspector</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">Estado</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">Deuda</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide">Última Act.</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expedientesFiltrados.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    No se encontraron expedientes con los filtros aplicados
                  </td>
                </tr>
              )}
              {expedientesFiltrados.map(exp => (
                <tr key={exp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[#1b2a4a]">{exp.numeroExpediente}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <span>📄 {exp.folios} folios</span>
                      {exp.tieneAlarma && <span className="text-red-500 font-bold">🔔</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{exp.empresa.razonSocial}</div>
                    <div className="text-xs text-gray-400">{exp.empresa.cuit}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-gray-700">{exp.requirente.nombre.split(' - ')[0]}</div>
                    <div className="text-xs text-gray-400">{exp.requirente.tipo === 'SINDICATO' ? 'Sindicato' : 'Obra Social'}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {exp.inspector.apellido}, {exp.inspector.nombre}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-sm font-medium whitespace-nowrap ${ESTADO_COLORS[exp.estado]}`}>
                      {ESTADO_LABELS[exp.estado]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {exp.montoDeuda !== undefined
                      ? exp.montoDeuda === 0
                        ? <span className="text-green-600 font-medium">Pagado</span>
                        : <span className="font-medium">{formatCurrency(exp.montoDeuda)}</span>
                      : <span className="text-gray-400">—</span>
                    }
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{exp.fechaUltimaActuacion}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/expedientes/${exp.id}`}
                      className="text-[#1b2a4a] hover:text-[#0072BC] font-medium text-xs border border-current rounded px-2 py-1 transition-colors whitespace-nowrap"
                    >
                      Ver →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
