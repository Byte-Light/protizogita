// src/components/competitions/ContestList.tsx
"use client";
import React, { useEffect, useState, useRef } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, orderBy, getDocs, limit as firebaseLimit, startAfter } from "firebase/firestore";
import ContestCard from './ContestCard';

export interface ContestData {
  id: string;
  title: string;
  description: string;
  rules: string;
  prizeAmount: number;
  submissionDeadline: string;
  coverImageName?: string | null;
  attachmentName?: string | null;
  createdAt: any;
}

interface ContestListProps {
  limit?: number;
}

const DEFAULT_PAGE_SIZE = 6; // Default number of contests per page

const ContestList: React.FC<ContestListProps> = ({ limit }) => {
  const PAGE_SIZE = limit || DEFAULT_PAGE_SIZE;
  const [contests, setContests] = useState<ContestData[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Use a ref to prevent duplicate fetches (e.g., in StrictMode)
  const hasFetched = useRef(false);

  const fetchContests = async () => {
    setLoading(true);
    try {
      const contestsRef = collection(db, "contests");
      let q;
      if (lastVisible) {
        q = query(
          contestsRef,
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          firebaseLimit(PAGE_SIZE)
        );
      } else {
        q = query(
          contestsRef,
          orderBy("createdAt", "desc"),
          firebaseLimit(PAGE_SIZE)
        );
      }
      const querySnapshot = await getDocs(q);
      const newContests: ContestData[] = [];
      querySnapshot.forEach(doc => {
        newContests.push({ id: doc.id, ...doc.data() } as ContestData);
      });
      if (newContests.length < PAGE_SIZE) {
        setHasMore(false);
      }
      if (querySnapshot.docs.length > 0) {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
      if (!lastVisible) {
        setContests(newContests);
      } else {
        setContests(prev => [...prev, ...newContests]);
      }
    } catch (error) {
      console.error("Error fetching contests:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchContests();
      hasFetched.current = true;
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
        Contests
      </h2>
      <div className="space-y-6">
        {contests.map(contest => (
          <ContestCard key={contest.id} {...contest} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <button
              onClick={fetchContests}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Load More
            </button>
          )}
        </div>
      )}
      {!hasMore && (
        <p className="text-center text-gray-500 mt-8">No more contests</p>
      )}
    </div>
  );
};

export default ContestList;
