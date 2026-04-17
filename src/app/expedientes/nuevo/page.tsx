'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { mockRequirentes, mockInspectores } from '@/lib/mock-data';

export default function NuevaInspeccionPage() {
  const [paso, setPaso] = useState(1);
  const [form, setForm] = useState({
    // Requirente
    requirente: '',
    // Empresa inspeccionada
    razonSocial: '',
    cuit: '',
    domicilioLegal: '',
    domicilioComercial: '',
    actividadPrincipal: '',
    // CCT
    cct: '',
    // Inspector
    inspector: '',
    // Observaciones
    observaciones: '',
  });

  const [guardado, setGuardado] = useState(false);

  const pasos = [
    { num: 1, label: 'Requirente' },
    { num: 2, label: 'Empresa' },
    { num: 3, label: 'CCT e Inspector' },
    { num: 4, label: 'Confirmación' },
  ];

  function handleChange(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function siguiente() { if (paso < 4) setPaso(p => p + 1); }
  function anterior() { if (paso > 1) setPaso(p => p - 1); }

  function handleGuardar() {
    setGuardado(true);
  }

  const requirenteSeleccionado = mockRequirentes.find(r => r.id === form.requirente);
  const inspectorSeleccionado = mockInspectores.find(i => i.id === form.inspector);

  if (guardado) {
    return (
      <div className="flex-1">
        <Header title="Nueva Inspección" subtitle="Estado A - Inicio" />
        <div className="p-6 flex items-center justify-center min-h-96">
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-[#1a3a5c] mb-2">¡Expediente iniciado!</h2>
            <p className="text-gray-600 mb-2">Se generó el número de expediente automáticamente:</p>
            <div className="bg-[#1a3a5c] text-white rounded-lg px-6 py-3 text-lg font-bold mb-4">
              SIGEF-2026-00008
            </div>
            <p className="text-sm text-gray-500 mb-6">
              El sistema generó automáticamente el folio inicial y el auto de inicio (F.8000).
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/expedientes" className="border border-[#1a3a5c] text-[#1a3a5c] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                Ver todos
              </Link>
              <Link href="/expedientes/exp-001" className="bg-[#1a3a5c] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2a4a6c]">
                Abrir expediente →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <Header
        title="Nueva Inspección"
        subtitle="Estado A - Inicio de expediente"
        actions={
          <Link href="/expedientes" className="text-sm text-gray-500 hover:text-[#1a3a5c]">
            ← Volver
          </Link>
        }
      />

      <div className="p-6 max-w-3xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center mb-8">
          {pasos.map((p, idx) => (
            <div key={p.num} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  paso === p.num
                    ? 'bg-[#f0a500] text-white'
                    : paso > p.num
                    ? 'bg-[#1a3a5c] text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {paso > p.num ? '✓' : p.num}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${paso === p.num ? 'text-[#1a3a5c]' : 'text-gray-400'}`}>
                  {p.label}
                </span>
              </div>
              {idx < pasos.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 ${paso > p.num ? 'bg-[#1a3a5c]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Paso 1: Requirente */}
          {paso === 1 && (
            <div>
              <h2 className="text-base font-bold text-[#1a3a5c] mb-1">Requirente</h2>
              <p className="text-sm text-gray-500 mb-5">Sindicato u Obra Social que solicita la inspección</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Requirente *</label>
                  <select
                    value={form.requirente}
                    onChange={e => handleChange('requirente', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] bg-white"
                  >
                    <option value="">Seleccionar requirente...</option>
                    {mockRequirentes.map(r => (
                      <option key={r.id} value={r.id}>{r.nombre}</option>
                    ))}
                  </select>
                </div>

                {requirenteSeleccionado && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                    <div className="font-semibold text-[#1a3a5c] mb-2">{requirenteSeleccionado.nombre}</div>
                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                      <div><span className="font-medium">Tipo:</span> {requirenteSeleccionado.tipo === 'SINDICATO' ? 'Sindicato' : 'Obra Social'}</div>
                      <div><span className="font-medium">CUIT:</span> {requirenteSeleccionado.cuit}</div>
                      <div className="col-span-2"><span className="font-medium">Domicilio:</span> {requirenteSeleccionado.domicilio}</div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Observaciones iniciales</label>
                  <textarea
                    value={form.observaciones}
                    onChange={e => handleChange('observaciones', e.target.value)}
                    rows={3}
                    placeholder="Motivo de la inspección, antecedentes relevantes..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Paso 2: Empresa */}
          {paso === 2 && (
            <div>
              <h2 className="text-base font-bold text-[#1a3a5c] mb-1">Empresa Inspeccionada</h2>
              <p className="text-sm text-gray-500 mb-5">Datos del empleador a inspeccionar</p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Razón Social *</label>
                    <input
                      type="text"
                      value={form.razonSocial}
                      onChange={e => handleChange('razonSocial', e.target.value)}
                      placeholder="Ej: TECNOLOGÍAS DEL SUR S.A."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">CUIT *</label>
                    <input
                      type="text"
                      value={form.cuit}
                      onChange={e => handleChange('cuit', e.target.value)}
                      placeholder="30-XXXXXXXX-X"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Actividad Principal</label>
                    <input
                      type="text"
                      value={form.actividadPrincipal}
                      onChange={e => handleChange('actividadPrincipal', e.target.value)}
                      placeholder="Ej: Desarrollo de Software"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Domicilio Legal *</label>
                    <input
                      type="text"
                      value={form.domicilioLegal}
                      onChange={e => handleChange('domicilioLegal', e.target.value)}
                      placeholder="Calle, número, localidad"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Domicilio Comercial</label>
                    <input
                      type="text"
                      value={form.domicilioComercial}
                      onChange={e => handleChange('domicilioComercial', e.target.value)}
                      placeholder="Si difiere del domicilio legal"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Paso 3: CCT e Inspector */}
          {paso === 3 && (
            <div>
              <h2 className="text-base font-bold text-[#1a3a5c] mb-1">CCT e Inspector Interviniente</h2>
              <p className="text-sm text-gray-500 mb-5">Convenio Colectivo aplicable e inspector asignado</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Convenio Colectivo de Trabajo (CCT) *</label>
                  <select
                    value={form.cct}
                    onChange={e => handleChange('cct', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] bg-white"
                  >
                    <option value="">Seleccionar CCT...</option>
                    <option value="CCT 547/03">CCT 547/03 - Empleados Comercio</option>
                    <option value="CCT 40/89">CCT 40/89 - Mecánicos y Afines (SMATA)</option>
                    <option value="CCT 122/75">CCT 122/75 - Sanidad</option>
                    <option value="CCT 76/75">CCT 76/75 - Construcción</option>
                    <option value="CCT 486/07">CCT 486/07 - Farmacia</option>
                    <option value="CCT 130/75">CCT 130/75 - Bancarios</option>
                    <option value="OTRO">Otro...</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Inspector / Auditor Interviniente *</label>
                  <select
                    value={form.inspector}
                    onChange={e => handleChange('inspector', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] bg-white"
                  >
                    <option value="">Seleccionar inspector...</option>
                    {mockInspectores.map(i => (
                      <option key={i.id} value={i.id}>
                        {i.apellido}, {i.nombre} — {i.email}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                  <div className="font-semibold text-amber-800 mb-1">📋 Documentación a requerir (Estado B)</div>
                  <p className="text-amber-700 text-xs">
                    Una vez iniciado el expediente, el sistema generará automáticamente el auto de inicio y el F.8000.
                    En la siguiente etapa se deberá requerir: estatutos/contratos, actas de designación, inscripciones AFIP,
                    libros de sueldos, planillas de personal y documentación del CCT aplicable.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Paso 4: Confirmación */}
          {paso === 4 && (
            <div>
              <h2 className="text-base font-bold text-[#1a3a5c] mb-1">Confirmación</h2>
              <p className="text-sm text-gray-500 mb-5">Revisá los datos antes de iniciar el expediente</p>
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-[#1a3a5c] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wide">Requirente</div>
                  <div className="p-4 text-sm">
                    <div className="font-medium">{requirenteSeleccionado?.nombre || '—'}</div>
                    <div className="text-gray-500">{requirenteSeleccionado?.tipo === 'SINDICATO' ? 'Sindicato' : 'Obra Social'} — CUIT {requirenteSeleccionado?.cuit}</div>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-[#1a3a5c] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wide">Empresa Inspeccionada</div>
                  <div className="p-4 text-sm grid grid-cols-2 gap-2">
                    <div><span className="text-gray-500">Razón Social:</span> <span className="font-medium">{form.razonSocial || '—'}</span></div>
                    <div><span className="text-gray-500">CUIT:</span> <span className="font-medium">{form.cuit || '—'}</span></div>
                    <div className="col-span-2"><span className="text-gray-500">Domicilio:</span> <span className="font-medium">{form.domicilioLegal || '—'}</span></div>
                    <div className="col-span-2"><span className="text-gray-500">Actividad:</span> <span className="font-medium">{form.actividadPrincipal || '—'}</span></div>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-[#1a3a5c] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wide">CCT e Inspector</div>
                  <div className="p-4 text-sm grid grid-cols-2 gap-2">
                    <div><span className="text-gray-500">CCT:</span> <span className="font-medium">{form.cct || '—'}</span></div>
                    <div><span className="text-gray-500">Inspector:</span> <span className="font-medium">{inspectorSeleccionado ? `${inspectorSeleccionado.apellido}, ${inspectorSeleccionado.nombre}` : '—'}</span></div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                  <span className="font-semibold text-blue-800">Número asignado automáticamente:</span>
                  <span className="ml-2 font-bold text-[#1a3a5c]">SIGEF-2026-00008</span>
                  <div className="text-xs text-blue-600 mt-1">Se generarán: auto de inicio, folio 1, carátula y formulario F.8000.</div>
                </div>
              </div>
            </div>
          )}

          {/* Navegación */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={anterior}
              disabled={paso === 1}
              className="px-5 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Anterior
            </button>
            {paso < 4 ? (
              <button
                onClick={siguiente}
                disabled={paso === 1 && !form.requirente}
                className="px-5 py-2 bg-[#1a3a5c] text-white rounded-lg text-sm font-semibold hover:bg-[#2a4a6c] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Siguiente →
              </button>
            ) : (
              <button
                onClick={handleGuardar}
                className="px-6 py-2 bg-[#f0a500] text-white rounded-lg text-sm font-bold hover:bg-[#d4920a]"
              >
                ✓ Iniciar Expediente
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
