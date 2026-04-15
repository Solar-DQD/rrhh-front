import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

export function TableSkeleton({
    rows,
    columns
}: {
    rows: number,
    columns: { variant: 'text' | 'rectangular', count?: number, width?: number, alignment: 'center' | 'left' | 'right' | 'inherit' | 'justify', colWidth?: string, span?: number, visible?: boolean }[]
}) {
    return (
        <TableBody>
            {Array.from({ length: rows }).map((_, index) => (
                <TableRow key={index}>
                    {columns.map((col, index2) => {
                        let className: string = '';
                        if (col.alignment === 'center') className = 'flex items-center justify-center gap-2';
                        if (col.alignment === 'left') className = 'flex items-center justify-start gap-2';
                        if (col.alignment === 'right') className = 'flex items-center justify-end gap-2';
                        const skeleton = col.variant === 'rectangular'
                            ? <Skeleton variant='rectangular' className='!rounded' height={30} width={col.width ?? 60} />
                            : <Skeleton variant='text' width={col.width ?? 100} />
                        if (col.visible ?? true) return (
                            <TableCell align={col.alignment} width={col.colWidth} colSpan={col.span} key={index2} size='small'>
                                <div className={className}>
                                    {Array.from({ length: col.count ?? 1 }).map((_, index3) => (
                                        <div key={index3}>
                                            {skeleton}
                                        </div>
                                    ))}
                                </div>
                            </TableCell>
                        );
                    })}
                </TableRow>
            ))}
        </TableBody>
    );
};