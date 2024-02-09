import Image from "next/image";

import { useSearchCandidates } from "@/hooks/useSearchCandidates";
import { CandidateCard } from "@/components/CandidateCard";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    handleChange,
    query,
    candidates,
    handleAddCandidate,
    selectedCandidates,
    handleDeleteCandidate,
  } = useSearchCandidates();

  return (
    <main className={`w-full ${inter.className}`}>
      <div className={`py-3 px-5`}>
        <Image
          src="/assets/logo.svg"
          alt="logo"
          width={109}
          height={34}
          priority
        />
      </div>

      <div>
        <div className={`py-4 px-5 border-y border-gray-300	`}>
          <p className={`pb-1 text-xs	font-semibold`}>Search</p>

          <div
            className={`relative before:content-[url('/assets/stars.svg')] before:absolute before:inset-1.5 before:w-7`}
          >
            <input
              onChange={(e) => handleChange(e.currentTarget.value)}
              value={query}
              className={`bg-no-repeat w-full p-2 pl-10 border rounded border-gray-300`}
              type="text"
              placeholder="Michael Jordan..."
            />
          </div>

          {!!candidates?.length && (
            <ul className={`absolute p-4 bg-white w-full`}>
              {candidates.map((candidate, index) => (
                <li
                  onClick={() => handleAddCandidate(candidate)}
                  key={index}
                  className={`p-2 cursor-pointer`}
                >{`${candidate.firstName} ${candidate.lastName}`}</li>
              ))}
            </ul>
          )}
        </div>

        <div className={`p-5 bg-gray-50 h-screen`}>
          {selectedCandidates.map((candidate, index) => (
            <CandidateCard
              key={index}
              candidate={candidate}
              handleDeleteCandidate={handleDeleteCandidate}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
