"use client";

import React from "react";
import { LoaderContainer } from "@/components/UIComponents/LoaderContainer/LoaderContainer";

export const LayoutClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LoaderContainer />
      {children}
    </>
  );
};
