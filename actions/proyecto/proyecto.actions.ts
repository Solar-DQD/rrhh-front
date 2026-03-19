'use server'

import CONFIG from '@/config'
import { Proyecto } from '@/lib/types/proyecto/proyecto.entity'

export async function getProyectoById(params: { id: number }): Promise<Proyecto> {
    try {
        const proyecto = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_PROYECTO}/${params.id}`, {
            method: 'GET'
        });

        if (!proyecto.ok) {
            throw new Error(`Error getting proyecto with id ${params.id}: ${proyecto.status} - ${proyecto.statusText}`);
        };

        return await proyecto.json();
    } catch (error) {
        console.error('Get proyecto failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};