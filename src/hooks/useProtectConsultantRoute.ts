import { setConsultantFallbackRoute } from "@/lib/slices/consultants/routeSlice";
import { RootState } from "@/lib/store";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useProtectRouteConsultantRoute = () => {
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.consultantAuth.status
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const logoutType = useSelector(
    (state: RootState) => state.persistedState.consultantLogout.logoutType
  );

  useEffect(() => {
    if (authStatus === "LOGGED_OUT" && logoutType === "expired") {
      dispatch(setConsultantFallbackRoute(pathname));
      notify("message", "Your session has expired", "Please Log In");
      nprogress.complete();
      router.push("/consultants/auth/login");
    }
  }, [authStatus]);

  useEffect(() => {
    if (authStatus === "LOGGED_OUT") {
      dispatch(setConsultantFallbackRoute(pathname));
      notify("message", "Your session has expired", "Please Log In");
      nprogress.complete();
      router.push("/consultants/auth/login");
    }
  }, []);

  return null;
};
