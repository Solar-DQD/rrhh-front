import { TableCell } from "@mui/material";

export function TableRowCell({
    alignment,
    variant,
    children
}: {
    alignment: 'center' | 'left' | 'right' | 'inherit' | 'justify',
    variant?: 'buttons' | 'text',
    children: React.ReactNode
}) {
    let className = 'text-gray-700 font-medium'
    if (variant === 'buttons') className = 'flex items-center justify-end text-gray-700 font-medium';
    return (
        <TableCell align={alignment} size='small'>
            <div className={className}>
                {children}
            </div>
        </TableCell>
    );
};