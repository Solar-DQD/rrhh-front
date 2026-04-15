export type ImportacionItemDto = {
    id: number;
    fecha: string;
    nombre: string;
    nombreestado: string;
    nombreusuario: string;
    nombreproyecto: string;
};

export type ImportacionesResponseDto = {
    importaciones: ImportacionItemDto[];
    totalImportaciones: number;
};