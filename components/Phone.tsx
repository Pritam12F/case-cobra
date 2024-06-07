import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

export const Phone = ({ imgSrc, dark, ...props }: PhoneProps) => {
  return (
    <div
      className={cn("relative pointer-events-none z-50 overflow-hidden")}
      {...props}
    >
      <img
        src={dark ? "/phone-template-dark-edges" : "phone-template-white-edges"}
        className="pointer-events-none z-50 select-none"
        alt="phone image"
      />

      <div className="absolute -z-10 inset-0">
        <img
          src={imgSrc}
          className="object-cover"
          alt="overlaying phone image"
        />
      </div>
    </div>
  );
};
