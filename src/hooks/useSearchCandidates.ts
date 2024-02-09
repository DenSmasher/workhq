import { useCallback, useState } from "react";
import { CandidateInterface, WorkHistoryInterface } from "../common/interfaces";
import { debounce } from "../common/utils/debounce";
import { candidatesData } from "../common/candidates-mock";

export const useSearchCandidates = () => {
  const [query, setQuery] = useState("");
  const [candidates, setCandidates] = useState<CandidateInterface[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<
    CandidateInterface[]
  >([]);

  const getData = (query: string): Promise<CandidateInterface[]> =>
    new Promise((reslove) => {
      setTimeout(() => {
        const queryLowerCase = query.toLowerCase();

        const filteredData = candidatesData.filter((candidate) => {
          const fullName =
            `${candidate.firstName} ${candidate.lastName}`.toLowerCase();

          return fullName.includes(queryLowerCase);
        });

        reslove(filteredData);
      }, 250);
    });

  const debouncedGetData = useCallback(
    debounce(async (query: string) => {
      const data = await getData(query);

      const filteredData = data.filter(
        (candidate) => !selectedCandidates.includes(candidate)
      );

      setCandidates(filteredData);
    }, 150),
    [selectedCandidates]
  );

  const handleChange = (query: string) => {
    setQuery(query);

    if (!!query) {
      debouncedGetData(query);
    } else {
      setCandidates([]);
    }
  };

  const handleAddCandidate = (candidate: CandidateInterface) => {
    setSelectedCandidates((prevCandidates) => [candidate, ...prevCandidates]);

    setCandidates([]);
    setQuery("");
  };

  const handleDeleteCandidate = (candidate: CandidateInterface) => {
    setSelectedCandidates((prevCandidates) =>
      prevCandidates.filter((prevCandidate) => prevCandidate !== candidate)
    );
  };

  return {
    handleChange,
    candidates,
    handleAddCandidate,
    selectedCandidates,
    query,
    handleDeleteCandidate,
  };
};
