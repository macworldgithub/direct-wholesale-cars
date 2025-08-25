"use client";

import React from "react";
import { LoaderContainer } from "@/components/UIComponents/LoaderContainer/LoaderContainer";
import ChatWidget from "./ChatWidget/ChatWidget";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const LayoutClientWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);
  const wholesaler = useSelector(
    (state: RootState) => state.SigninWholesaler.wholesaler
  );
  const user = dealer || wholesaler;
  const userId = user?._id;
  return (
    <>
      <LoaderContainer />
      {children}
      {userId && <ChatWidget />}
    </>
  );
};
