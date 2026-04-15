'use server'

import CONFIG from '@/config'
import { getToken } from "@/lib/utils/getToken";

export async function exportAsistencia(params: { id_proyecto: number | '', fecha: string }): Promise<Blob> {
    try {
        const token = await getToken();

        const asistenciaUrlParams = new URLSearchParams({
            id_proyecto: params.id_proyecto.toString(),
            fecha: params.fecha,
        });

        const asistencia = await fetch (`${CONFIG.URL_BASE}${CONFIG.URL_EXPORTAR}/asistencia?${asistenciaUrlParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!asistencia.ok) throw new Error(`Error exporting asistencia: ${asistencia.status} - ${asistencia.statusText}`);

        return await asistencia.blob();
    } catch (error) {
        console.error('Export asistencia failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};