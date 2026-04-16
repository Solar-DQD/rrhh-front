import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { LoginFormData } from "../types/loginFormData";
import { ControlledTextField } from "../../common/inputs/controlledTextField";

export default function LoginFormInputs({ control }: { control: Control<LoginFormData> }) {
    return (
        <div className='flex flex-col w-full gap-3 sm:gap-4'>
            <ControlledTextField
                control={control}
                name='email'
                label='Correo Electrónico'
                rules={{ required: 'Debe ingresar un correo' }}
                type='email'
            />
            <ControlledTextField
                control={control}
                name='password'
                label='Contraseña'
                rules={{ required: 'Debe ingresar una contraseña' }}
                type='password'
            />
        </div>
    );
};