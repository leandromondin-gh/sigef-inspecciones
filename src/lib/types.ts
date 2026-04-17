export type EstadoExpediente =
  | 'A_INICIO'
  | 'B_INSTRUCCION'
  | 'C_DETERMINACION'
  | 'C1_DEUDA_CONSENTIDA'
  | 'C2_IMPUGNACION'
  | 'D_COBRO_CIERRE'
  | 'FINALIZADO';

export type RolUsuario = 'ADMINISTRADOR' | 'INSPECTOR' | 'LETRADO' | 'REQUIRENTE';

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  rol: RolUsuario;
  email: string;
}

export interface Requirente {
  id: string;
  nombre: string;
  tipo: 'SINDICATO' | 'OBRA_SOCIAL';
  cuit: string;
  domicilio: string;
}

export interface Empresa {
  razonSocial: string;
  cuit: string;
  domicilio: string;
  domicilioComercial?: string;
  actividadPrincipal?: string;
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
  A_INICIO: 'A - Inicio',
  B_INSTRUCCION: 'B - Instrucción',
  C_DETERMINACION: 'C - Determinación',
  C1_DEUDA_CONSENTIDA: 'C.1 - Deuda Consentida',
  C2_IMPUGNACION: 'C.2 - Impugnación',
  D_COBRO_CIERRE: 'D - Cobro y Cierre',
  FINALIZADO: 'Finalizado',
};

export const ESTADO_COLORS: Record<EstadoExpediente, string> = {
  A_INICIO: 'bg-blue-100 text-blue-800',
  B_INSTRUCCION: 'bg-yellow-100 text-yellow-800',
  C_DETERMINACION: 'bg-orange-100 text-orange-800',
  C1_DEUDA_CONSENTIDA: 'bg-purple-100 text-purple-800',
  C2_IMPUGNACION: 'bg-red-100 text-red-800',
  D_COBRO_CIERRE: 'bg-teal-100 text-teal-800',
  FINALIZADO: 'bg-green-100 text-green-800',
};
