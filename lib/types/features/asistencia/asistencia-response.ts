import { EmpleadoAsistenciaItemDto } from "../../empleado/empleado-asistencia";

export type AsistenciaResponseDto = {
    totalMensuales: number;
    totalJornaleros: number;
    totalPresentes: number;
    totalAusentes: number;
    presentes: EmpleadoAsistenciaItemDto[];
    ausentes: EmpleadoAsistenciaItemDto[];
};