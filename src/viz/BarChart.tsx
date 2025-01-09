import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllIssues } from "@/lib/utils";
import { Alert } from "@/types";

export function BarChart({
  data,
  loading,
}: {
  loading: boolean;
  data: Alert[];
}) {
  const { maxCount, sortedTagCounts } = getAllIssues(data);

  if (loading) {
    return (
      <Card className="h-full" data-testid="security-issues-barchart">
        <CardHeader>
          <CardTitle>Security issues detected</CardTitle>
        </CardHeader>
        <CardContent>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-around mb-4"
            >
              <Skeleton key={index} className="w-full h-3" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (sortedTagCounts.length === 0) {
    return (
      <Card className="h-full" data-testid="security-issues-barchart">
        <CardHeader>
          <CardTitle>Security issues detected</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center h-2/3">
          <div className="bg-gray-100 w-full flex items-center justify-center h-full font-bold text-lg">
            N/A
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full" data-testid="security-issues-barchart">
      <CardHeader>
        <CardTitle>Security issues detected</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[270px] overflow-y-auto">
          {sortedTagCounts.map(([tag, count], index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="w-2/4 text-sm font-medium text-gray-700 truncate">
                {tag}
              </span>
              <div className="flex-1 h-4 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-lg"
                  style={{
                    width: `${(count / maxCount) * 100}%`,
                  }}
                ></div>
              </div>
              <span
                className="text-sm font-medium text-gray-700"
                data-testid={`${tag}-count`}
              >
                {count}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
