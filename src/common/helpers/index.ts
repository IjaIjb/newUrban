import classX from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args: any) => twMerge(classX(...args));

export function toIntlCurrency(amount: string | number): string {
  const numericAmount = parseFloat(amount?.toString());

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
