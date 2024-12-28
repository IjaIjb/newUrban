export default function InfoCard({
  title,
  num,
  icon,
}: {
  title: string;
  num: number;
  icon: any;
}) {
  return (
    <div className="w-full h-[199px] rounded-xl px-[59px] pt-10 shadow">
      <div className="flex items-center">
        <div className="bg-primary w-8 h-8 rounded-full mr-2 flex justify-center items-center">
          {icon()}
        </div>
        <p>{title}</p>
      </div>
      <p className="font-bold text-5xl mt-6">{num ?? 0}</p>
    </div>
  );
}
