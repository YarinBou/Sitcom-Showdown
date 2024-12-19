import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import HighScoreCard from '../components/HighScoreCard';
import RandomGif from '../components/RandomGif';

export default function ResultsPage() {
  const router = useRouter();
  const { score, total } = router.query;
  const [user, setUser] = useState(null);
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchHighScores(currentUser.email);
      } else {
        router.push('/'); // Redirect if not authenticated
      }
    });
  }, [router]);

  const fetchHighScores = async (email) => {
    const db = getFirestore();
    const scoresRef = collection(db, 'scores');
    const q = query(scoresRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    const scores = querySnapshot.docs.map((doc) => doc.data());
    setHighScores(scores);
  };

  const deleteAllScores = async () => {
    if (!user) return;

    const confirmDelete = confirm('Are you sure you want to delete all your past results?');
    if (!confirmDelete) return;

    const db = getFirestore();
    const scoresRef = collection(db, 'scores');
    const q = query(scoresRef, where('email', '==', user.email));
    const querySnapshot = await getDocs(q);

    for (const docSnapshot of querySnapshot.docs) {
      await deleteDoc(doc(db, 'scores', docSnapshot.id));
    }

    alert('All game history has been deleted.');
    setHighScores([]); // Clear the high scores locally
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen py-10 px-5">
        <h1 className="text-4xl font-extrabold text-white mb-6">Results</h1>
        {user ? (
          <div className="w-full max-w-3xl text-center">
            <p className="text-xl text-white mt-4">
              <span className="font-bold">Player:</span> {user.displayName}
            </p>
            <p className="text-xl text-white mt-2">
              <span className="font-bold">Your Score:</span> {score} / {total}
            </p>
            <h2 className="text-3xl font-bold text-yellow-300 mt-8">Your High Scores</h2>
            <ul className="w-full mt-6 space-y-4">
              {highScores.length > 0 ? (
                highScores.map((highScore, index) => (
                  <HighScoreCard key={index} highScore={highScore} />
                ))
              ) : (
                <div className="flex flex-col items-center">
                  <p className="text-lg text-white">No high scores yet. Start playing to set your record!</p>
                  <RandomGif />
                </div>
              )}
            </ul>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-md font-semibold hover:scale-105 transition transform"
              >
                Play Again
              </button>
              <button
                onClick={deleteAllScores}
                className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-md font-semibold hover:scale-105 transition transform"
              >
                Delete All Game History
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xl text-white">Loading...</p>
        )}
      </div>
    </>
  );
}
