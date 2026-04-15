'use server'

import CONFIG from '@/config';
import { TipoJornada } from '@/lib/types/tipoJornada/tipoJornada.entity';
import { getToken } from '@/lib/utils/getToken';

export async function getTiposJornada(): Promise<TipoJornada[]> {
    try {
        const token = await getToken();

        const tiposJornada = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_TIPOJORNADA}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!tiposJornada.ok) throw new Error(`Error getting tiposJornada: ${tiposJornada.status} - ${tiposJornada.statusText}`);

        return await tiposJornada.json();
    } catch (error) {
        console.error('Get tiposJornada failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};