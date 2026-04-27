'use client';

import { useState } from 'react';
import Header from '@/components/Header';

type Categoria = 'CCT' | 'DOCTRINA' | 'FALLOS' | 'ANOTACIONES' | 'OTROS';

const CATEGORIAS: { id: Categoria; label: string }[] = [
  { id: 'CCT', label: 'Convenios Colectivos (CCT)' },
  { id: 'DOCTRINA', label: 'Doctrina' },
  { id: 'FALLOS', label: 'Fallos' },
  { id: 'ANOTACIONES', label: 'Anotaciones' },
  { id: 'OTROS', label: 'Otros' },
];

const DOCS_MOCK = [
  { id: 'd1', nombre: 'CCT 402/05 — Neumáticos', categoria: 'CCT' as Categoria, fecha: '2005-01-01', tipo: 'PDF' },
  { id: 'd2', nombre: 'CCT 375/04 — Industria del Caucho', categoria: 'CCT' as Categoria, fecha: '2004-01-01', tipo: 'PDF' },
];

export default function DocumentacionPage() {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria | 'TODOS'>('TODOS');

  const docsFiltrados = categoriaActiva === 'TODOS'
    ? DOCS_MOCK
    : DOCS_MOCK.filter(d => d.categoria === categoriaActiva);

  return (
    <div className="flex-1">
      <Header
        title="Documentación General"
        subtitle="CCT, doctrina, fallos y anotaciones de referencia"
        actions={
          <button className="bg-[#0072BC] hover:bg-[#005f9e] text-white text-sm font-semibold px-4 py-2 transition-colors">
            + Subir documento
          </button>
        }
      />

      <div className="p-6 flex gap-5">
        {/* Categorías */}
        <div className="w-48 flex-shrink-0">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Categorías</div>
          <div className="space-y-0.5">
            {[{ id: 'TODOS', label: 'Todos' }, ...CATEGORIAS].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id as Categoria | 'TODOS')}
                className={`w-full text-left text-sm px-3 py-2 border-l-2 transition-colors ${
                  categoriaActiva === cat.id
                    ? 'border-[#0072BC] text-[#0072BC] bg-blue-50/50 font-semibold'
                    : 'border-transparent text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Documentos */}
        <div className="flex-1">
          <div className="bg-white border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-[#1b2a4a] text-gray-600">
                  <th className="text-left px-4 py-2 text-xs uppercase font-semibold">Nombre</th>
                  <th className="text-left px-4 py-2 text-xs uppercase font-semibold">Categoría</th>
                  <th className="text-left px-4 py-2 text-xs uppercase font-semibold">Fecha</th>
                  <th className="text-left px-4 py-2 text-xs uppercase font-semibold">Tipo</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {docsFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-400 text-sm">
                      No hay documentos en esta categoría.
                    </td>
                  </tr>
                )}
                {docsFiltrados.map(doc => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-[#1b2a4a]">{doc.nombre}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{doc.categoria}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{doc.fecha}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-600 font-bold">{doc.tipo}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-[#0072BC] hover:underline">Ver</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
