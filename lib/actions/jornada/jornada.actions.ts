'use server'

import CONFIG from '@/config';
import { JornadasImportacionResponseDto } from '@/lib/types/jornada/get-jornada-importacion';
import { getToken } from "@/lib/utils/getToken";

export async function getJornadasByImportacion(params: {
    id_importacion: number,
    page: number,
    limit: number
}): Promise<JornadasImportacionResponseDto> {
    try {
        const token = await getToken();

        const jornadasURLParams = new URLSearchParams({
            page: params.page.toString(),
            limit: params.limit.toString()
        });

        const jornadas = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_IMPORTACION}/${params.id_importacion}/jornada?${jornadasURLParams}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!jornadas.ok) throw new Error(`Error fetching jornadas: ${jornadas.status} - ${jornadas.statusText}`);

        return await jornadas.json();
    } catch (error) {
        console.error('Fetch jornadas failed: ', {
            id_importacion: params.id_importacion,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function editJornada(params: {
    id: number,
    entrada: string,
    salida: string
}): Promise<void> {
    try {
        const token = await getToken();

        if (params.entrada === '' || params.salida === '') throw new Error(`Error editing jornada with id ${params.id}: Params missing`);

        const respuesta = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA}/${params.id}/editar`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                entrada: params.entrada,
                salida: params.salida
            })
        });

        if (!respuesta.ok) throw new Error(`Error editing jornada with id ${params.id}: ${respuesta.status} - ${respuesta.statusText}`);

        return await respuesta.json()
    } catch (error) {
        console.error('Edit jornada failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function deleteJornada(params: {
    id: number,

}): Promise<void> {
    try {
        const token = await getToken();

        const respuesta = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA}/${params.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!respuesta.ok) throw new Error(`Error deleting jornada with id ${params.id}: ${respuesta.status} - ${respuesta.statusText}`);

        return await respuesta.json();
    } catch (error) {
        console.error('Delete jornada failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function editJornadaTipoAusencia(params: {
    id: number,
    id_tipoausencia: number | ''
}) {
    try {
        const token = await getToken();

        const respuesta = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA}/${params.id}/justificar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                id_tipoausencia: params.id_tipoausencia
            }),
        });

        if (!respuesta.ok) throw new Error(`Error editing jornada with id ${params.id}: ${respuesta.status} - ${respuesta.statusText}`);

        return await respuesta.json();
    } catch (error) {
        console.error('Edit jornada tipoAusencia failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};

export async function validateJornada(params: {
    id: number
}) {
    try {
        const token = await getToken();

        const respuesta = await fetch(`${CONFIG.URL_BASE}${CONFIG.URL_JORNADA}/${params.id}/validar`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!respuesta.ok) throw new Error(`Error validating jornada with id ${params.id}: ${respuesta.status} - ${respuesta.statusText}`);

        return await respuesta.json();
    } catch (error) {
        console.error('Validate jornada failed: ', {
            id: params.id,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
        });

        throw error;
    };
};