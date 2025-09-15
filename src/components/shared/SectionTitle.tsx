import React from "react";

export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-14">
      <div className="flex gap-9 items-center text-red-500 mb-5">
        <div className="w-4 h-10 bg-red-500 rounded-sm"></div>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <p className="text-4xl font-semibold">{subtitle}</p>
    </div>
  );
}
