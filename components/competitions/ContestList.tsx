// src/components/ContestList.tsx
"use client"
import React, { useEffect, useState, useRef } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, orderBy, getDocs, limit, startAfter } from "firebase/firestore";
import ContestCard from './ContestCard';

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
}

const PAGE_SIZE = 6; // Number of contests per page

const ContestList: React.FC = () => {
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
        q = query(contestsRef, orderBy("createdAt", "desc"), startAfter(lastVisible), limit(PAGE_SIZE));
      } else {
        q = query(contestsRef, orderBy("createdAt", "desc"), limit(PAGE_SIZE));
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
      // Instead of appending, set the contests to the fetched ones if this is the initial load
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
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Contests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map(contest => (
          <ContestCard key={contest.id} {...contest} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : hasMore ? (
          <button 
            onClick={fetchContests} 
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Load More
          </button>
        ) : (
          <p>No more contests</p>
        )}
      </div>
    </div>
  );
};

export default ContestList;
