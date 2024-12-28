import { formatISO } from "date-fns";

// export function activeLink(path: string, pathname: string) {
//   const regex = new RegExp(`^${path}(\/.*)?$`);
//   return regex.test(pathname);
// }

export function GenerateID(prefix: string) {
  const randomDigits = Array(8)
    .fill(0)
    .map((e, i) => (e = (Math.random() * 10) | 0));
  return prefix + randomDigits.join("");
}

export function classifyDate(date1: string, date2: string) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-indexed, so adding 1
  const day = today.getDate();

  console.log(date1, date2, "date one and two");
  let day1 = Number(date1.split("-")[2]);
  let day2 = Number(date2.split("-")[2]);

  let month1 = Number(date1.split("-")[1]);
  let month2 = Number(date2.split("-")[1]);

  let y1 = Number(date1.split("-")[0]);
  let y2 = Number(date2.split("-")[0]);

  //Today
  if (day1 === day2 && month1 === month2 && y1 === y2) {
    return "Today";
  } else if (day1 - day2 === 1 && month1 === month2 && y1 === y2) {
    return "Yesterday";
  } else if (
    day2 > day1 &&
    day2 <= day1 + 7 &&
    month1 === month2 &&
    y1 === y2
  ) {
    return "Current Week";
  } else if (
    day2 < day1 - 1 &&
    day2 >= day1 - 7 &&
    month1 === month2 &&
    y1 === y2
  ) {
    return "Previous Week";
  } else if (
    month1 === month2 &&
    y1 === y2 &&
    month1 === month &&
    month2 === month
  ) {
    return "Current Month";
  } else if (
    (month1 > month2 && y1 === y2) ||
    (month1 < month && month2 < month)
  ) {
    return "Previous Month";
  }
  console.log(month1, month, "test");
}
export function convertCamelCaseToNormal(camelCaseString: string): string {
  return camelCaseString
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .toLowerCase();
}

// // Encryption function
// export function encrypt(text: any) {
//   const secretKey = "vsnjei39HRINBIu4minnj5n5k94u47vio3j";
//   const iv = randomBytes(16);
//   const cipher = createCipheriv("aes-256-cbc", Buffer.from(secretKey), iv);
//   let encrypted = cipher.update(text, "utf8", "hex");
//   encrypted += cipher.final("hex");
//   return iv.toString("hex") + encrypted;
// }

// // Decryption function
// export function decrypt(encryptedText: any) {
//   const secretKey = "vsnjei39HRINBIu4minnj5n5k94u47vio3j";
//   const iv = Buffer.from(encryptedText.slice(0, 32), "hex");
//   const encrypted = encryptedText.slice(32);
//   const decipher = createDecipheriv("aes-256-cbc", Buffer.from(secretKey), iv);
//   let decrypted = decipher.update(encrypted, "hex", "utf8");
//   decrypted += decipher.final("utf8");
//   return decrypted;
// }

export function encodeDecodeBase64(
  input: string,
  action: "encode" | "decode"
): string {
  if (action === "encode") {
    const base64String = btoa(input);
    return base64String;
  } else if (action === "decode") {
    try {
      const decodedString = atob(input);
      return decodedString;
    } catch (error) {
      return "Invalid base64 input";
    }
  } else {
    throw new Error('Invalid action. Use "encode" or "decode".');
  }
}

function toIntlCurrency(amount: string): string {
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    throw new Error("Invalid amount. Please provide a valid numeric amount.");
  }

  try {
    const formattedCurrency = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      currencyDisplay: "symbol",
    }).format(numericAmount);
    return formattedCurrency;
  } catch (error) {
    throw new Error("Invalid currency or locales provided.");
  }
}

export function convertCurrency(amount: number) {
  const numericAmount = amount.toString().replace(/[₦R]/g, "");
  return toIntlCurrency(numericAmount);
}

/**
 * @deprecated This function is deprecated and will be removed in future versions.
 * Use `moment for date formatting` instead.
 */
export function convertDateFormat(dateString: string) {
  // Split the input date string by "/"
  const parts = dateString.split("/");

  // Extract the day, month, and year from the parts
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  // Manually construct the new date string in "YYYY-MM-DD" format
  const newDateString = `${year}-${("0" + month).slice(-2)}-${("0" + day).slice(
    -2
  )}`;

  return newDateString;
}

export const activeLink = (
  routePath: string,
  currentPath: string,
  userType: string,
  exact?: boolean
): boolean => {
  const userTypePrefix = userType ? `/${userType}` : "";

  // Remove the user type prefix from the current path
  const mainPath = currentPath.startsWith(userTypePrefix)
    ? currentPath.slice(userTypePrefix.length)
    : currentPath;

  // Remove leading slash for consistent comparison
  const cleanRoutePath = routePath.startsWith("/")
    ? routePath.slice(1)
    : routePath;
  const cleanMainPath = mainPath.startsWith("/") ? mainPath.slice(1) : mainPath;

  console.log("🚀 ~ cleanRoutePath:", cleanRoutePath);

  // Split paths into segments
  const routeSegments = cleanRoutePath.split("/");
  const mainSegments = cleanMainPath.split("/");

  // Check if routeSegments exist in the beginning of mainSegments
  if (exact) {
    // Exact match: segments must be the same length and identical
    return (
      routeSegments.length === mainSegments.length &&
      routeSegments.every((seg, idx) => seg === mainSegments[idx])
    );
  } else {
    // Non-exact match: check if routeSegments match the start of mainSegments
    return routeSegments.every((seg, idx) => seg === mainSegments[idx]);
  }
};

// Function to format the date to ISO format
export const formatDateToISO = (dateString: string) => {
  const date = new Date(dateString);
  return formatISO(date, { representation: "complete" });
};
