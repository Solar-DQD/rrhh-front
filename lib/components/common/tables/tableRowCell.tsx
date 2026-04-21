import { TableCell } from "@mui/material";

export function TableRowCell({
    alignment,
    variant,
    span,
    children,
    highlight,
    color
}: {
    alignment: 'center' | 'left' | 'right' | 'inherit' | 'justify',
    variant?: 'buttons' | 'text',
    span?: number,
    children: React.ReactNode,
    highlight?: 'warning' | 'error' | 'success',
    color?: 'green' | 'gray'
}) {
    let divClassName = 'text-gray-700 font-medium';
    if (variant === 'buttons') divClassName = 'flex items-center justify-end text-gray-700 font-medium';
    let cellClassName = '';
    if (highlight === 'error') cellClassName = 'border-r-10 border-red-600';
    if (highlight === 'warning') cellClassName = 'border-r-10 border-[#F97316]';
    if (highlight === 'success') cellClassName = 'border-r-10 border-green-700'
    return (
        <TableCell align={alignment} colSpan={span} size='small' className={cellClassName}>
            <div className={divClassName}>
                {children}
            </div>
        </TableCell>
    );
};

//añadir color para tablas jornada