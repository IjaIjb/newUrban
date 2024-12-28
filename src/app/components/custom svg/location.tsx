import React from "react";

const Location = ({
  color,
  size = "32",
}: {
  color?: string;
  size?: string;
}) => {
  return (
    <svg
      width="32"
      height="180"
      viewBox="0 0 32 389"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="15" fill="#036E03" />
      <circle cx="14.9998" cy="14.9988" r="8.07692" fill="white" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.407 388.865C19.8062 387.654 32 380.931 32 369.34C32 360.868 25.2843 354 17 354C8.71573 354 2 360.868 2 369.34C2 380.931 14.1938 387.654 16.593 388.865C16.8526 388.996 17.1474 388.996 17.407 388.865ZM17.0008 375.914C20.5512 375.914 23.4294 372.971 23.4294 369.34C23.4294 365.709 20.5512 362.766 17.0008 362.766C13.4504 362.766 10.5723 365.709 10.5723 369.34C10.5723 372.971 13.4504 375.914 17.0008 375.914Z"
        fill="#036E03"
      />
      <line
        x1="16"
        y1="38"
        x2="16"
        y2="353"
        stroke="#6CC56C"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="6 6"
      />
    </svg>
  );
};

export default Location;
