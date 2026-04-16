import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { FieldErrors } from "react-hook-form";
import { ImportFormData } from "../types/importFormData";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ImportarFormDropzone({
    getRootProps,
    getInputProps,
    isDragActive,
    deleteFile,
    file,
    errors
}: {
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T,
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T,
    isDragActive: boolean;
    deleteFile: () => void;
    file: File | null;
    errors: FieldErrors<ImportFormData>,
}) {
    return (
        <div className='flex items-center justify-start w-full gap-4'>
            <div
                {...getRootProps()}
                className={`border-1 border-solid rounded w-full p-12 text-center cursor-pointer transition-colors
                            ${isDragActive
                        ? 'border-orange-500 bg-orange-100'
                        : 'border-gray-300 hover:border-gray-900'
                    }
                            ${errors.file ? 'border-red-300 bg-red-100' : ''}
                        `}
            >
                <input {...getInputProps()} />
                {!file ? (
                    <div>
                        {isDragActive ? (
                            <p className='text-orange-500'>Suelta el archivo Excel aquí...</p>
                        ) : (
                            <>
                                <p className='text-gray-800 mb-2'>
                                    Clickea para subir o arrastra y suelta
                                </p>
                                <p className='text-sm text-gray-500'>
                                    Formatos soportados: .xlsx, .xls
                                </p>
                            </>
                        )}
                    </div>
                ) : (
                    <div className='flex items-center justify-between bg-green-50 p-3 rounded border border-green-200'>
                        <div className='flex items-center space-x-2'>
                            <div>
                                <p className='font-medium text-green-800'>{file.name}</p>
                                <p className='text-sm text-green-600'>
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteFile();
                            }}
                            color='error'
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                    </div>
                )}
            </div>
            {errors.file && (
                <p className='text-red-500 text-sm mt-2'>{errors.file.message}</p>
            )}
        </div>
    )
}