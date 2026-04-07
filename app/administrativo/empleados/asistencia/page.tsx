import { auth } from "@/auth";
import Asistencia from "@/components/administrativo/asistencia";
import PageWrapper from "@/components/common/wrappers/pageWrapper";
import { redirect } from "next/navigation";

export default async function AdministrativoEmpleadosPage() {
    const session = await auth();
    if (!session) redirect('/');

    return (
        <PageWrapper title='Asistencia'>
            <Asistencia />
        </PageWrapper>
    );
};