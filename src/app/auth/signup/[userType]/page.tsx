import ParkOwner from "./(pages)/park-owner";
import ParkManager from "./(pages)/park-manager";
import DispatchOfficer from "./(pages)/dispatch-officer";

const renderPage = (type: string) => {
  switch (type) {
    case "park-owner":
      return <ParkOwner />;
    case "park-manager":
      return <ParkManager />;
    case "dispatch-officer":
      return <DispatchOfficer />;
    default:
      return <ParkOwner />;
  }
};

export default function Page({ params, searchParams }: any) {
  return <div>{renderPage(params.userType)}</div>;
}
