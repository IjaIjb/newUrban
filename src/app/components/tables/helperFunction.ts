import { format } from "date-fns";

export const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export const formatDate = (dateobj: any) => {
  const dateObject = new Date(dateobj);
  const formattedDate = format(dateObject, "dd MMM yyyy");
  return formattedDate;
};
export const formatDateTime = (dateobj: any) => {
  const dateObject = new Date(dateobj);
  const formattedDate = format(dateObject, "hh:mm a");
  return formattedDate;
};
export const getCurrentDate = () => {
  var options = { hour12: true };
  let today = new Date();
  let time = new Date().toLocaleTimeString("en-US", options);
  let date =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);
  const obj = {
    date,
    time,
  };
  return obj;
};

// enum Status {
//   Scheduled = "scheduled",
//   InProgress = "in_progress",
//   Assigned = "assigned",
//   Completed = "completed",
//   Canceled = "canceled",
// }

export const getStatusClass = (statusText: string) => {
  switch (statusText) {
    case (statusText = "scheduled"):
      return "blue";
    case (statusText = "in_progress"):
      return "orange";
    case (statusText = "canceled"):
      return "red";
    case (statusText = "active"):
      return "green";
    case (statusText = "approved"):
      return "green";
    case (statusText = "completed"):
      return "green";
    case (statusText = "disabled"):
      return "red";
    case (statusText = "rejected"):
      return "red";
    case (statusText = "inactive"):
      return "red";
    case (statusText = "assigned"):
      return "green";

    case (statusText = "unassigned"):
      return "grey";
    case (statusText = "init"):
      return "grey";
    case (statusText = "pending"):
      return "grey";
    case (statusText = "dispatched"):
      return "green";
    case (statusText = "in-delivery"):
      return "yellow";

    case (statusText = "processing"):
      return "yellow";

    case (statusText = "canceled"):
      return "lightred";
    case (statusText = "accepted"):
      return "lightgreen";
    case (statusText = "success"):
      return "lightgreen";
    case (statusText = "rejected"):
      return "red";
    case (statusText = "delivered"):
      return "cyan";
    default:
      return statusText;
  }
};
export const getBytes = (x: any) => {
  const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let l = 0,
    n = parseInt(x, 10) || 0;
  while (n >= 1024 && ++l) {
    n = n / 1024;
  }
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
};

export const sumTotal = (arr: any) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

export const getEditLocationData = (Location: Function) => {
  const location = Location();
  if (location.state) {
    const { pageAction, row } = location?.state;
    const IsEdit = pageAction === "edit" ? true : false;
    return { row, IsEdit };
  } else {
    return { row: {}, IsEdit: false };
  }
};
export const getPackageType = (type: string) => {
  if (type == "pre_paid") {
    return "Pre Paid";
  } else {
    return "Post Paid";
  }
};
export const getLogisticType = (type: string) => {
  if (type == "intra_city") {
    return "Intra City";
  }
  if (type == "inter_city") {
    return "Inter City";
  } else {
    return "---";
  }
};

export const tableSearch = (
  searchTerm: any,
  originalList: any[],
  copiedList: any[],
  keysToSearch: any[],
  setNewList: Function
) => {
  if (originalList instanceof Array && keysToSearch instanceof Array) {
    const filteredData = originalList.filter((item: any) => {
      return keysToSearch.some((key) => {
        const value = item[key as keyof any];
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
    });
    if (searchTerm == "") {
      setNewList(copiedList);
    } else {
      if (filteredData.length == 0) {
        setNewList(filteredData);
        return;
      } else {
        setNewList(filteredData);
      }
    }
  }
};
