import { auth } from "@/auth";
import { getProyectos } from "@/lib/actions/proyecto/proyecto.actions";
import AdministrativoInicio from "@/lib/components/administrativo/inicio";
import PageWrapper from "@/lib/components/common/wrappers/pageWrapper";
import { redirect } from "next/navigation";

export default async function AdministrativoInicioPage() {
    const session = await auth();
    if (!session) redirect('/');

    const proyectos = await getProyectos();
    let id_proyecto: number = 0;

    if (proyectos) id_proyecto = proyectos.find(proyecto => proyecto.nombre === session?.user.proyecto)?.id ?? 0;    

    return (
        <PageWrapper title={`Hola, ${session?.user.name}`} subtitle={`Hoy en ${session?.user.proyecto}:`}>
            <AdministrativoInicio proyecto={id_proyecto} />
        </PageWrapper>
    );
};