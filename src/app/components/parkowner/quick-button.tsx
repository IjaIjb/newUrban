import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";

export default function QuickAction({
  title,
  icon,
  path,
  iconClassName,
}: {
  title: string;
  iconClassName: string;
  path: string;
  icon: any;
}) {
  const { pushWithUserTypePrefix, pathname } = useUserTypeRouter();

  return (
    <span
      onClick={() => pushWithUserTypePrefix(path)}
      className="h-[143px] cursor-pointer shadow flex flex-col items-center justify-center"
    >
      <div className={` text-white rounded-full p-3 mb-2 ${iconClassName}`}>
        {icon}
      </div>
      {title}
    </span>
  );
}
