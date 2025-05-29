import PostList from "./components/PostList";
import PostProvider from "./components/PostProvider";

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="w-full max-w-2xl space-y-4">
        <h1 className="text-2xl font-bold">Feed Posts</h1>
        <PostProvider />
      </div>
    </section>
  );
}
