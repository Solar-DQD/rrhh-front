import { deleteImportacion } from "@/lib/actions/importacion/importacion.actions";
import { useSnackbar } from "@/lib/contexts/snackbar";
import { useConfirm } from "@/lib/hooks/useConfirm";
import { ImportacionItemDto } from "@/lib/types/importacion/get-importacion";
import { Box, Button, Chip, TableRow } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TableRowCell } from "../../common/tables/tableRowCell";
import LightTooltip from "../../common/components/tooltip";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import Link from "next/link";
import SyncIcon from '@mui/icons-material/Sync';

export default function ImportacionesTableRow({
    importacion,
    esAdministrativo
}: {
    importacion: ImportacionItemDto,
    esAdministrativo: boolean
}) {
    //init
    const queryClient = useQueryClient();
    //hooks
    const { showSuccess, showError } = useSnackbar();
    const confirm = useConfirm();
    //mutacion
    const remove = useMutation({
        mutationFn: (data: { id: number }) => deleteImportacion(data),
        onSuccess: () => {
            showSuccess('Importacion eliminada correctamente');
            queryClient.invalidateQueries({
                queryKey: ['getImportaciones']
            });
        },
        onError: () => {
            showError('Error al eliminar importacion')
        }
    });
    return (
        <TableRow>
            <TableRowCell alignment='left'>
                {importacion.nombre}
            </TableRowCell>
            <TableRowCell alignment='center'>
                {importacion.nombreproyecto}
            </TableRowCell>
            <TableRowCell alignment='center'>
                {importacion.nombreusuario}
            </TableRowCell>
            <TableRowCell alignment={`${esAdministrativo ? 'center' : 'right'}`}>
                <Chip
                    label={importacion.nombreestado}
                    className='!rounded'
                    color={
                        importacion.nombreestado.toLowerCase() === 'completa' ? 'success' : 'error'
                    }
                />
            </TableRowCell>
            {esAdministrativo &&
                <TableRowCell alignment='right' variant='buttons'>
                    <Box sx={{ display: 'flex' }}>
                        <LightTooltip title='Guardar' placement='left' arrow>
                            <Button
                                component={Link}
                                href={`/administrativo/importacion/${importacion.id}/completar`}
                                variant='contained'
                                color='success'
                                disableElevation
                                size='small'
                                disabled={remove.isPending}
                                sx={{ borderRadius: '4px 0 0 4px' }}
                            >
                                <EditNoteRoundedIcon />
                            </Button>
                        </LightTooltip>
                        <LightTooltip title='Cancelar' placement='left' arrow>
                            <Button
                                variant={confirm.confirm ? 'contained': 'outlined'}
                                color='error'
                                disableElevation
                                size='small'
                                disabled={remove.isPending}
                                onBlur={() => confirm.handleConfirm(false)}
                                    onClick={confirm.confirm ? () => remove.mutate({ id: importacion.id }) : () => confirm.handleConfirm()}
                                sx={{ borderRadius: '0 4px 4px 0' }}
                            >
                                {!remove.isPending ? <DeleteForeverRoundedIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
                            </Button>
                        </LightTooltip>
                    </Box>
                </TableRowCell>
            }
        </TableRow>
    )
};