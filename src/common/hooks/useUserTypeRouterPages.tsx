import { useRouter as useNextRouter } from "next/router";
import { useSelector } from "react-redux";

const useUserTypeRouterPages = () => {
  const nextRouter = useNextRouter();
  const userType = useSelector((a: any) => a?.authUser?.userAuthType);

  const pathname =
    userType === "parkOwner"
      ? "owner"
      : userType === "parkManager"
      ? "manager"
      : userType === "dispatchOfficer"
      ? "dispatch"
      : "";

  const pushWithUserTypePrefix = (
    path: string,
    { as, options }: { as?: string; options?: any } = {}
  ) => {
    const userTypePath = `/${pathname}/${path}`;
    nextRouter.push(
      {
        pathname: userTypePath,
        query: options,
      },
      as
    );
  };

  const goBack = () => {
    nextRouter.back();
  };

  const query = nextRouter.query;

  return { pushWithUserTypePrefix, goBack, query };
};

export default useUserTypeRouterPages;
