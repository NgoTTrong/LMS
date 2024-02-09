import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumberWithCommas } from "@/lib/functions";

type Props = {
  label: string;
  value: number;
  shouldFormat?: boolean;
};

const DataCard = ({ label, value, shouldFormat }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {shouldFormat ? formatNumberWithCommas(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
