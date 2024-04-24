import { redirect } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";

import { MainNav } from "~/components/main-nav";
import { StoreSwitcher } from "~/components/store-switcher";
import { ThemeToggle } from "~/components/theme-toggle";
import { db, eq, schema } from "~/server/db";

export async function Navbar() {
  const { userId } = useAuth();

  if (!userId) {
    redirect("/login");
  }

  const stores = await db.query.stores.findMany({
    where: eq(schema.stores.userId, userId),
  });

  const formattedStoreItems = stores.map((store) => ({
    id: store.id,
    label: store.name,
  }));

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher storeItems={formattedStoreItems} />
        <MainNav className="mx-6" storeItems={formattedStoreItems} />

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
