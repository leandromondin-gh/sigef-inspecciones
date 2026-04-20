'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { mockExpedientes } from '@/lib/mock-data';
import { ESTADO_LABELS, ESTADO_COLORS } from '@/lib/types';

export default function ConsultaPage() {
  const [busqueda, setBusqueda] = useState('');
  const alarmas = mockExpedientes.filter(e => e.tieneAlarma);

  const resultados = busqueda.length >= 2
    ? mockExpedientes.filter(e =>
        e.numeroExpediente.toLowerCase().includes(busqueda.toLowerCase()) ||
        e.empresa.razonSocial.toLowerCase().includes(busqueda.toLowerCase()) ||
        e.empresa.cuit.includes(busqueda)
      )
    : [];

  return (
    <div className="flex-1">
      <Header title="Consulta / Alarmas" subtitle="Búsqueda de expedientes y alertas de vencimiento" />
      <div className="p-6 space-y-6">
        <div className="bg-white rounded border border-gray-200 p-5">
          <h2 className="font-semibold text-[#1a3a5c] mb-3">Búsqueda de Expedientes</h2>
          <input
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar por N° expediente, empresa o CUIT..."
            className="w-full border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30"
          />
          {resultados.length > 0 && (
            <div className="mt-3 space-y-2">
              {resultados.map(exp => (
                <Link key={exp.id} href={`/expedientes/${exp.id}`}
                  className="flex items-center justify-between border rounded p-3 hover:border-[#1a3a5c] transition-colors">
                  <div>
                    <div className="font-semibold text-sm text-[#1a3a5c]">{exp.numeroExpediente}</div>
                    <div className="text-xs text-gray-500">{exp.empresa.razonSocial} — {exp.empresa.cuit}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-sm ${ESTADO_COLORS[exp.estado]}`}>
                    {ESTADO_LABELS[exp.estado]}
                  </span>
                </Link>
              ))}
            </div>
          )}
          {busqueda.length >= 2 && resultados.length === 0 && (
            <p className="text-sm text-gray-400 mt-3">Sin resultados para "{busqueda}"</p>
          )}
        </div>

        <div className="bg-white rounded border border-gray-200 p-5">
          <h2 className="font-semibold text-[#1a3a5c] mb-4 flex items-center gap-2">
            <span>🔔</span> Alarmas Activas ({alarmas.length})
          </h2>
          <div className="space-y-3">
            {alarmas.map(exp => {
              const vence = exp.fechaVencimientoAlarma ? new Date(exp.fechaVencimientoAlarma + 'T00:00:00') : null;
              const diasRestantes = vence ? Math.ceil((vence.getTime() - Date.now()) / 86400000) : null;
              const urgente = diasRestantes !== null && diasRestantes <= 3;
              return (
                <Link key={exp.id} href={`/expedientes/${exp.id}`}
                  className="flex items-center justify-between border rounded p-4 hover:border-[#1a3a5c] transition-colors">
                  <div>
                    <div className="font-semibold text-sm text-[#1a3a5c]">{exp.numeroExpediente}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{exp.empresa.razonSocial}</div>
                    <div className="text-xs text-gray-400 mt-0.5">Vence: {exp.fechaVencimientoAlarma}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold px-3 py-1.5 rounded ${urgente ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {diasRestantes !== null ? (diasRestantes <= 0 ? 'VENCIDO' : `${diasRestantes} días`) : '—'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
