import { TableRowCell } from "@/components/common/tables/tableRowCell";
import { TableRow } from "@mui/material";

export function InicioAsistenciaTableRow({ empleado, index }: { empleado: { nombre: string, tipoempleado: string }, index: number }) {
    return (
        <TableRow>
            <TableRowCell alignment='left'>
                {index}
            </TableRowCell>
            <TableRowCell alignment='center'>
                {empleado.nombre}
            </TableRowCell>
            <TableRowCell alignment='right'>
                {empleado.tipoempleado}
            </TableRowCell>
        </TableRow>
    );
};
