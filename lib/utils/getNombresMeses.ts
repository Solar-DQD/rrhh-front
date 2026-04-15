import { Mes } from "../types/mes/mes.entity";

export const getNombresMeses = (meses: Mes[]) => {
    const mesesNombres = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses.map((mes: Mes) => {
        const nombre = mesesNombres[mes.mes - 1] ?? '';
        const mesNombre = `${nombre} de ${mes.id_año}`;

        return { id: mes.id, nombre: mesNombre };
    });
};