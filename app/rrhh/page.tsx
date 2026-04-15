import { auth } from "@/auth";
import PageWrapper from "@/lib/components/common/wrappers/pageWrapper";
import { redirect } from "next/navigation";

export default async function RRHHInicioPage() {
    const session = await auth();

    if (!session) {
        redirect('/');
    };
    return(
        <PageWrapper title={`Hola, ${session?.user.name}`}>
        </PageWrapper>
    );
};