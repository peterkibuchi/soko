import { redirect } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { db, eq, schema } from "~/server/db";

interface SetupLayoutProps {
  children: React.ReactNode;
}

export default async function SetupLayout({ children }: SetupLayoutProps) {
  const { userId } = useAuth();

  if (!userId) {
    redirect("/login");
  }

  const store = await db.query.stores.findFirst({
    where: eq(schema.stores.userId, userId),
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <div>{children}</div>;
}
