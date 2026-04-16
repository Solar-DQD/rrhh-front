import { Control, UseFormWatch } from "react-hook-form";
import { ImportFormData } from "../types/importFormData";
import { Proyecto } from "@/lib/types/proyecto/proyecto.entity";
import { TipoJornada } from "@/lib/types/tipoJornada/tipoJornada.entity";
import { TipoImportacion } from "@/lib/types/tipoImportacion/tipoImportacion.entity";
import { ControlledSelect } from "@/lib/components/common/inputs/controlledSelect"
import { ControlledDatePicker } from "@/lib/components/common/inputs/controlledDatePicker";

export default function ImportarFormInputs({
    control,
    proyectos,
    tiposJornada,
    tiposImportacion,
    isLoading,
    watch
}: {
    control: Control<ImportFormData>,
    proyectos: Proyecto[],
    tiposJornada: TipoJornada[],
    tiposImportacion: TipoImportacion[],
    isLoading: boolean,
    watch: UseFormWatch<ImportFormData>
}) {
    return (
        <>
            <div className='flex flex-row w-full gap-2'>
                <ControlledSelect
                    control={control}
                    name='id_proyecto'
                    label='Proyecto'
                    rules={{ required: 'Debe seleccionar un proyecto' }}
                    isLoading={isLoading}
                    disabled={proyectos.length === 0}
                    items={proyectos}
                />
                <ControlledSelect
                    control={control}
                    name='id_tipojornada'
                    label='Tipo de Jornada'
                    rules={{ required: 'Debe seleccionar un tipo de jornada' }}
                    isLoading={isLoading}
                    disabled={tiposJornada.length === 0}
                    items={tiposJornada}
                />
                <ControlledSelect
                    control={control}
                    name='id_tipoimportacion'
                    label='Tipo de Importación'
                    rules={{ required: 'Debe seleccionar un tipo de importación' }}
                    isLoading={isLoading}
                    disabled={tiposImportacion.length === 0}
                    items={tiposImportacion}
                />
            </div>
            {watch('id_tipoimportacion') === 2 &&
                <ControlledDatePicker
                    control={control}
                    name='fecha'
                    label='Fecha'
                    rules={watch('id_tipoimportacion') === 2 ? { required: 'Debe seleccionar una fecha' } : undefined}
                    isLoading={isLoading}
                />
            }
        </>
    )
}