"use client";
import exp from "constants";
import { ReactNode, useEffect, useState } from "react";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  /* Wait till Next.js rehydration completes */
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return <>{isHydrated ? <> {children} </> : <div>Loading...</div>}</>;
}
