import { useQuery } from "@tanstack/react-query";
import { serverApi } from "@/api/service";
import { AlertConversation } from "@/api/generated/types.gen";

const fetchAlerts = async (): Promise<AlertConversation[]> => {
  const { getAlertsDashboardAlertsGet } = await serverApi();
  const { data } = await getAlertsDashboardAlertsGet();

  if (!data) return [];

  return data
    .filter((alert): alert is AlertConversation => alert !== null)
    .filter((alert) => alert.trigger_category === "critical")
    .filter((alert) =>
      alert?.conversation.question_answers.every(
        (item) => item.answer && item.question,
      ),
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
};

export const useAlertsData = () => {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: fetchAlerts,
  });
};
