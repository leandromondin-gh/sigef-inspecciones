export type EstadoExpediente =
  | 'INICIO'
  | 'EN_INSTRUCCION'
  | 'CON_REQUERIMIENTO'
  | 'DEUDA_DETERMINADA'
  | 'CON_IMPUGNACION'
  | 'PLAZO_NOTIFICACION'
  | 'CONSENTIDA'
  | 'EN_EJECUCION'
  | 'OTRO'
  | 'FINALIZADO'
  | 'SUSPENDIDO';

export type EstadoDocumento = 'BORRADOR' | 'FIRMADO';

export type RolUsuario = 'ADMINISTRADOR' | 'INSPECTOR' | 'LETRADO' | 'REQUIRENTE';

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  titulo?: string;
  rol: RolUsuario;
  email: string;
}

export interface Requirente {
  id: string;
  nombre: string;
  tipo: 'SINDICATO' | 'OBRA_SOCIAL';
  cuit: string;
  domicilio: string;
  personeria?: string;
}

export interface Empresa {
  razonSocial: string;
  cuit: string;
  domicilio: string;
  domicilioComercial?: string;
  actividadPrincipal?: string;
}

export interface Actuacion {
  id: string;
  tipo: string;
  descripcion: string;
  fecha: string;
  folio: string;
  estado: EstadoDocumento;
  usuario: string;
  archivoPdf?: string;
}

export interface Interviniente {
  id: string;
  rol: 'RESPONSABLE' | 'CONTADOR' | 'ABOGADO' | 'RRHH' | 'OTRO';
  nombre: string;
  email?: string;
  telefono?: string;
  observaciones?: string;
}

export interface Pago {
  id: string;
  fecha: string;
  monto: number;
  descripcion: string;
  vinculadoA?: string;
}

export interface Notificacion {
  id: string;
  tipo: 'ELECTRONICA' | 'PERSONAL' | 'CARTA_DOCUMENTO';
  fecha: string;
  descripcion: string;
  estado: 'PENDIENTE' | 'ENVIADA' | 'INCORPORADA';
  documentoVinculado?: string;
}

export interface Expediente {
  id: string;
  numeroExpediente: string;
  caratula: string;
  empresa: Empresa;
  requirente: Requirente;
  inspector: Usuario;
  estado: EstadoExpediente;
  fechaInicio: string;
  fechaUltimaActuacion: string;
  montoDeuda?: number;
  folios: number;
  tieneAlarma?: boolean;
  fechaVencimientoAlarma?: string;
  cct?: string;
}

export const ESTADO_LABELS: Record<EstadoExpediente, string> = {
  INICIO: 'Inicio',
  EN_INSTRUCCION: 'En Instrucción',
  CON_REQUERIMIENTO: 'Con Requerimiento',
  DEUDA_DETERMINADA: 'Deuda Determinada',
  CON_IMPUGNACION: 'Con Impugnación',
  PLAZO_NOTIFICACION: 'Plazo Notificación',
  CONSENTIDA: 'Consentida',
  EN_EJECUCION: 'En Ejecución',
  OTRO: 'Otro',
  FINALIZADO: 'Finalizado',
  SUSPENDIDO: 'Suspendido',
};

export const ESTADO_COLORS: Record<EstadoExpediente, string> = {
  INICIO: 'bg-blue-100 text-blue-800',
  EN_INSTRUCCION: 'bg-yellow-100 text-yellow-800',
  CON_REQUERIMIENTO: 'bg-orange-100 text-orange-800',
  DEUDA_DETERMINADA: 'bg-red-100 text-red-800',
  CON_IMPUGNACION: 'bg-purple-100 text-purple-800',
  PLAZO_NOTIFICACION: 'bg-pink-100 text-pink-800',
  CONSENTIDA: 'bg-teal-100 text-teal-800',
  EN_EJECUCION: 'bg-indigo-100 text-indigo-800',
  OTRO: 'bg-gray-100 text-gray-700',
  FINALIZADO: 'bg-green-100 text-green-800',
  SUSPENDIDO: 'bg-gray-200 text-gray-600',
};

export const CCT_OPTIONS = [
  'CCT 402/05 (Neumáticos)',
  'CCT 375/04 (Industria del Caucho)',
];
