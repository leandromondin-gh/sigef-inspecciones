'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { mockExpedientes } from '@/lib/mock-data';
import { ESTADO_LABELS, ESTADO_COLORS, EstadoExpediente, Actuacion, Interviniente, Pago, Notificacion } from '@/lib/types';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
}

type Solapa = 'actuaciones' | 'intervinientes' | 'pagos' | 'notificaciones' | 'agenda' | 'vinculados' | 'prueba';

const SOLAPAS: { id: Solapa; label: string }[] = [
  { id: 'actuaciones', label: 'Actuaciones' },
  { id: 'intervinientes', label: 'Intervinientes' },
  { id: 'pagos', label: 'Pagos' },
  { id: 'notificaciones', label: 'Notificaciones' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'vinculados', label: 'Vinculados' },
  { id: 'prueba', label: 'Prueba' },
];

const ACTUACIONES_MOCK: Record<string, Actuacion[]> = {
  'exp-001': [
    { id: 'a1', tipo: 'INICIO DE INSPECCIÓN GREMIAL', descripcion: 'Inicio del expediente. Auto de inicio generado.', fecha: '2026-01-15', folio: 'Fs. 1', estado: 'FIRMADO', usuario: 'Dr. Pecorelli, Ignacio', archivoPdf: 'inicio-inspeccion.pdf' },
    { id: 'a2', tipo: 'REQUERIMIENTO', descripcion: 'Notificación de requerimiento bajo apercibimiento. Plazo: 10 días hábiles.', fecha: '2026-02-03', folio: 'Fs. 2/3', estado: 'FIRMADO', usuario: 'Dr. Pecorelli, Ignacio', archivoPdf: 'requerimiento.pdf' },
    { id: 'a3', tipo: 'ACTA SINDICAL', descripcion: 'Recepción de acta sindical. Nómina de 48 trabajadores incorporada.', fecha: '2026-02-20', folio: 'Fs. 4/12', estado: 'FIRMADO', usuario: 'Dr. Pecorelli, Ignacio', archivoPdf: 'acta-sindical.pdf' },
    { id: 'a4', tipo: 'DETERMINACIÓN DE DEUDA', descripcion: 'Capital: $350.000. Intereses: $135.200,50. Total: $485.200,50.', fecha: '2026-03-10', folio: 'Fs. 13/44', estado: 'FIRMADO', usuario: 'Dr. Pecorelli, Ignacio', archivoPdf: 'determinacion-deuda.pdf' },
    { id: 'a5', tipo: 'INTIMACIÓN DE DEUDA', descripcion: 'Intimación notificada. Plazo: 15 días hábiles.', fecha: '2026-03-28', folio: 'Fs. 45/47', estado: 'BORRADOR', usuario: 'Dr. Pecorelli, Ignacio' },
  ],
  'exp-005': [
    { id: 'b1', tipo: 'INICIO DE INSPECCIÓN GREMIAL', descripcion: 'Inicio del expediente. Primera actuación generada automáticamente.', fecha: '2026-04-08', folio: 'Fs. 1', estado: 'BORRADOR', usuario: 'Dr. Pecorelli, Ignacio' },
  ],
};

const INTERVINIENTES_MOCK: Interviniente[] = [
  { id: 'i1', rol: 'RESPONSABLE', nombre: 'Juan García', email: 'jgarcia@empresa.com', telefono: '11-4567-8901' },
  { id: 'i2', rol: 'CONTADOR', nombre: 'Cra. María López', email: 'mlopez@estudio.com', telefono: '11-2345-6789' },
  { id: 'i3', rol: 'ABOGADO', nombre: 'Dr. Carlos Fernández', email: 'cfernandez@estudio.com', telefono: '11-3456-7890' },
];

const ROL_LABELS: Record<string, string> = {
  RESPONSABLE: 'Responsable', CONTADOR: 'Contador/a', ABOGADO: 'Abogado/a', RRHH: 'RR.HH.', OTRO: 'Otro',
};

export default function ExpedienteDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [solapa, setSolapa] = useState<Solapa>('actuaciones');
  const [showAccion, setShowAccion] = useState<string | null>(null);
  const [estadoEditando, setEstadoEditando] = useState(false);

  const expediente = mockExpedientes.find(e => e.id === id);

  if (!expediente) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#1b2a4a] mb-2">Expediente no encontrado</h2>
          <Link href="/expedientes" className="text-sm text-[#0072BC] underline">Volver a la lista</Link>
        </div>
      </div>
    );
  }

  const actuaciones = ACTUACIONES_MOCK[id] || [
    { id: 'x1', tipo: 'INICIO DE INSPECCIÓN GREMIAL', descripcion: 'Inicio del expediente.', fecha: expediente.fechaInicio, folio: 'Fs. 1', estado: 'BORRADOR' as const, usuario: `Dr. ${expediente.inspector.apellido}, ${expediente.inspector.nombre}` },
  ];

  return (
    <div className="flex-1">
      <Header
        title={expediente.numeroExpediente}
        subtitle={expediente.caratula}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/expedientes" className="text-sm text-gray-500 hover:text-[#1b2a4a]">← Volver</Link>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 transition-colors border border-gray-300">
              Exportar PDF
            </button>
          </div>
        }
      />

      <div className="p-6 max-w-7xl space-y-5">

        {/* Info principal + estado */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Datos expediente */}
          <div className="lg:col-span-3 bg-white border border-gray-200 p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">N° Expediente</div>
                <div className="font-bold text-[#1b2a4a]">{expediente.numeroExpediente}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Inspector</div>
                <div className="font-medium">Dr. {expediente.inspector.apellido}, {expediente.inspector.nombre}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">CCT</div>
                <div className="font-medium">{expediente.cct || '—'}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Foliatura</div>
                <div className="font-medium">Fs. {expediente.folios}</div>
              </div>
              <div className="col-span-2">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Empresa</div>
                <div className="font-bold text-gray-800">{expediente.empresa.razonSocial}</div>
                <div className="text-xs text-gray-500">CUIT {expediente.empresa.cuit} — {expediente.empresa.domicilio}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Requirente</div>
                <div className="font-medium text-gray-700">{expediente.requirente.nombre.split(' (')[0]}</div>
                <div className="text-xs text-gray-400">{expediente.requirente.tipo === 'SINDICATO' ? 'Sindicato' : 'Obra Social'}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Inicio</div>
                <div className="font-medium">{expediente.fechaInicio}</div>
              </div>
            </div>
          </div>

          {/* Estado + deuda */}
          <div className="space-y-3">
            <div className="bg-white border border-gray-200 p-4">
              <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Estado</div>
              {estadoEditando ? (
                <select
                  className="w-full border border-gray-300 text-sm px-2 py-1.5 focus:outline-none focus:border-[#0072BC]"
                  defaultValue={expediente.estado}
                  onBlur={() => setEstadoEditando(false)}
                >
                  {Object.entries(ESTADO_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs px-2 py-1 font-semibold ${ESTADO_COLORS[expediente.estado]}`}>
                    {ESTADO_LABELS[expediente.estado]}
                  </span>
                  <button onClick={() => setEstadoEditando(true)} className="text-[10px] text-[#0072BC] hover:underline">Cambiar</button>
                </div>
              )}
            </div>
            {expediente.montoDeuda !== undefined && (
              <div className={`border p-4 ${expediente.montoDeuda === 0 ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Deuda</div>
                <div className={`text-lg font-bold ${expediente.montoDeuda === 0 ? 'text-green-600' : 'text-orange-600'}`}>
                  {expediente.montoDeuda === 0 ? 'PAGADO' : formatCurrency(expediente.montoDeuda)}
                </div>
              </div>
            )}
            {expediente.tieneAlarma && (
              <div className="bg-red-50 border border-red-200 p-4">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Alarma</div>
                <div className="text-sm font-bold text-red-600">{expediente.fechaVencimientoAlarma}</div>
              </div>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div className="bg-white border border-gray-200 p-4">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Acciones</div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'nueva-actuacion', label: 'Nueva Actuación', color: 'bg-[#1b2a4a] text-white hover:bg-[#243659]' },
              { id: 'notificar', label: 'Notificar', color: 'bg-[#0072BC] text-white hover:bg-[#005f9e]' },
              { id: 'cargar-documental', label: 'Cargar Documental', color: 'bg-white text-[#1b2a4a] border border-gray-300 hover:bg-gray-50' },
              { id: 'determinar-deuda', label: 'Determinar Deuda', color: 'bg-orange-600 text-white hover:bg-orange-700' },
              { id: 'alarma', label: expediente.tieneAlarma ? 'Editar Alarma' : 'Agregar Alarma', color: 'bg-white text-red-600 border border-red-300 hover:bg-red-50' },
            ].map(accion => (
              <button
                key={accion.id}
                onClick={() => setShowAccion(showAccion === accion.id ? null : accion.id)}
                className={`text-xs font-semibold px-4 py-2 transition-colors ${accion.color}`}
              >
                {accion.label}
              </button>
            ))}
          </div>

          {/* Panel de acción expandido */}
          {showAccion === 'nueva-actuacion' && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="text-sm font-semibold text-[#1b2a4a] mb-3">Nueva Actuación</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button className="border border-[#0072BC] text-[#0072BC] text-sm px-4 py-3 hover:bg-blue-50 transition-colors text-left">
                  <div className="font-semibold">Generar en Word Online</div>
                  <div className="text-xs text-gray-500 mt-0.5">Borrador editable en Google Drive</div>
                </button>
                <button className="border border-gray-300 text-gray-700 text-sm px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                  <div className="font-semibold">Cargar PDF sin firmar</div>
                  <div className="text-xs text-gray-500 mt-0.5">Se incorpora al firmar</div>
                </button>
              </div>
            </div>
          )}

          {showAccion === 'notificar' && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="text-sm font-semibold text-[#1b2a4a] mb-3">Tipo de Notificación</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: 'Notificación Electrónica', desc: 'Vía mail — requiere domicilio electrónico constituido' },
                  { label: 'Notificación Personal', desc: 'Cédula imprimible — firma en papel y entrega física' },
                  { label: 'Carta Documento', desc: 'Correo físico o sistema SIE del correo' },
                ].map(n => (
                  <button key={n.label} className="border border-gray-300 text-sm px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                    <div className="font-semibold text-[#1b2a4a]">{n.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{n.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showAccion === 'determinar-deuda' && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="text-sm font-semibold text-[#1b2a4a] mb-3">Determinación de Deuda</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Cargar Excel de referencia</label>
                  <input type="file" accept=".xlsx,.xls" className="w-full border border-gray-300 text-xs px-3 py-2" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Intereses según AFIP</label>
                  <a href="https://serviciosweb.afip.gob.ar/genericos/calculointeres/resarcitorios.aspx" target="_blank" rel="noreferrer"
                    className="block border border-[#0072BC] text-[#0072BC] text-xs px-3 py-2 hover:bg-blue-50">
                    Abrir calculadora AFIP →
                  </a>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="bg-orange-600 text-white text-xs font-semibold px-4 py-2 hover:bg-orange-700">Generar Acta de Determinación</button>
                <button className="border border-gray-300 text-gray-700 text-xs px-4 py-2 hover:bg-gray-50">Generar Anexo (detalle trabajadores)</button>
              </div>
            </div>
          )}

          {showAccion === 'alarma' && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="text-sm font-semibold text-[#1b2a4a] mb-3">
                {expediente.tieneAlarma ? 'Editar Alarma' : 'Agregar Alarma'}
              </div>
              <div className="flex gap-3 items-end">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Fecha de vencimiento</label>
                  <input type="date" defaultValue={expediente.fechaVencimientoAlarma}
                    className="border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:border-[#0072BC]" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
                  <input type="text" placeholder="Ej: Vence plazo de respuesta al requerimiento"
                    className="w-full border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:border-[#0072BC]" />
                </div>
                <button className="bg-[#1b2a4a] text-white text-xs font-semibold px-4 py-2 hover:bg-[#243659]">Guardar</button>
              </div>
            </div>
          )}

          {showAccion === 'cargar-documental' && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="text-sm font-semibold text-[#1b2a4a] mb-3">Cargar Documental (Prueba)</div>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Descripción del documento</label>
                  <input type="text" placeholder="Ej: Recibos de sueldo — período ene/mar 2026"
                    className="w-full border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:border-[#0072BC]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Archivo PDF</label>
                  <input type="file" accept=".pdf" className="border border-gray-300 text-xs px-3 py-2" />
                </div>
                <button className="bg-[#1b2a4a] text-white text-xs font-semibold px-4 py-2 hover:bg-[#243659]">Cargar</button>
              </div>
            </div>
          )}
        </div>

        {/* Solapas */}
        <div className="bg-white border border-gray-200">
          <div className="border-b border-gray-200 flex overflow-x-auto">
            {SOLAPAS.map(s => (
              <button
                key={s.id}
                onClick={() => setSolapa(s.id)}
                className={`text-xs font-semibold px-5 py-3 whitespace-nowrap border-b-2 transition-colors ${
                  solapa === s.id
                    ? 'border-[#0072BC] text-[#0072BC]'
                    : 'border-transparent text-gray-500 hover:text-[#1b2a4a]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="p-5">
            {/* ACTUACIONES */}
            {solapa === 'actuaciones' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 border-b-2 border-[#1b2a4a] text-gray-600">
                        <th className="text-left px-4 py-2 text-xs uppercase font-semibold">Tipo</th>
                        <th className="text-left px-4 py-2 text-xs uppercase font-semibold">Descripción</th>
                        <th className="text-left px-4 py-2 text-xs uppercase font-semibold">Fecha Firma</th>
                        <th className="text-left px-4 py-2 text-xs uppercase font-semibold">Fs.</th>
                        <th className="text-left px-4 py-2 text-xs uppercase font-semibold">Estado</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {actuaciones.map(act => (
                        <tr key={act.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-semibold text-[#1b2a4a] text-xs whitespace-nowrap">{act.tipo}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{act.descripcion}</td>
                          <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{act.estado === 'FIRMADO' ? act.fecha : '—'}</td>
                          <td className="px-4 py-3 text-gray-500 text-xs font-mono whitespace-nowrap">{act.estado === 'FIRMADO' ? act.folio : '—'}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] px-2 py-0.5 font-bold ${
                              act.estado === 'FIRMADO'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {act.estado}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {act.archivoPdf ? (
                              <button className="text-xs text-[#0072BC] hover:underline">Descargar PDF</button>
                            ) : act.estado === 'BORRADOR' ? (
                              <button className="text-xs text-orange-600 hover:underline">Firmar</button>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* INTERVINIENTES */}
            {solapa === 'intervinientes' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">Personas vinculadas al expediente</span>
                  <button className="text-xs bg-[#1b2a4a] text-white px-3 py-1.5 hover:bg-[#243659]">+ Agregar</button>
                </div>
                <div className="space-y-2">
                  {INTERVINIENTES_MOCK.map(i => (
                    <div key={i.id} className="border border-gray-200 p-3 flex items-center justify-between hover:border-gray-300">
                      <div>
                        <span className="text-xs font-bold text-[#0072BC] mr-2">{ROL_LABELS[i.rol]}</span>
                        <span className="text-sm font-medium text-[#1b2a4a]">{i.nombre}</span>
                        <div className="text-xs text-gray-500 mt-0.5">{i.email} {i.telefono && `— ${i.telefono}`}</div>
                      </div>
                      <button className="text-xs text-gray-400 hover:text-gray-600">Editar</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAGOS */}
            {solapa === 'pagos' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">Registro de pagos</span>
                  <button className="text-xs bg-[#1b2a4a] text-white px-3 py-1.5 hover:bg-[#243659]">+ Registrar pago</button>
                </div>
                <p className="text-sm text-gray-400 text-center py-8">No se registraron pagos para este expediente.</p>
              </div>
            )}

            {/* NOTIFICACIONES */}
            {solapa === 'notificaciones' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">Notificaciones del expediente</span>
                  <button className="text-xs bg-[#0072BC] text-white px-3 py-1.5 hover:bg-[#005f9e]">+ Nueva notificación</button>
                </div>
                <p className="text-sm text-gray-400 text-center py-8">No hay notificaciones registradas.</p>
              </div>
            )}

            {/* AGENDA */}
            {solapa === 'agenda' && (
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-4">Tareas pendientes y alarmas</div>
                {expediente.tieneAlarma ? (
                  <div className="border border-red-200 bg-red-50 p-4">
                    <div className="text-xs font-bold text-red-700 uppercase tracking-wide mb-1">Alarma activa</div>
                    <div className="text-sm font-semibold text-red-600">Vence: {expediente.fechaVencimientoAlarma}</div>
                    <div className="text-xs text-red-500 mt-1">Plazo legal de respuesta</div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center py-8">Sin tareas ni alarmas pendientes.</p>
                )}
              </div>
            )}

            {/* VINCULADOS */}
            {solapa === 'vinculados' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">Expedientes vinculados</span>
                  <button className="text-xs bg-[#1b2a4a] text-white px-3 py-1.5 hover:bg-[#243659]">+ Vincular expediente</button>
                </div>
                <p className="text-sm text-gray-400 text-center py-8">No hay expedientes vinculados. Permite vincular por mismo grupo empresario o cambio de razón social.</p>
              </div>
            )}

            {/* PRUEBA */}
            {solapa === 'prueba' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">Documentación aportada como prueba</span>
                  <button className="text-xs bg-[#1b2a4a] text-white px-3 py-1.5 hover:bg-[#243659]">+ Cargar documento</button>
                </div>
                <p className="text-sm text-gray-400 text-center py-8">Sin documentos cargados. Incluye documentación enviada por la empresa, actas de inspección y otra documentación relevante.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
