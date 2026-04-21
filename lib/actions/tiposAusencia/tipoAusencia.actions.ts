'use server'

import CONFIG from '@/config';
import { TipoAusencia } from '@/lib/types/tipoAusencia/tipoAusencia.entity';
import { getToken } from '@/lib/utils/getToken';

export async function getTiposAusencia(): Promise<TipoAusencia[]> {
    try {
        const token = await getToken();

        const tiposAusencia = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOAUSENCIA}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!tiposAusencia.ok) throw new Error(`Error getting tiposAusencia: ${tiposAusencia.status} - ${tiposAusencia.statusText}`);

        return await tiposAusencia.json();
    } catch (error) {
        console.error('Get tiposAusencia failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};