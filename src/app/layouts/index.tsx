"use client";
import { selectUserType } from "@/redux/selectors/authSelectors";
import { useAppSelector } from "@/redux/store";
import { usePathname } from "next/navigation";
import AuthLayout from "./auth.layout";
import RootLayout from "./home.layout";

const activeLink = (
  routePath: string,
  currentPath: string,
  userType: string,
  exact?: boolean
): boolean => {
  const userTypePrefix = userType ? `/${userType}` : "";

  // Construct the full route path including the user type prefix
  const fullRoutePath = `${routePath}`;

  // if (exact) {
  //   // For exact matching, the paths must be exactly the same
  //   return currentPath === fullRoutePath;
  // } else {
  //   // For non-exact matching, the current path should start with the full route path
  const regex = new RegExp(`^${fullRoutePath}`);
  return regex.test(currentPath);
  //   }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const userType = useAppSelector(selectUserType)!;

  const userTypePathname =
    userType === "parkOwner"
      ? "owner"
      : userType === "parkManager"
      ? "manager"
      : userType === "dispatchOfficer" && "dispatch";

  return (
    <>
      {activeLink("/auth", pathname!, userTypePathname as string) ? (
        <AuthLayout> {children}</AuthLayout>
      ) : (
        <RootLayout>{children}</RootLayout>
      )}
    </>
  );
}
