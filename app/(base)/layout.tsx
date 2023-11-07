import { getCurrentUser } from "@/lib/actions/user";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { UserContextsProviders } from "@/components/providers/user-context-providers";

interface Props {
  children: React.ReactNode;
}

export default async function BaseLayout({ children }: Props) {
  const user = await getCurrentUser();

  return (
    <UserContextsProviders>
      <div className="flex min-h-screen flex-col">
        <SiteHeader user={user} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </UserContextsProviders>
  );
}
