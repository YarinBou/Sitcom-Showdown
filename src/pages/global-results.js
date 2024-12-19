import { useEffect, useState } from 'react';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import HighScoreCard from '../components/HighScoreCard';

export default function GlobalResultsPage() {
  const [globalScores, setGlobalScores] = useState([]);

  useEffect(() => {
    const fetchGlobalScores = async () => {
      const db = getFirestore();
      const scoresRef = collection(db, 'scores');
      const q = query(scoresRef, orderBy('score', 'desc'), limit(5)); // Top 5 results
      const querySnapshot = await getDocs(q);

      const scores = querySnapshot.docs.map((doc) => doc.data());
      setGlobalScores(scores);
    };

    fetchGlobalScores();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen py-10 px-5">
        <h1 className="text-4xl font-extrabold text-white mb-6">Top 5 Scores</h1>
        <ul className="w-full max-w-lg mt-6 space-y-4">
          {globalScores.length > 0 ? (
            globalScores.map((highScore, index) => (
              <HighScoreCard key={index} highScore={highScore} rank={index} />
            ))
          ) : (
            <p className="text-lg text-white">No global scores available yet.</p>
          )}
        </ul>
      </div>
    </>
  );
}
