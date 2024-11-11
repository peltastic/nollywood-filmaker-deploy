import { setFallbackRoute } from "@/lib/slices/routeSlice";
import { RootState } from "@/lib/store";
import { notify } from "@/utils/notification";
import { getCookie } from "@/utils/storage";
import { nprogress } from "@mantine/nprogress";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
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
    const refresh = getCookie("refresh");
    if (authStatus === "LOGGED_OUT" && logoutType === "expired") {
      dispatch(setFallbackRoute(pathame));
      notify("error", "Session Expired", "Please Login in");
      nprogress.complete();
      router.push("/auth/login");
    }
  }, [authStatus]);

  return null;
};
