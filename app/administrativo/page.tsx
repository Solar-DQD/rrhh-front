import { auth } from "@/auth";
import AdministrativoInicio from "@/components/administrativo/inicio";
import PageWrapper from "@/components/common/wrappers/pageWrapper";
import { redirect } from "next/navigation";

export default async function AdministrativoInicioPage() {
    const session = await auth();
    if (!session) redirect('/');

    return (
        <PageWrapper title={`Hola, ${session?.user.name}`} subtitle={`Hoy en ${session?.user.proyecto}:`}>
            <AdministrativoInicio />
        </PageWrapper>
    );
};