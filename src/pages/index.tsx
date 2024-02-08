import { candidatesData } from "@/common/candidates-mock";
import { useCallback, useState } from "react";

interface WorkHistoryInterface {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
}

interface CandidateInterface {
  firstName: string;
  lastName: string;
  location: string;
  workHistory: WorkHistoryInterface[];
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [candidates, setCandidates] = useState<CandidateInterface[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<
    CandidateInterface[]
  >([]);

  const debounce = (callback: Function, delay: number) => {
    // type it
    let timer: any;

    return function (...args: any) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const getData = (query: string): Promise<CandidateInterface[]> =>
    new Promise((reslove) => {
      setTimeout(() => {
        const filteredData = candidatesData.filter((candidate) => {
          const fullName = `${candidate.firstName} ${candidate.lastName}`;

          return fullName.toLowerCase().includes(query.toLowerCase());
        });

        reslove(filteredData);
      }, 250);
    });

  const debouncedGetData = useCallback(
    debounce(async (query: string) => {
      const data = await getData(query);

      console.log(query);

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
    setSelectedCandidates((prevCandidates) => [...prevCandidates, candidate]);

    setCandidates([]);
    setQuery("");
  };

  // const calculateDurationAndSort = (workHistories: WorkHistoryInterface[]) => {
  //   const reducedWorkHistory = workHistories.reduce((acc, history) => {
  //     const start = new Date(history.startDate);
  //     const end = new Date(history.endDate);
  //     const duration = end.getDate() - start.getDate();
  //   }, []);
  // };

  return (
    <main className={`w-full p-16`}>
      <div className={`mb-10`}>
        <input
          onChange={(e) => handleChange(e.currentTarget.value)}
          value={query}
          className={`bg-gray-500 w-full`}
          type="text"
        />

        <div>
          {!!candidates?.length &&
            candidates.map((candidate, index) => (
              <div
                onClick={() => handleAddCandidate(candidate)}
                key={index}
              >{`${candidate.firstName} ${candidate.lastName}`}</div>
            ))}
        </div>
      </div>

      <div>
        <h3>Selected Candidates</h3>

        <div>
          {!!selectedCandidates?.length &&
            selectedCandidates.map((candidate, index) => (
              <div key={index}>
                <h2>{`${candidate.firstName} ${candidate.lastName}`}</h2>
                <h3>{candidate.location}</h3>
                <div>
                  {candidate.workHistory.map((history, index) => (
                    <div key={index}>
                      <p>{history.title}</p>
                      <p>{history.company}</p>
                      <p>{history.company}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
