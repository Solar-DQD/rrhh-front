'use server'

import CONFIG from '@/config';
import { getToken } from "@/lib/utils/getToken";

export async function createObservacion(params: {
    id_jornada: number,
    observacion: string
}): Promise<void> {
    try {
        const token = await getToken();

        const respuesta = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA}/${params.id_jornada}/observacion`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                texto: params.observacion
            }),
        });

        if (!respuesta.ok) throw new Error(`Error creating observacion: ${respuesta.status} - ${respuesta.statusText}`);

        return await respuesta.json();
    } catch (error) {
        console.error('Create observacion failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function deleteObservacion(params: {
    id: number
}): Promise<void> {
    try {
        const token = await getToken();

        const respuesta = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_OBSERVACION}/${params.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!respuesta.ok) throw new Error(`Error deleting observacion with id ${params.id}: ${respuesta.status} - ${respuesta.statusText}`);

        return await respuesta.json();
    } catch (error) {
        console.error('Delete observacion failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};