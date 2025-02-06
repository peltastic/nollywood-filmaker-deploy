import { Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { type LottieComponentProps } from 'lottie-react';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';

const LazyLottieComponent = lazy(() => import('lottie-react'));

interface LottieProps<T extends Record<string, unknown>> {
  getJson: () => Promise<T>;
  id: string;
}

export function LazyLottie<T extends Record<string, unknown>>({
  getJson,
  id,
  ref,
  ...props
}: LottieProps<T> & Omit<LottieComponentProps, 'animationData'>) {
  const { data } = useQuery({
    queryKey: [id],
    queryFn: getJson,
    enabled: typeof window !== 'undefined',
  });

  if (!data) return <Skeleton height={props.height} width={props.width} />;

  return (
    <Suspense fallback={<Skeleton height={props.height} width={props.width} />}>
      <LazyLottieComponent animationData={data} {...props} />
    </Suspense>
  );
}