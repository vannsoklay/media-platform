import { DetailProvider } from "./components/DetailProvider";

export default async function PostDetail({
  params,
}: {
  params: { permalink: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const { permalink } = resolvedParams;

  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full">
      <DetailProvider permalink={permalink} />
    </section>
  );
}
