import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ComponentCardProps {
  title: string;
  src: string;
  href: string;
}

export default function ComponentCard({
  title,
  src,
  href,
}: ComponentCardProps) {
  return (
    <div className="box text-center scale-hover-1">
      <Link href={href} className="text-decoration-none text-dark">
        <h2>{title}</h2>
        <Image
          src={src}
          alt="Placeholder"
          width={400}
          height={400}
          className="img-fluid rounded"
        />
      </Link>
    </div>
  );
}
