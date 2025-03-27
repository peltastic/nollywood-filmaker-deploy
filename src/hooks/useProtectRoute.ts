import { setConsultantFallbackRoute } from "@/lib/slices/consultants/routeSlice";
import { setFallbackRoute } from "@/lib/slices/routeSlice";
import { RootState } from "@/lib/store";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useProtectRoute = () => {
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.auth.status
  );
  const logoutType = useSelector(
    (state: RootState) => state.persistedState.logout.logoutType
  );

  const pathame = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (authStatus === "LOGGED_OUT" && logoutType === "expired") {
      dispatch(setFallbackRoute(pathame));
      notify("message", "Your session has expired", "Please Log In");
      nprogress.complete();
      router.push("/auth/login");
    }
  }, [authStatus]);

  useEffect(() => {
    if (authStatus === "LOGGED_OUT") {
      dispatch(setFallbackRoute(pathame));
      notify("message", "Your session has expired", "Please Log In");
      nprogress.complete();
      router.push("/auth/login");
    } else {
    }
  }, []);

  return null;
};
