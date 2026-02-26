import * as React from "react";
import { useEffect, useState } from "react";
import placeholder from "../../assets/AvatarPlaceholder.png";

type AvatarProps = {
  src: string;
  alt?: string;
  className?: string;
  fallbackSrc?: string;
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "",
  className = "h-full w-full object-cover bg-surface text-white",
}) => {
  const [failed, setFailed] = React.useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed || !src) {
    return (
      <div className={className} aria-hidden="true">
        <svg viewBox="0 0 64 64" className="h-full w-full ">
          <path
            fill="currentColor"
            d="M32 33.5c6 0 11-4.9 11-11s-5-11-11-11-11 4.9-11 11 5 11 11 11Zm0 5.5c-10.2 0-18.5 6.6-18.5 14.6V56h37V53.6C50.5 45.6 42.2 39 32 39Z"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className}`}
      onError={() => setFailed(true)}
    />
  );
};
