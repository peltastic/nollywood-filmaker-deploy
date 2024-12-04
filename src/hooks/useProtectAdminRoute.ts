import { setAdminFallbackRoute } from "@/lib/slices/admin/routeSlice";
import { RootState } from "@/lib/store";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useProtectAdmin = () => {
  const authStatus = useSelector(
    (state: RootState) => state.persistedState.adminAuth.status
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const logoutType = useSelector(
    (state: RootState) => state.persistedState.adminLogout.logoutType
  );

  useEffect(() => {
    if (authStatus === "LOGGED_OUT" && logoutType === "expired") {
      dispatch(setAdminFallbackRoute(pathname));
      notify("message", "Your session has expired", "Please Log In");
      nprogress.complete();
      router.push("/admin/auth/login");
    }
  }, [authStatus]);

  useEffect(() => {
    if (authStatus === "LOGGED_OUT") {
      dispatch(setAdminFallbackRoute(pathname));
      notify("message", "Your session has expired", "Please Log In");
      nprogress.complete();
      router.push("/admin/auth/login");
    }
  }, []);

  return null
};
