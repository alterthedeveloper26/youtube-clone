"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { CarouselSkeleton } from "@/components/skeletons/carousel-skeleton";
import { CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { QUERY_KEYS } from "@/constants/query-keys.constant";
import { getCategories } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface CategoriesSectionProps {
  selectedCategoryId?: string;
}

const CategoriesContent = ({ selectedCategoryId }: CategoriesSectionProps) => {
  const router = useRouter();

  const { data, isLoading } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORIES],
    queryFn: getCategories,
  });

  if (!data || data.length === 0) {
    return null;
  }

  const onSelect = (val: string | null) => {
    const url = new URL(window.location.href);

    if (val) {
      url.searchParams.set("categoryId", val);
    } else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  };

  return (
    <FilterCarousel
      isLoading={isLoading}
      data={data.map((cate) => ({
        label: cate.name,
        value: cate.id,
      }))}
      value={selectedCategoryId}
      onSelect={onSelect}
    />
  );
};

export const CategoriesSection = ({
  selectedCategoryId,
}: CategoriesSectionProps) => {
  return (
    <ErrorBoundary fallback={<p>Error loading categories</p>}>
      <Suspense fallback={<CarouselSkeleton />}>
        <CategoriesContent selectedCategoryId={selectedCategoryId} />
      </Suspense>
    </ErrorBoundary>
  );
};
