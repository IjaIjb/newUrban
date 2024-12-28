import Button from "../../button";

export default function CTA({
  text,
  type,
  onClick,
}: {
  text: string;
  type: "green" | "blue" | "red" | "gray";
  onClick: () => void;
}) {
  const styles = {
    green:
      "w-full text-primary bg-primary bg-opacity-20 hover:bg-primary hover:text-white",
    blue: "w-full bg-primary_blue text-primary_blue bg-opacity-20 hover:bg-primary_blue hover:text-white",
    red: "w-full bg-primary_red text-primary_red bg-opacity-20 hover:bg-primary_red hover:text-white",
    gray: "w-full bg-gray-500 text-gray-500 bg-opacity-20 hover:bg-gray-500 hover:text-white",
  };

  const style = styles[type] || "";

  return (
    <Button type="button" className={style} onClick={onClick}>
      {text}
    </Button>
  );
}
