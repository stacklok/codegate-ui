import { formatDistanceToNow } from "date-fns";

export const formatTime = (date: Date) => {
  return formatDistanceToNow(date, {
    addSuffix: true,
  });
};
