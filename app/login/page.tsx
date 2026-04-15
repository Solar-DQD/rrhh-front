'use client'

import PageWrapper from "@/lib/components/common/wrappers/pageWrapper"
import LoginForm from "@/lib/components/login";

export default function LoginPage() {
    return (
        <PageWrapper title='Iniciar Sesión' titlePos='mid'>
            <LoginForm />
        </PageWrapper>
    );
};