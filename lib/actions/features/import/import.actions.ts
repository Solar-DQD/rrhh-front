'use server';

import CONFIG from '@/config';
import { getToken } from '@/lib/utils/getToken';

export async function importProsoft(params: {
    file: File;
    id_proyecto: number | '';
    id_tipojornada: number | '';
}) {
    try {
        const token = await getToken();

        const formData = new FormData();

        formData.append('file', params.file);
        formData.append('id_proyecto', params.id_proyecto.toString());
        formData.append('id_tipojornada', params.id_tipojornada.toString());

        const respuesta = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTAR}/prosoft`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!respuesta.ok) throw new Error(`Error importing prosoft Excel report: ${respuesta.status} - ${respuesta.statusText}`);

        return await respuesta.json();
    } catch (error) {
        console.error('Import prosoft failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function importHikVision(params: {
    fecha: string;
    id_proyecto: number | '';
    id_tipojornada: number | '';
}) {
    try {
        const token = await getToken();

        const respuesta = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTAR}/hikvision`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_tipojornada: params.id_tipojornada,
                fecha: params.fecha,
                id_proyecto: params.id_proyecto
            })
        });

        if (!respuesta.ok) throw new Error(`Error importing HikVision report: ${respuesta.status} - ${respuesta.statusText}`);

        return await respuesta.json();
    } catch (error) {
        console.error('Import hikvision failed: ', {
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};