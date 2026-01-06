import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

export const CarouselSkeleton = () => {
  return (
    <Carousel className="w-full px-12">
      <CarouselContent className="-ml-3">
        {Array.from({ length: 14 }).map((_, index) => (
          <CarouselItem key={index} className="pl-3 basis-auto">
            <Skeleton className="rounded-lg px-3 py-1 h-full text-sm w-[100px] font-semibold">
              &nbsp;
            </Skeleton>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
