"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import FeedItem from "./feed-item";
import { Icons } from "../icons";
import { getFeed } from "@/src/utils/task/fetch";
import { Button } from "../ui/button";

export default function FeedList() {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feed"],
      queryFn: getFeed,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.tasks.length < 20) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      staleTime: 5 * 60 * 1000,
      refetchInterval: 5 * 60 * 1000,
    });

  const pages = data?.pages;

  return (
    <div>
      <div className="first-of-type:border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {pages && pages?.length > 0 ? (
          pages.map((page) => {
            return page.tasks?.map((task) => (
              <FeedItem key={task.id} {...task} />
            ));
          })
        ) : (
          <p className="text-center py-6 capitalize md:col-span-2 lg:col-span-3">
            nothing yet...
          </p>
        )}
      </div>
      <div className="flex justify-center items-center py-8 mt-6">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className={
            "bg-gradient capitalize disabled:bg-none disabled:text-foreground"
          }
        >
          {isFetchingNextPage ? (
            <Icons.smallLoader className="animate-spin" color="#0077e6" />
          ) : !hasNextPage ? (
            "."
          ) : (
            "load more"
          )}
        </Button>
      </div>
    </div>
  );
}
