"use client";
import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
  return (
    <NextTopLoader
      color="#2299DD"
      crawl={true}
      crawlSpeed={300}
      easing="ease"
      height={3}
      initialPosition={0.01}
      shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      showAtBottom={false}
      showSpinner={false}
      speed={150}
      zIndex={999}
    />
  );
}