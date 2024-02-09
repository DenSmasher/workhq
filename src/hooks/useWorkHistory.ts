import { useMemo } from "react";
import { WorkHistoryInterface } from "../common/interfaces";

import dayjs from "dayjs";

export const useWorkHistory = (workHistory: WorkHistoryInterface[]) => {
  const extendedAndSortedWorkHistory = useMemo(
    () =>
      workHistory
        .map((history: WorkHistoryInterface) => {
          const startDate = dayjs(history.startDate);
          const endDate = dayjs(history.endDate);
          const duration =
            Math.round(endDate.diff(startDate, "year", true) * 10) / 10;

          return { ...history, duration };
        })
        .sort((a, b) => b.duration - a.duration),
    [workHistory]
  );

  const totalExperience = Math.round(
    extendedAndSortedWorkHistory.reduce(
      (acc, history) => (!!history?.duration ? acc + history.duration : acc),
      0
    )
  );

  return {
    extendedAndSortedWorkHistory,
    totalExperience,
  };
};
