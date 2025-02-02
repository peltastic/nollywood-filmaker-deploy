"use client"
import { notify } from "@/utils/notification";
import React, { useEffect } from "react";

type Props = {};

const TestReconnect = (props: Props) => {
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        notify("message", "Your connection got lost, refreshing chat");
      }
    });
  }, []);

  return <div>TestReconnect</div>;
};

export default TestReconnect;
