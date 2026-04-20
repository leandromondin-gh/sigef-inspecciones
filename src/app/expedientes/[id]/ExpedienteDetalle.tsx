'use client';

import { use } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { mockExpedientes } from '@/lib/mock-data';
import { ESTADO_LABELS, ESTADO_COLORS, EstadoExpediente } from '@/lib/types';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
}

const ESTADOS_ORDEN: EstadoExpediente[] = [
  'A_INICIO',
  'B_INSTRUCCION',
  'C_DETERMINACION',
  'C1_DEUDA_CONSENTIDA',
  'D_COBRO_CIERRE',
  'FINALIZADO',
];

const ACCIONES_POR_ESTADO: Record<EstadoExpediente, { label: string; color: string }[]> = {
  A_INICIO: [
    { label: '📄 Generar Auto de Inicio', color: 'bg-blue-600 hover:bg-blue-700' },
    { label: '📋 Generar F.8000', color: 'bg-blue-600 hover:bg-blue-700' },
    { label: '→ Pasar a Instrucción', color: 'bg-[#1b2a4a] hover:bg-[#243659]' },
  ],
  B_INSTRUCCION: [
    { label: '🔍 Consulta ARCA', color: 'bg-purple-600 hover:bg-purple-700' },
    { label: '📧 Generar Requerimiento', color: 'bg-blue-600 hover:bg-blue-700' },
    { label: '📊 Cargar Acta Sindical', color: 'bg-blue-600 hover:bg-blue-700' },
    { label: '→ Pasar a Determinación', color: 'bg-[#1b2a4a] hover:bg-[#243659]' },
  ],
  C_DETERMINACION: [
    { label: '🧮 Calcular Deuda (F.7109)', color: 'bg-orange-600 hover:bg-orange-700' },
    { label: '📧 Intimar Deuda', color: 'bg-blue-600 hover:bg-blue-700' },
    { label: '→ Deuda Consentida', color: 'bg-purple-600 hover:bg-purple-700' },
    { label: '→ Registrar Impugnación', color: 'bg-red-600 hover:bg-red-700' },
  ],
  C1_DEUDA_CONSENTIDA: [
    { label: '📄 Generar Res. Consentimiento', color: 'bg-purple-600 hover:bg-purple-700' },
    { label: '→ Pasar a Cobro/Cierre', color: 'bg-[#1b2a4a] hover:bg-[#243659]' },
  ],
  C2_IMPUGNACION: [
    { label: '📥 Registrar Impugnación', color: 'bg-red-600 hover:bg-red-700' },
    { label: '⚖️ Resolver Impugnación', color: 'bg-red-600 hover:bg-red-700' },
    { label: '→ Pasar a Cobro/Cierre', color: 'bg-[#1b2a4a] hover:bg-[#243659]' },
  ],
  D_COBRO_CIERRE: [
    { label: '🤝 Registrar Plan de Pago', color: 'bg-teal-600 hover:bg-teal-700' },
    { label: '📜 Generar Cert. de Deuda', color: 'bg-orange-600 hover:bg-orange-700' },
    { label: '✅ Cerrar por Pago Total', color: 'bg-green-600 hover:bg-green-700' },
    { label: '📂 Archivar', color: 'bg-gray-600 hover:bg-gray-700' },
  ],
  FINALIZADO: [],
};

const ACTUACIONES_MOCK: Record<string, { fecha: string; tipo: string; descripcion: string; usuario: string }[]> = {
  'exp-001': [
    { fecha: '2026-01-15', tipo: 'INICIO', descripcion: 'Inicio del expediente. Auto de inicio generado. Folio 1 incorporado.', usuario: 'Rodríguez, Carlos' },
    { fecha: '2026-01-18', tipo: 'F.8000', descripcion: 'Generación del formulario F.8000 (Inicio de Inspección).', usuario: 'Rodríguez, Carlos' },
    { fecha: '2026-01-25', tipo: 'CONSULTA ARCA', descripcion: 'Consulta al sistema ARCA. Resultado: empresa inscripta. Constancia incorporada (folio 3).', usuario: 'Rodríguez, Carlos' },
    { fecha: '2026-02-03', tipo: 'REQUERIMIENTO', descripcion: 'Notificación de requerimiento bajo apercibimiento. Plazo: 10 días hábiles.', usuario: 'Rodríguez, Carlos' },
    { fecha: '2026-02-20', tipo: 'ACTA SINDICAL', descripcion: 'Recepción de acta sindical. Nómina de 48 trabajadores incorporada.', usuario: 'Rodríguez, Carlos' },
    { fecha: '2026-03-10', tipo: 'DETERMINACIÓN', descripcion: 'Cálculo de deuda determinada. Capital: $350.000. Intereses: $135.200,50. Total: $485.200,50.', usuario: 'Rodríguez, Carlos' },
    { fecha: '2026-03-15', tipo: 'F.7109', descripcion: 'Generación del formulario F.7109. Folio 44 incorporado.', usuario: 'Rodríguez, Carlos' },
    { fecha: '2026-03-28', tipo: 'INTIMACIÓN', descripcion: 'Intimación de deuda notificada. Plazo: 15 días hábiles. Alarma configurada al 20/04/2026.', usuario: 'Rodríguez, Carlos' },
  ],
  'exp-003': [
    { fecha: '2025-11-10', tipo: 'INICIO', descripcion: 'Inicio del expediente. Auto de inicio generado.', usuario: 'González, María' },
    { fecha: '2025-11-18', tipo: 'F.8000', descripcion: 'Formulario F.8000 generado e incorporado al expediente.', usuario: 'González, María' },
    { fecha: '2025-12-02', tipo: 'REQUERIMIENTO', descripcion: 'Requerimiento bajo apercibimiento notificado.', usuario: 'González, María' },
    { fecha: '2026-01-08', tipo: 'DETERMINACIÓN', descripcion: 'Deuda determinada: $1.250.800,00', usuario: 'González, María' },
    { fecha: '2026-02-15', tipo: 'INTIMACIÓN', descripcion: 'Intimación de deuda notificada.', usuario: 'González, María' },
    { fecha: '2026-03-05', tipo: 'IMPUGNACIÓN', descripcion: 'Empresa presenta impugnación. Motivo: error en cálculo de horas extras. Traslado a letrado.', usuario: 'González, María' },
    { fecha: '2026-04-01', tipo: 'RESOLUCIÓN', descripcion: 'Resolución pendiente de letrado. Deuda ratificada parcialmente.', usuario: 'Fernández, Pablo' },
  ],
};

export default function ExpedienteDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const expediente = mockExpedientes.find(e => e.id === id);

  if (!expediente) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">😕</div>
          <h2 className="text-xl font-bold text-[#1b2a4a] mb-2">Expediente no encontrado</h2>
          <Link href="/expedientes" className="text-sm text-[#1b2a4a] underline">Volver a la lista</Link>
        </div>
      </div>
    );
  }

  const actuaciones = ACTUACIONES_MOCK[id] || [
    { fecha: expediente.fechaInicio, tipo: 'INICIO', descripcion: 'Inicio del expediente.', usuario: `${expediente.inspector.apellido}, ${expediente.inspector.nombre}` },
  ];

  const estadoIdx = ESTADOS_ORDEN.indexOf(expediente.estado);
  const acciones = ACCIONES_POR_ESTADO[expediente.estado] || [];

  return (
    <div className="flex-1">
      <Header
        title={expediente.numeroExpediente}
        subtitle={expediente.caratula}
        actions={
          <Link href="/expedientes" className="text-sm text-gray-500 hover:text-[#1b2a4a]">
            ← Volver
          </Link>
        }
      />

      <div className="p-6 space-y-5 max-w-6xl">
        {/* Estado / Progress */}
        <div className="bg-white rounded border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#1b2a4a]">Estado del Expediente</h2>
            <span className={`text-xs px-3 py-1 rounded-sm font-semibold ${ESTADO_COLORS[expediente.estado]}`}>
              {ESTADO_LABELS[expediente.estado]}
            </span>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {ESTADOS_ORDEN.map((estado, idx) => {
              const activo = estado === expediente.estado;
              const completado = idx < estadoIdx;
              return (
                <div key={estado} className="flex items-center gap-1 flex-shrink-0">
                  <div className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    activo
                      ? 'bg-[#0072BC] text-white border border-gray-200'
                      : completado
                      ? 'bg-[#1b2a4a] text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {ESTADO_LABELS[estado]}
                    {activo && <span className="ml-1">●</span>}
                  </div>
                  {idx < ESTADOS_ORDEN.length - 1 && (
                    <div className={`w-4 h-0.5 ${completado ? 'bg-[#1b2a4a]' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Datos del expediente */}
          <div className="lg:col-span-2 space-y-5">
            {/* Info principal */}
            <div className="bg-white rounded border border-gray-200 p-5">
              <h2 className="font-semibold text-[#1b2a4a] mb-4 pb-2 border-b border-gray-100">Datos del Expediente</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">N° Expediente</div>
                  <div className="font-bold text-[#1b2a4a]">{expediente.numeroExpediente}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Fecha de Inicio</div>
                  <div className="font-medium">{expediente.fechaInicio}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Inspector</div>
                  <div className="font-medium">{expediente.inspector.apellido}, {expediente.inspector.nombre}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">CCT Aplicable</div>
                  <div className="font-medium">{expediente.cct || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Folios</div>
                  <div className="font-medium">{expediente.folios}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Última Actuación</div>
                  <div className="font-medium">{expediente.fechaUltimaActuacion}</div>
                </div>
              </div>
            </div>

            {/* Empresa */}
            <div className="bg-white rounded border border-gray-200 p-5">
              <h2 className="font-semibold text-[#1b2a4a] mb-4 pb-2 border-b border-gray-100">Empresa Inspeccionada</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2">
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Razón Social</div>
                  <div className="font-bold text-gray-800">{expediente.empresa.razonSocial}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">CUIT</div>
                  <div className="font-medium">{expediente.empresa.cuit}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Actividad</div>
                  <div className="font-medium">{expediente.empresa.actividadPrincipal || '—'}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Domicilio Legal</div>
                  <div className="font-medium">{expediente.empresa.domicilio}</div>
                </div>
              </div>
            </div>

            {/* Requirente */}
            <div className="bg-white rounded border border-gray-200 p-5">
              <h2 className="font-semibold text-[#1b2a4a] mb-4 pb-2 border-b border-gray-100">Requirente</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2">
                  <div className="font-bold text-gray-800">{expediente.requirente.nombre}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Tipo</div>
                  <div className="font-medium">{expediente.requirente.tipo === 'SINDICATO' ? 'Sindicato' : 'Obra Social'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">CUIT</div>
                  <div className="font-medium">{expediente.requirente.cuit}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Domicilio</div>
                  <div className="font-medium">{expediente.requirente.domicilio}</div>
                </div>
              </div>
            </div>

            {/* Actuaciones */}
            <div className="bg-white rounded border border-gray-200 p-5">
              <h2 className="font-semibold text-[#1b2a4a] mb-4 pb-2 border-b border-gray-100">
                Actuaciones ({actuaciones.length})
              </h2>
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200" />
                <div className="space-y-4">
                  {actuaciones.map((act, idx) => (
                    <div key={idx} className="flex gap-4 pl-8 relative">
                      <div className="absolute left-0 w-6 h-6 bg-[#1b2a4a] rounded-sm flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold">
                        {actuaciones.length - idx}
                      </div>
                      <div className="flex-1 border border-gray-100 rounded p-3 text-sm hover:border-gray-200 transition-colors">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <span className="text-xs font-bold text-[#1b2a4a] uppercase tracking-wide">{act.tipo}</span>
                          <span className="text-xs text-gray-400 whitespace-nowrap">{act.fecha}</span>
                        </div>
                        <p className="text-gray-700">{act.descripcion}</p>
                        <div className="text-xs text-gray-400 mt-1">— {act.usuario}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Panel derecho */}
          <div className="space-y-5">
            {/* Deuda */}
            {expediente.montoDeuda !== undefined && (
              <div className={`rounded border border-gray-200 p-5 ${expediente.montoDeuda === 0 ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
                <h2 className="font-semibold text-[#1b2a4a] mb-2">Deuda Determinada</h2>
                <div className={`text-2xl font-bold ${expediente.montoDeuda === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                  {expediente.montoDeuda === 0 ? 'PAGADO' : formatCurrency(expediente.montoDeuda)}
                </div>
                {expediente.montoDeuda > 0 && (
                  <div className="text-xs text-gray-500 mt-1">Capital + intereses al {expediente.fechaUltimaActuacion}</div>
                )}
              </div>
            )}

            {/* Alarma */}
            {expediente.tieneAlarma && expediente.fechaVencimientoAlarma && (
              <div className="bg-red-50 border border-red-200 rounded border border-gray-200 p-5">
                <h2 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                  <span>🔔</span> Alarma Activa
                </h2>
                <div className="text-lg font-bold text-red-600">{expediente.fechaVencimientoAlarma}</div>
                <div className="text-xs text-red-500 mt-1">Plazo legal de respuesta</div>
              </div>
            )}

            {/* Acciones */}
            {acciones.length > 0 && (
              <div className="bg-white rounded border border-gray-200 p-5">
                <h2 className="font-semibold text-[#1b2a4a] mb-3">Acciones Disponibles</h2>
                <div className="space-y-2">
                  {acciones.map((accion, idx) => (
                    <button
                      key={idx}
                      className={`w-full text-left px-4 py-2.5 rounded text-sm font-medium text-white transition-colors ${accion.color}`}
                    >
                      {accion.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Documentos */}
            <div className="bg-white rounded border border-gray-200 p-5">
              <h2 className="font-semibold text-[#1b2a4a] mb-3">Documentos Generados</h2>
              <div className="space-y-2 text-sm">
                {[
                  { nombre: 'Auto de Inicio', fecha: expediente.fechaInicio, tipo: 'PDF' },
                  { nombre: 'F.8000 - Inicio Inspección', fecha: expediente.fechaInicio, tipo: 'DOCX' },
                  ...(expediente.montoDeuda ? [{ nombre: 'F.7109 - Determinación', fecha: expediente.fechaUltimaActuacion, tipo: 'DOCX' }] : []),
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between border border-gray-100 rounded p-2.5 hover:border-gray-200">
                    <div>
                      <div className="font-medium text-gray-700 text-xs">{doc.nombre}</div>
                      <div className="text-[10px] text-gray-400">{doc.fecha}</div>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${doc.tipo === 'PDF' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      {doc.tipo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
