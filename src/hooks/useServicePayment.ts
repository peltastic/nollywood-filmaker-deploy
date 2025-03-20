import { setFallbackRoute } from "@/lib/slices/routeSlice";
import { primary_socket } from "@/lib/socket";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useServicePayment = (
  isError: boolean,
  isSuccess: boolean,
  successRoute: string,
  close: () => void,
  url?: string,
  error?: any,
  reloadWindow?: boolean
) => {
  const [paymentStatus, setPaymentStatus] = useState<
    "initialized" | "pending" | "completed"
  >("initialized");
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      close();
      nprogress.complete();
      notify(
        "error",
        "Error",
        (error as any).data?.message || "An Error Occured"
      );
    }
    if (isSuccess) {
      close();
      setPaymentStatus("pending");
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (paymentStatus === "pending") {
      primary_socket.on(
        "completed",
        (data: {
          transaction: {
            status: "completed";
          };
        }) => {
          if (data.transaction.status === "completed") {
            nprogress.complete();
            dispatch(setFallbackRoute(null));
            if (reloadWindow) {
              window.location.reload();
            } else {
              router.push(successRoute);
            }
          }
        }
      );
      return () => {
        primary_socket.off("completed");
      };
    }
  }, [paymentStatus]);

  return {
    paymentStatus,
  };
};
