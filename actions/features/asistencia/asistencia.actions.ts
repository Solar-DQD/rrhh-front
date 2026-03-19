'use server'

import CONFIG from '@/config'
import { AsistenciaResponseDto } from "@/lib/types/features/asistencia/asistencia-response";
import { getToken } from "@/lib/utils/getToken";

export async function getAsistenciaInicio(params: { page: number, limit: number }): Promise<AsistenciaResponseDto> {
    try {
        const token = await getToken();

        const asistenciaUrlParams = new URLSearchParams({
            page: params.page.toString(),
            limit: params.limit.toString()
        });

        const asistencia = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_ASISTENCIA}/inicio?${asistenciaUrlParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!asistencia.ok) throw new Error(`Error getting asistencia: ${asistencia.status} - ${asistencia.statusText}`);

        return asistencia.json();
    } catch (error) {
        console.error('Get asistencia failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};