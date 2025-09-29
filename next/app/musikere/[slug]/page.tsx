import React from "react";

export default function page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Musician: {params.slug}</h1>
    </div>
  );
}
