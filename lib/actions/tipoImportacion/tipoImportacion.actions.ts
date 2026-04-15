'use server'

import CONFIG from '@/config';
import { TipoImportacion } from '@/lib/types/tipoImportacion/tipoImportacion.entity';
import { getToken } from '@/lib/utils/getToken';

export async function getTiposImportacion(): Promise<TipoImportacion[]> {
    try {
        const token = await getToken();

        const tiposImportacion = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOIMPORTACION}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!tiposImportacion.ok) throw new Error(`Error getting tiposImportacion: ${tiposImportacion.status} - ${tiposImportacion.statusText}`);

        return await tiposImportacion.json();
    } catch (error) {
        console.error('Get tiposImportacion failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};