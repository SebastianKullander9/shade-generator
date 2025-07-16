import { requireUser } from "../(protected)/auth";

export default async function ProjectsLayout({ children }: { children: React.ReactNode }) {
    await requireUser();
    return <>{children}</>;
}