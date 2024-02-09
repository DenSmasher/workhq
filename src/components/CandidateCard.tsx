import Image from "next/image";

import { CandidateInterface } from "../common/interfaces";
import { useWorkHistory } from "../hooks/useWorkHistory";

export const CandidateCard = ({
  candidate,
  handleDeleteCandidate,
}: {
  candidate: CandidateInterface;
  handleDeleteCandidate: (candidate: CandidateInterface) => void;
}) => {
  const { extendedAndSortedWorkHistory, totalExperience } = useWorkHistory(
    candidate.workHistory
  );

  return (
    <div className={`border border-gray-300 rounded bg-white mb-3`}>
      <div className="p-3 border-b border-gray-300 text-end">
        <button onClick={() => handleDeleteCandidate(candidate)}>
          <Image src="/assets/close.svg" alt="close" width={20} height={20} />
        </button>
      </div>
      <div className="py-3 px-4 w-full flex justify-between direction-row">
        <div className="flex justify-between">
          <Image
            src="/assets/candidate.png"
            alt="candidate"
            width={62}
            height={62}
          />

          <div className="flex flex-col pl-2">
            <span
              className={`text-base	font-bold pb-1`}
            >{`${candidate.firstName} ${candidate.lastName}`}</span>

            <div className="flex">
              <Image
                src="/assets/location.svg"
                alt="candidate"
                width={16}
                height={16}
                className="mr-1"
              />

              <span className="text-gray-600 text-sm font-medium">
                {candidate.location}
              </span>
            </div>
          </div>
        </div>

        <div className="w-24 py-2 px-3 text-center bg-gray-50 border border-gray-300 rounded">
          <span className="text-xs font-semibold">Experiance</span>

          <div>
            <span className="text-xl font-bold mr-1">{totalExperience}</span>
            <span className="text-xs">years</span>
          </div>
        </div>
      </div>

      <div className={`px-3 pb-3`}>
        <span className="flex items-center pb-2 whitespace-nowrap text-xs w-full text-gray-600 font-semibold after:content-[''] after:border-t after:w-full after:ml-2">
          Work History · {extendedAndSortedWorkHistory.length}
        </span>

        {extendedAndSortedWorkHistory.map((history, index) => (
          <div className="flex items-center" key={index}>
            <Image
              src="/assets/company.svg"
              alt="logo"
              width={20}
              height={20}
              className="mr-2"
            />

            <span className="text-sm mr-1">{`${history.company} · ${history.title}`}</span>

            <div>
              {history.duration > 1 && (
                <span className="text-xs mr-1 text-gray-500 font-semibold">
                  {Math.floor(history.duration)} yrs
                </span>
              )}
              {history.duration % 1 != 0 && (
                <span className="text-xs text-gray-500 font-semibold">
                  {`${history.duration}`.split(".")[1]} mos
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
