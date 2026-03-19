'use client'

import { getAsistenciaInicio } from "@/actions/features/asistencia/asistencia.actions";
import { useSnackbar } from "@/lib/contexts/snackbar";
import { usePagination } from "@/lib/hooks/usePagination";
import { Button, Skeleton, Table, TableContainer } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
import TableWrapper from "@/components/common/wrappers/tableWrapper";
import { useTabs } from "@/lib/hooks/useTabs";

const categorys = [
    { category: 'Presentes', key: 'totalPresentes' },
    { category: 'Jornaleros Presentes', key: 'totalJornaleros' },
    { category: 'Mensuales Presentes', key: 'totalMensuales' },
    { category: 'Ausentes', key: 'totalAusentes' },
] as const;

export default function AdministrativoInicio() {
    //hooks
    const { showWarning } = useSnackbar();
    const pagination = usePagination({ limit: 25 });
    const tab = useTabs({ tab: 'ausentes' });
    //query
    const asistencia = useQuery({
        queryKey: ['getAsistenciaInicio', pagination.page, pagination.limit],
        queryFn: () => getAsistenciaInicio({ page: pagination.page, limit: pagination.limit })
    });
    //feedback
    useEffect(() => {
        if (asistencia.isError) showWarning('Error al cargar asistencia')
    }, [asistencia.isError, showWarning])
    return (
        <div className='flex flex-row gap-2 w-full h-full overflow-hidden'>
            <div className='flex flex-col flex-1 gap-2 overflow-hidden'>
                <div className='flex flex-col flex-1 gap-2 justify-between overflow-auto'>
                    <div className='flex flex-col flex-1 gap-2'>
                        {categorys.map(({ category, key }) => (
                            <InicioAsistenciaCard key={key} category={category} total={asistencia.data?.[key]} isLoading={asistencia.isLoading} />
                        ))}
                    </div>
                    <Button
                        component={Link}
                        href={'/administrativo/empleados/asistencia'}
                        variant='contained'
                        className='hover:!bg-gray-800 hover:!text-white hover:!border-gray-800 !bg-white !text-orange-600 !border-2 !border-orange-500'
                        disableElevation
                        fullWidth
                        endIcon={<NumbersRoundedIcon />}
                    >
                        Consultar Asistencia
                    </Button>
                </div>
                <div className='flex flex-1 bg-yellow-100'>
                </div>
            </div>
            <div className='flex flex-col flex-2 gap-2 overflow-hidden'>
                <TableTabs
                    handleTabChange={(newTab: string) => {
                        tab.handleTabChange(null, newTab);
                        pagination.handlePageChange(null, 0);
                    }}
                    activeTab={tab.tab}
                    tabs={[
                        { label: 'Ausentes', value: 'ausentes' },
                        { label: 'Presentes', value: 'presentes' }
                    ]}
                />
                <TableWrapper
                    isLoading={asistencia.isLoading}
                    page={pagination.page}
                    limit={pagination.limit}
                    handlePageChange={pagination.handlePageChange}
                    handleLimitChange={pagination.handleLimitChange}
                    total={asistencia.data?.totalAusentes ?? 0}
                >
                    <div className='flex flex-1'></div>
                </TableWrapper>
            </div>
        </div>
    );
};

export function InicioAsistenciaCard({
    category,
    total,
    isLoading
}: {
    category: string,
    total?: number,
    isLoading: boolean
}) {
    if (isLoading) return (
        <Skeleton variant='rectangular' className='!rounded !h-14 !w-full' />
    );
    return (
        <div className='flex h-14 justify-start items-center border-2 border-orange-500 px-6 p-4 rounded text-gray-700 font-semibold'>
            Total {category}: {total ?? '-'}
        </div>
    );
};

export function TableTabs({
    handleTabChange,
    activeTab,
    tabs
}: {
    handleTabChange: (newTab: string) => void,
    activeTab: string,
    tabs: { label: string, value: string }[]
}) {
    return (
        <div className='flex flex-row gap-2 w-full shrink-0 h-14'>
            {tabs.map((tab) => (
                <Button
                    variant='contained'
                    className={`hover:!bg-orange-100 hover:!text-orange-600 !border-2 hover:!border-orange-500 ${activeTab === tab.value ? '!bg-orange-100 !text-orange-600 !border-orange-500' : '!bg-gray-100 !text-gray-700 !border-gray-500'}`}
                    disableElevation
                    fullWidth
                    onClick={() => handleTabChange(tab.value)}
                    key={tab.value}
                >
                    {tab.label}
                </Button>
            ))}
        </div>
    );
};

export function TableBase({
    items,
    isLoading,
    header,
    skeleton,
    body,
    noItemMessage,
    containerClassName
}: {
    items: unknown[] | null | undefined,
    isLoading: boolean,
    header: React.ReactNode,
    skeleton: React.ReactNode,
    body: React.ReactNode,
    noItemMessage: string,
    containerClassName: string
}) {
    return (
        <>
            {isLoading || (items && items.length > 0) ? (
                <TableContainer className={containerClassName}>
                    <Table stickyHeader size='small'>
                        {header}
                        {isLoading ? skeleton : body}
                    </Table>
                </TableContainer>
            ) : null}
            {!isLoading && (!items || items.length === 0) && (
                <div className='flex items-center justify-center py-8 h-full w-full text-gray-700 font-medium text-sm'>
                    {noItemMessage}
                </div>
            )}
        </>
    );
};