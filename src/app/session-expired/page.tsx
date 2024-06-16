"use client";
import React from "react";
import { useRouter } from "next/navigation";

function SessionExpired() {
  const router = useRouter();
  return (
    <div>
      <p>Session expired</p>
      <button
        onClick={() => {
          //   location.reload();
          router.replace("/");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }}
      >
        reload
      </button>
    </div>
  );
}

export default SessionExpired;
