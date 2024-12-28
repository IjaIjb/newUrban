import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config"; // Fix the path

const fullConfig: any = resolveConfig(tailwindConfig);

export const useCurrentBreakpoint = (): string => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("");

  const getBreakpointValue = (value: string): number =>
    +fullConfig.theme.screens[value].slice(
      0,
      fullConfig.theme.screens[value].indexOf("px")
    );

  useEffect(() => {
    const handleResize = (): void => {
      let biggestBreakpointValue = 0;
      let matchingBreakpoint: string | undefined;
      for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
        const breakpointValue = getBreakpointValue(breakpoint);
        if (
          breakpointValue > biggestBreakpointValue &&
          window.innerWidth >= breakpointValue
        ) {
          biggestBreakpointValue = breakpointValue;
          matchingBreakpoint = breakpoint;
        }
      }
      if (matchingBreakpoint) {
        setCurrentBreakpoint(matchingBreakpoint);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return currentBreakpoint;
};
