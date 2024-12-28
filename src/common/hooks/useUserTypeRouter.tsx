import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const useUserTypeRouter = () => {
  const router = useRouter();
  const userType = useSelector((a: any) => a?.authUser?.userAuthType);

  const pathname =
    userType === "parkOwner"
      ? "owner"
      : userType === "parkManager"
      ? "manager"
      : userType === "dispatchOfficer" && "dispatch";

  const pushWithUserTypePrefix = (path: string) => {
    const userTypePath = `/${pathname}/${path}`;
    router.push(userTypePath);
  };

  const goBack = () => {
    router.back();
  };

  return { pushWithUserTypePrefix, goBack, pathname };
};

export default useUserTypeRouter;
