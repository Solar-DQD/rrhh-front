'use server'

import CONFIG from '@/config';
import { getToken } from "@/lib/utils/getToken";
import test from 'node:test';

export async function getImportacionCountByProyecto(): Promise<number> {
    try {
        const token = await getToken();

        const total = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACION}/count`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!total.ok) throw new Error(`Error getting total importaciones: ${total.status} - ${total.statusText}`);

        return await total.json();
    } catch (error) {
        console.error('Get importacion count failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    }
};