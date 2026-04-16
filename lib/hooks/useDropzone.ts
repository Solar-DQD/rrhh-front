import { useState, useCallback } from 'react';
import { FileRejection, useDropzone as useReactDropzone } from 'react-dropzone';

export const useDropzone = () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        setError(null);

        if (rejectedFiles.length > 0) {
            setError('Solo se permiten archivos Excel (.xlsx, .xls)');
            return;
        }

        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useReactDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls']
        },
        maxFiles: 1,
        multiple: false
    });

    const deleteFile = () => {
        setFile(null);
        setError(null);
    };

    return {
        file,
        error,
        isDragActive,
        deleteFile,
        getRootProps,
        getInputProps
    };
};