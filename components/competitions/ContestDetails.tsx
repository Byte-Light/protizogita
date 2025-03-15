"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface ContestData {
  id: string;
  title: string;
  description: string;
  rules: string;
  prizeAmount: number;
  submissionDeadline: string;
  coverImageName?: string | null;
  attachmentName?: string | null;
  createdAt: any;
  // Additional fields for demo purposes
  organizer?: string;
  location?: string;
  highlights?: string[];
}

const ContestDetails: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [contest, setContest] = useState<ContestData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchContest = async () => {
      setLoading(true);
      try {
        const contestDocRef = doc(db, "contests", id as string);
        const contestDoc = await getDoc(contestDocRef);
        if (contestDoc.exists()) {
          // Get contest data and remove any existing `id` field
          const data = contestDoc.data() as ContestData;
          const { id: existingId, ...dataWithoutId } = data;

          // Merge in additional dummy data for a richer UI
          const enrichedData = {
            organizer: "Cool Contest Org",
            location: "Online Global",
            highlights: [
              "Exciting prizes",
              "Expert judges",
              "Community driven",
              "Innovative challenges",
            ],
            ...dataWithoutId,
          };

          // Add the `id` from the document at the end so it won't be overwritten
          setContest({ ...enrichedData, id: contestDoc.id } as ContestData);
        } else {
          console.error("Contest not found");
        }
      } catch (error) {
        console.error("Error fetching contest details:", error);
      }
      setLoading(false);
    };

    fetchContest();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 text-lg text-gray-600">
          Loading contest details...
        </div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 text-lg text-gray-600">
          Contest not found.
        </div>
      </div>
    );
  }

  const postedDate = new Date(contest.createdAt.seconds * 1000);
  const deadlineDate = new Date(contest.submissionDeadline);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-10">
      <div className="container mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="mb-6 text-indigo-600 hover:underline"
        >
          &larr; Back
        </button>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {contest.coverImageName && (
            <div className="relative">
              <img
                src={`https://via.placeholder.com/1200x500?text=${encodeURIComponent(
                  contest.title
                )}`}
                alt={contest.title}
                className="w-full h-64 object-cover md:h-96"
              />
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {contest.title}
                </h1>
              </div>
            </div>
          )}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <span className="font-semibold">Prize:</span>{" "}
                  <span className="text-xl text-green-600">
                    ${contest.prizeAmount}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Submission Deadline:</span>{" "}
                  {deadlineDate.toLocaleDateString()}{" "}
                  {deadlineDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Posted on:</span>{" "}
                  {postedDate.toLocaleString()}
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Organizer:</span>{" "}
                  {contest.organizer || "N/A"}
                </div>
                <div className="mb-4">
                  <span className="font-semibold">Location:</span>{" "}
                  {contest.location || "N/A"}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow hover:bg-indigo-500 transition duration-300">
                  Join Now
                </button>
              </div>
            </div>
            <hr className="my-6 border-gray-200" />
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {contest.description}
                <br />
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Quisque at dolor vel sapien tempor facilisis. Donec vehicula,
                nisi at fermentum fermentum, ligula arcu placerat nisi, ut
                maximus nisi dolor ac velit. Suspendisse potenti. Curabitur
                elementum, orci nec lobortis elementum, elit magna commodo purus,
                a sollicitudin lorem nulla at urna.
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Rules
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {contest.rules}
                <br />
                <br />
                1. All participants must register before the deadline.
                <br />
                2. Use of external help is allowed, but plagiarism is strictly
                prohibited.
                <br />
                3. Decisions by the judges are final.
              </p>
            </div>
            {contest.highlights && contest.highlights.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Highlights
                </h2>
                <ul className="list-disc list-inside text-gray-700">
                  {contest.highlights.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
            {contest.attachmentName && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Attachment
                </h2>
                <a
                  href={`https://via.placeholder.com/attachment/${contest.attachmentName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  Download Attachment
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
