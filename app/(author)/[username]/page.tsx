import PostList from "@/app/(post)/components/PostList";

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
        Author Posts for {username}
        <PostList author={username} />
      </div>
    </section>
  );
}
