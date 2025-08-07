"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader } from "../Loader/Loader";

export const LoaderContainer = () => {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prevPath && prevPath !== pathname) {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 1000); 
      return () => clearTimeout(timeout);
    }
    setPrevPath(pathname);
  }, [pathname]);

  return loading ? <Loader /> : null;
};
