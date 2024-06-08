"use client";
import { useRef } from "react";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { useInView } from "framer-motion";

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

const ReviewGrid = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });
  const cols = splitArray(PHONES, 3);
  const column1 = cols[0];
  const column2 = cols[1];
  const column3 = cols[2];

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {inView ? (
        <>
          <ReviewColumn />
        </>
      ) : null}
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
    </MaxWidthWrapper>
  );
};
