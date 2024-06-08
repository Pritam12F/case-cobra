"use client";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Phone } from "./Phone";

const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
];

//Returns an array of arrays, if no of elements is not divisble by no. of columns the extra elements are added to one extra array
function splitArray<T>(array: Array<T>, columns: number) {
  const result: Array<Array<T>> = [];
  const perCol = Math.floor(array.length / columns);
  for (let i = 0; i < array.length; i = i + perCol) {
    const temp = [];
    for (let j = i; j < i + perCol; ++j) {
      if (!array[j]) break;

      temp.push(array[j]);
    }
    result.push(temp);
  }
  return result;
}

const ReviewColumn = ({
  reviews,
  className,
  reviewClassName,
  msToPixel,
}: {
  reviews: string[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msToPixel: number;
}) => {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState<number>(0);
  const duration = `${msToPixel * columnHeight}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const colObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    colObserver.observe(columnRef.current);

    return () => {
      colObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => {
        return (
          <Review
            key={reviewIndex}
            className={reviewClassName?.(reviewIndex % reviews.length)}
            imgSrc={imgSrc}
          />
        );
      })}
    </div>
  );
};

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

const Review = ({ imgSrc, className, ...props }: ReviewProps) => {
  const POSSIBLE_DELAYS = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"];

  const animationDelay =
    POSSIBLE_DELAYS[Math.floor(Math.random() * POSSIBLE_DELAYS.length)];

  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <Phone imgSrc={imgSrc} />
    </div>
  );
};

const ReviewGrid = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });
  const cols = splitArray(PHONES, 3);
  const column1 = cols[0];
  const column2 = cols[1];
  const column3 = splitArray(cols[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {inView ? (
        <>
          <ReviewColumn
            reviews={[...column1, ...column2, ...column3.flat()]}
            msToPixel={10}
            reviewClassName={(reviewIndex) =>
              cn({
                "md:hidden": reviewIndex >= column1.length + column3[0].length,
                "lg:hidden": reviewIndex >= column1.length,
              })
            }
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            msToPixel={15}
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? "lg:hidden" : ""
            }
          />
          <ReviewColumn
            reviews={column3.flat()}
            msToPixel={10}
            className="hidden md:block"
          />
        </>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
    </div>
  );
};
export const Reviews = () => {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <img
        aria-hidden="true"
        src="/what-people-are-buying.png"
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />
      <ReviewGrid />
    </MaxWidthWrapper>
  );
};
