import { Observacion } from "../observacion/observacion.entity";

export type JornadasImportacionItemDto = {
    id: number;
    fecha: string;
    entrada: string;
    salida: string;
    estadojornada: string;
    nombreempleado: string;
    id_tipoausencia: number;
    ausencia: boolean;
    observaciones: Observacion[];
};

export type JornadasImportacionResponseDto = {
    jornadas: JornadasImportacionItemDto[];
    totalJornadas: number;
};