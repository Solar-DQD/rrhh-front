'use server'

import CONFIG from '@/config';
import { Mes } from '@/lib/types/mes/mes.entity';
import { getToken } from '@/lib/utils/getToken';

export async function getMeses(): Promise<Mes[]> {
    try {
        const token = await getToken();

        const meses = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_MES}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!meses.ok) throw new Error(`Error getting meses: ${meses.status} - ${meses.statusText}`);

        return await meses.json();
    } catch (error) {
        console.error('Get meses failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};