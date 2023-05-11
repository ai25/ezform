import { Input, Button, Spin, Empty } from "antd";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { type UnsplashSearchResponse } from "~/types/unsplash";
import { api } from "~/utils/api";

const UnsplashSearch: React.FC<{
    onSelect: (image: UnsplashSearchResponse["results"][0]) => void;
}> = ({ onSelect }) => {
    const [query, setQuery] = useState("cat");
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const { data, fetchNextPage, isLoading, isError, isFetching } = api.unsplash.search.useInfiniteQuery(
        { query: debouncedQuery, per_page: 40 },
        {
            enabled: !!debouncedQuery,
            getNextPageParam: lastPage => lastPage.nextPage,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry(failureCount, error) {
                return failureCount < 3 && error.data?.code !== "NOT_FOUND";
            },
        },
    );

    useEffect(() => {
        const debouncer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 1000);
        return () => {
            clearTimeout(debouncer);
        };
    }, [query]);
    const lastElementRef = React.useRef<HTMLDivElement>(null);

    const photos = React.useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(page => (page as UnsplashSearchResponse).results);
    }, [data]);

    useEffect(() => {
        if (!lastElementRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0]?.isIntersecting) {
                    fetchNextPage(); //eslint-disable-line @typescript-eslint/no-floating-promises
                }
            },
            { threshold: 1 },
        );

        observer.observe(lastElementRef.current);

        return () => {
            observer.disconnect();
        };
    }, [lastElementRef, fetchNextPage, photos]);

    const isLastPage = data?.pages[data.pages.length - 1]?.nextPage === null;

    return (
        <div className="relative flex min-h-[20rem] flex-col">
            <div className="mb-2 flex">
                <Input
                    className="mr-2"
                    placeholder="Search Unsplash"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </div>
            <div className="grid h-full max-h-[20rem] w-full grid-cols-2 gap-2 overflow-y-auto px-2 sm:grid-cols-4">
                {photos?.map((img, index) => {
                    const isLastElement = index === photos.length - 1;
                    return (
                        <div
                            ref={isLastElement ? lastElementRef : null}
                            key={`${img.id}-${index}`}
                            className="group relative aspect-square h-full w-full"
                        >
                            <Image
                                unoptimized
                                alt={img.description || "Unsplash Image"}
                                className="relative h-full w-full object-cover"
                                key={img.id}
                                src={img.urls.thumb}
                                width={img.width / 10}
                                height={img.height / 10}
                            />
                            <div className="absolute bottom-0 left-0 hidden h-full w-full items-center justify-center bg-black bg-opacity-50 group-hover:flex">
                                <Button onClick={() => onSelect(img)} type="primary">
                                    Select
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {isFetching && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Spin className="mt-2" size="large" tip="Loading..." />
                </div>
            )}
            {isLastPage && <Empty />}
        </div>
    );
};

export default UnsplashSearch;
