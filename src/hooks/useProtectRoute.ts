import { setConsultantFallbackRoute } from "@/lib/slices/consultants/routeSlice";
import { setFallbackRoute } from "@/lib/slices/routeSlice";
import { RootState } from "@/lib/store";
import { notify } from "@/utils/notification";
import { getCookie } from "@/utils/storage";
import { nprogress } from "@mantine/nprogress";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useProtectRoute = (type?: "consultant" | "admin") => {
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.auth.status
  );
  const consultantAuthStatus = useSelector(
    (state: RootState) => state.persistedState.consultantAuth.status
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
      notify("error", "Session Expired", "Please Login in");
      nprogress.complete();
      router.push("/auth/login");
    }
  }, [authStatus]);

  useEffect(() => {
    if (consultantAuthStatus === "LOGGED_OUT" && type === "consultant") {
      dispatch(setConsultantFallbackRoute(pathame))
      notify("error", "Session Expired", "Please Login in")
      nprogress.complete()
      router.push("/consultants/auth/login")
    }
  }, [consultantAuthStatus]);

  return null;
};
