import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  numOfItems: number;
  icon: LucideIcon;
  variant?: "default" | "success";
};
const InfoCard = ({ label, numOfItems, icon: Icon, variant }: Props) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant ?? "default"} icon={Icon} />
      <div>
        <p className="font-medium ">{label}</p>
        <p className="text-gray-500 text-sm">
          {numOfItems} {numOfItems == 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
