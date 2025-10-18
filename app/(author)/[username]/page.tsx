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
        {/* Author Posts for {username} */}
        {/* <UserProfile username={username} /> */}
        <ProfileHero username={username} />
        <TabProfileSection />

        {/* Navigation Tabs */}
        {/* <Card className="bg-background/60 backdrop-blur-md border-divider">
          <CardBody className="p-2">
            <Tabs
              aria-label="Profile sections"
              classNames={{
                tabList: "gap-0 w-full relative rounded-none p-0",
                cursor: "w-full bg-primary",
                tab: "max-w-fit px-6 h-10",
                tabContent:
                  "group-data-[selected=true]:text-primary-foreground",
              }}
              color="primary"
              variant="light"
            >
              <Tab key="posts" title="Posts" />
              <Tab key="media" title="Media" />
              <Tab key="likes" title="Likes" />
            </Tabs>
          </CardBody>
        </Card> */}
      </div>
      <PostGrid isPrivate={true} username={username} />
    </section>
  );
}
