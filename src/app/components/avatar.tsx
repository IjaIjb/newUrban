import React from "react";

export default function Avatar({ body }: { body: string | React.ReactNode }) {
  return (
    <div className="bg-primary rounded-full h-10 w-10 flex items-center justify-center ">
      <p className="text-white">{body}</p>
    </div>
  );
}
