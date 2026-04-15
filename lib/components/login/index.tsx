'use client'

import { useSnackbar } from "@/lib/contexts/snackbar";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "./types/loginFormData";
import { logIn } from "@/lib/actions/auth/auth.actions";
import LoginFormInputs from "./components/loginFormInputs";
import LoginFormButton from "./components/loginFormButton";
import { useForm } from "react-hook-form";

export default function LoginForm() {
    //init
    const router = useRouter();
    //hooks
    const { showError } = useSnackbar();
    const { control, handleSubmit, formState: { isValid } } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        }
    });
    //mutation
    const login = useMutation({
        mutationFn: (data: LoginFormData) => logIn(data),
        onSuccess: (result) => {
            if (result.success) {
                router.push('/');
            } else {
                showError(result.error);
            };
        }
    });
    return (
        <form onSubmit={handleSubmit((data) => login.mutate(data))} className='flex flex-col w-full max-w-[400px] gap-3 sm:gap-4'>
            <LoginFormInputs control={control} />
            <LoginFormButton isPending={login.isPending} isValid={isValid} />
        </form>
    );
};