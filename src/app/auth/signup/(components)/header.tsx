"use client";
import { ArrowLeftIcon } from "@heroicons/react/outline";

export default function Header({
  heading,
  desc,
  step,
}: {
  heading: string;
  desc?: string;
  step?: number;
}) {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div>
      <div className="flex justify-between">
        <button onClick={handleGoBack} className="flex items-center">
          {/* <Link href={routes.LOGIN.path} className='flex items-center'> */}
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
        </button>
        {step && (
          <div className="flex items-center">
            <p className="mr-3">Step {step}</p>
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < step ? "bg-accent" : "bg-primary_light"
                }`}
                style={{ marginLeft: index === 0 ? 0 : 6 }}
              ></div>
            ))}
          </div>
        )}
        {/* <div className='flex items-center'>
					<p className=''>Step {step}</p>
					<div className={`w-3 h-3 rounded-full bg-primary`}></div>
					<div className={`w-3 h-3 rounded-full bg-primary_light`}></div>
				</div> */}
      </div>
      <div className="mt-[65px]">
        <h1 className="text-dark mt-2 font-bold text-3xl">{heading}</h1>
        <p className="text-dark text-xl font-thin">{desc}</p>
      </div>
    </div>
  );
}
