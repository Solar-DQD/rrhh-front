import { Box, Button, TableRow } from "@mui/material";
import { JornadasImportacionItemDto } from "@/lib/types/jornada/get-jornada-importacion";
import { TableRowCell } from "@/lib/components/common/tables/tableRowCell";
import LightTooltip from "@/lib/components/common/components/tooltip";
import SyncIcon from '@mui/icons-material/Sync';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/lib/contexts/snackbar";
import { useConfirm } from "@/lib/hooks/useConfirm";
import { useShow } from "@/lib/hooks/useShow";
import { TipoAusencia } from "@/lib/types/tipoAusencia/tipoAusencia.entity";
import { useForm } from "react-hook-form";
import { CompletarTableEditFormData } from "../types/completarTableEditFormData";
import { deleteJornada, editJornada, editJornadaTipoAusencia, validateJornada } from "@/lib/actions/jornada/jornada.actions";
import { createObservacion, deleteObservacion } from "@/lib/actions/observacion/observacion.actions";
import { ControlledTimePicker } from "@/lib/components/common/inputs/controlledTimePicker";
import { ControlledTextField } from "@/lib/components/common/inputs/controlledTextField";
import { ControlledSelect } from "@/lib/components/common/inputs/controlledSelect";
import { PulsingWarning } from "@/lib/components/common/components/warning";
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import { ObservacionesTooltip } from "@/lib/components/common/components/observacionesTooltip";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function CompletarTableRow({
    jornada,
    tiposAusencia
}: {
    jornada: JornadasImportacionItemDto,
    tiposAusencia: TipoAusencia[]
}) {
    //init
    const queryClient = useQueryClient();
    //hooks
    const { showSuccess, showError } = useSnackbar();
    const confirmRemove = useConfirm();
    const confirmValidate = useConfirm();
    const show = useShow();
    const { control, handleSubmit, formState: { isValid }, resetField } = useForm<CompletarTableEditFormData>({
        defaultValues: {
            entrada: jornada.entrada ?? '',
            salida: jornada.salida ?? '',
            id_tipoausencia: jornada.id_tipoausencia ?? '',
            observacion: ''
        }
    });
    //mutations
    const edit = useMutation({
        mutationFn: (data: {
            id: number,
            entrada: string,
            salida: string
        }) => editJornada(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getJornadasPorImportacion']
            });
            showSuccess('Jornada editada correctamente');
        },
        onError: () => {
            showError('Error al editar la jornada');
        }
    });
    const removeJornada = useMutation({
        mutationFn: (data: {
            id: number
        }) => deleteJornada(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getJornadasPorImportacion']
            });
            showSuccess('Jornada eliminada correctamente');
        },
        onError: () => {
            showError('Error al eliminar jornada');
        }
    });
    const justify = useMutation({
        mutationFn: (data: {
            id: number,
            id_tipoausencia: number | ''
        }) => editJornadaTipoAusencia(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getJornadasPorImportacion']
            });
            showSuccess('Ausencia justificada correctamente');
        },
        onError: () => {
            showError('Error al justificar ausencia');
        }
    });
    const validate = useMutation({
        mutationFn: async (data: {
            id: number,
            entrada: string,
            salida: string,
            id_tipoausencia: number | ''
        }) => {
            if (jornada.ausencia) {
                await editJornadaTipoAusencia({
                    id: data.id,
                    id_tipoausencia: data.id_tipoausencia
                });
                await validateJornada({ id: data.id });
            } else if (!jornada.ausencia) {
                await editJornada({
                    id: data.id,
                    entrada: data.entrada,
                    salida: data.salida
                });
                await validateJornada({ id: data.id });
            };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getJornadasPorImportacion']
            });
            showSuccess('Jornada validada correctamente');
        },
        onError: () => {
            showError('Error al validar la jornada');
        }
    });
    const create = useMutation({
        mutationFn: (data: {
            observacion: string,
            id_jornada: number
        }) => createObservacion(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getJornadasPorImportacion']
            });
            showSuccess('Observación creada correctamente');
            show.handleShow();
            resetField('observacion');
        },
        onError: () => {
            showError('Error al crear observación');
        }
    });
    const removeObservacion = useMutation({
        mutationFn: (data: {
            id: number
        }) => deleteObservacion(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getJornadasPorImportacion']
            });
            showSuccess('Observación eliminada correctamente');
        },
        onError: () => {
            showError('Error al eliminar observación')
        }
    });
    //const
    const validada = jornada.estadojornada.toLowerCase() === 'validada';
    const revision = jornada.estadojornada.toLowerCase() === 'requiere revision';
    return (
        <TableRow>
            <TableRowCell alignment='left'>
                {jornada.ausencia ? 'Ausente' : 'Presente'}
            </TableRowCell>
            <TableRowCell alignment='center'>
                {jornada.nombreempleado}
            </TableRowCell>
            {!jornada.ausencia && !show.show &&
                <>
                    <TableRowCell alignment='center'>
                        <ControlledTimePicker
                            control={control}
                            name='entrada'
                            rules={{ required: jornada.ausencia ? false : 'Este campo es requerido' }}
                            disabled={jornada.ausencia}
                            label='Entrada'
                        />
                    </TableRowCell>
                    <TableRowCell alignment='center'>
                        <ControlledTimePicker
                            control={control}
                            name='salida'
                            rules={{ required: jornada.ausencia ? false : 'Este campo es requerido' }}
                            disabled={jornada.ausencia}
                            label='Salida'
                        />
                    </TableRowCell>
                </>
            }
            {jornada.ausencia && !show.show &&
                <TableRowCell alignment='center' span={2}>
                    <ControlledSelect
                        control={control}
                        name='id_tipoausencia'
                        label='Tipo de Ausencia'
                        rules={{ required: !jornada.ausencia ? false : 'Este campo es requerido' }}
                        disabled={tiposAusencia.length === 0 || !tiposAusencia}
                        items={tiposAusencia}
                    />
                </TableRowCell>
            }
            {show.show &&
                <TableRowCell alignment='center' span={2}>
                    <ControlledTextField
                        control={control}
                        name='observacion'
                        rules={{ required: 'Debe ingresar la observacion' }}
                        disabled={create.isPending}
                        label='Observación'
                    />
                </TableRowCell>
            }
            <TableRowCell alignment='right' variant='buttons'
                highlight={revision
                    ? 'error'
                    : validada
                        ? 'success'
                        : jornada.ausencia
                            ? 'warning'
                            : undefined
                }
            >
                {!show.show
                    ? revision
                        ? <PulsingWarning />
                        : null
                    : null
                }
                <Box sx={{ display: 'flex' }}>
                    {show.show ? (
                        <>
                            <LightTooltip title='Guardar' placement='left' arrow>
                                <Button
                                    variant='contained'
                                    color='success'
                                    disableElevation
                                    size='small'
                                    disabled={create.isPending || !isValid}
                                    onClick={handleSubmit((data) => create.mutate({
                                        observacion: data.observacion,
                                        id_jornada: jornada.id
                                    }))}
                                    sx={{ borderRadius: '4px 0 0 4px' }}
                                >
                                    {!create.isPending ? <SaveAsRoundedIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
                                </Button>
                            </LightTooltip>
                            <LightTooltip title='Cancelar' placement='left' arrow>
                                <Button
                                    variant='contained'
                                    color='error'
                                    disableElevation
                                    size='small'
                                    disabled={create.isPending}
                                    onClick={() => show.handleShow()}
                                    sx={{ borderRadius: '0 4px 4px 0' }}
                                >
                                    {!create.isPending ? <CloseRoundedIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
                                </Button>
                            </LightTooltip>
                        </>
                    ) : (
                        <>
                            <ObservacionesTooltip observaciones={jornada.observaciones} onDelete={(id: number) => removeObservacion.mutate({ id })} sx={{ borderRadius: '4px 0 0 4px' }} />
                            <LightTooltip title='Añadir Observación' placement='left' arrow>
                                <Button
                                    variant='contained'
                                    color='warning'
                                    disableElevation
                                    size='small'
                                    onClick={() => {
                                        show.handleShow();
                                        resetField('observacion');
                                    }}
                                    sx={!jornada.observaciones?.length ? { borderRadius: '4px 0 0 4px' } : { borderRadius: 0 }}
                                >
                                    <AddRoundedIcon />
                                </Button>
                            </LightTooltip>
                            <LightTooltip title='Guardar' placement='left' arrow>
                                <Button
                                    variant='contained'
                                    color='info'
                                    disableElevation
                                    size='small'
                                    disabled={edit.isPending || removeJornada.isPending || validate.isPending || !isValid || validada}
                                    onClick={!jornada.ausencia
                                        ? handleSubmit((data) => edit.mutate({
                                            id: jornada.id,
                                            entrada: data.entrada,
                                            salida: data.salida
                                        }))
                                        : handleSubmit((data) => justify.mutate({
                                            id: jornada.id,
                                            id_tipoausencia: data.id_tipoausencia
                                        }))
                                    }
                                    sx={{ borderRadius: '0 0 0 0' }}
                                >
                                    {!edit.isPending ? <SaveAsRoundedIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
                                </Button>
                            </LightTooltip>
                            <LightTooltip title={confirmRemove.confirm ? 'Confirmar' : '¿Borrar?'} placement='left' arrow>
                                <Button
                                    variant={confirmRemove.confirm ? 'contained' : 'outlined'}
                                    color='error'
                                    disableElevation
                                    size='small'
                                    disabled={edit.isPending || removeJornada.isPending || validate.isPending || validada}
                                    onBlur={() => confirmRemove.handleConfirm()}
                                    onClick={confirmRemove.confirm
                                        ? () => removeJornada.mutate({ id: jornada.id })
                                        : () => confirmRemove.handleConfirm()
                                    }
                                    sx={{ borderRadius: '0 0 0 0' }}
                                >
                                    {!removeJornada.isPending ? <DeleteForeverRoundedIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
                                </Button>
                            </LightTooltip>
                            <LightTooltip title={confirmValidate.confirm ? 'Confirmar' : '¿Validar?'} placement='left' arrow>
                                <Button
                                    variant={confirmValidate.confirm ? 'contained' : 'outlined'}
                                    color='success'
                                    disableElevation
                                    size='small'
                                    disabled={edit.isPending || removeJornada.isPending || validate.isPending || !isValid || validada}
                                    onBlur={() => confirmValidate.handleConfirm()}
                                    onClick={confirmValidate.confirm
                                        ? handleSubmit((data) => validate.mutate({
                                            id: jornada.id,
                                            entrada: data.entrada,
                                            salida: data.salida,
                                            id_tipoausencia: data.id_tipoausencia
                                        }))
                                        : () => confirmValidate.handleConfirm()
                                    }
                                    sx={{ borderRadius: '0 4px 4px 0' }}
                                >
                                    {!validate.isPending ? <VerifiedUserRoundedIcon /> : <SyncIcon className='animate-spin' style={{ animationDirection: 'reverse' }} />}
                                </Button>
                            </LightTooltip>
                        </>
                    )}
                </Box>
            </TableRowCell>
        </TableRow >
    )
};