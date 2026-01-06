import PostGrid from "@/app/(post)/components/PostGrid";
import ProfileHero from "@/components/ProfileHero";
import TabProfileSection from "@/components/TabProfileSection";

export default async function AuthorHome({
  params,
}: {
  params: { username: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const { username } = resolvedParams;

  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="w-full max-w-2xl space-y-4">
        <ProfileHero username={username} />
        <TabProfileSection />
      </div>
      <PostGrid isPrivate={true} username={username} />
    </section>
  );
}
