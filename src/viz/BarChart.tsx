import { AlertConversation } from "@/api/generated/types.gen";
import { Card, CardBody, CardHeader, CardTitle } from "@stacklok/ui-kit-mono";
import { Skeleton } from "@stacklok/ui-kit-mono";
import { getAllIssues } from "@/lib/utils";

export function BarChart({
  data,
  loading,
}: {
  loading: boolean;
  data: AlertConversation[];
}) {
  const { maxCount, sortedTagCounts } = getAllIssues(data);

  if (loading) {
    return (
      <Card className="h-full" data-testid="security-issues-barchart">
        <CardHeader>
          <CardTitle>Security issues detected</CardTitle>
        </CardHeader>
        <CardBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-around mb-4"
            >
              <Skeleton key={index} className="w-full h-3" />
            </div>
          ))}
        </CardBody>
      </Card>
    );
  }

  if (sortedTagCounts.length === 0) {
    return (
      <Card className="h-full" data-testid="security-issues-barchart">
        <CardHeader className="shrink-0">
          <CardTitle>Security issues detected</CardTitle>
        </CardHeader>
        <CardBody className="flex items-center h-2/3">
          <div className="bg-gray-100 size-full flex items-center justify-center font-bold text-lg">
            N/A
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="h-full" data-testid="security-issues-barchart">
        <CardHeader className="shrink-0">
        <CardTitle>Security issues detected</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="space-y-3 max-h-[270px] overflow-y-auto">
          {sortedTagCounts.map(([tag, count], index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="w-2/4 text-sm font-medium text-secondary truncate">
                {tag}
              </span>
              <div className="flex-1 h-4 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-brand-700 rounded-lg"
                  style={{
                    width: `${(count / maxCount) * 100}%`,
                  }}
                ></div>
              </div>
              <span
                className="text-sm font-medium text-secondary"
                data-testid={`${tag}-count`}
              >
                {count}
              </span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
