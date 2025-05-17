import Loading from "@/components/loading";
import React from "react";

export default function Page() {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <main className="flex-grow-1 d-flex">
        <Loading />
      </main>
    </div>
  );
}
