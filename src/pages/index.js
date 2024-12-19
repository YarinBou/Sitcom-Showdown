import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import RandomGif from '../components/RandomGif';
import Dropdown from '../components/Dropdown';
import { MdQuiz, MdPlayArrow } from 'react-icons/md';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [triviaOptions, setTriviaOptions] = useState({ genres: [], difficulties: [], shows: [] });
  const [genre, setGenre] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [show, setShow] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
    });
  }, [router]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch('/data/triviaQuestions.json');
        const allQuestions = await res.json();

        const genres = [...new Set(allQuestions.map((q) => q.genre))];
        const filteredQuestions = genre
          ? allQuestions.filter((q) => q.genre === genre)
          : allQuestions;

        const difficulties = [...new Set(filteredQuestions.map((q) => q.difficulty))];
        const shows = [...new Set(filteredQuestions.map((q) => q.show))];

        setTriviaOptions({ genres, difficulties, shows });

        if (!genre) setGenre(genres[0] || '');
        setDifficulty(difficulties[0] || '');
        setShow(shows[0] || '');
      } catch (error) {
        console.error('Error fetching trivia options:', error);
      }
    };

    fetchOptions();
  }, [genre]);

  const startGame = async () => {
    try {
      const res = await fetch('/data/triviaQuestions.json');
      const allQuestions = await res.json();

      const filteredQuestions = allQuestions.filter(
        (q) => q.genre === genre && q.difficulty === difficulty && q.show === show
      );

      const selectedQuestions = filteredQuestions.sort(() => Math.random() - 0.5).slice(0, 5);

      router.push({
        pathname: '/game',
        query: {
          questions: JSON.stringify(selectedQuestions),
          genre,
          difficulty,
          show,
          playerName: user.displayName,
        },
      });
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const startRandomQuiz = async () => {
    try {
      const res = await fetch('/data/triviaQuestions.json');
      const allQuestions = await res.json();

      const randomQuestions = allQuestions.sort(() => Math.random() - 0.5).slice(0, 25);

      router.push({
        pathname: '/game',
        query: {
          questions: JSON.stringify(randomQuestions),
          playerName: user.displayName,
          isRandomQuiz: true,
        },
      });
    } catch (error) {
      console.error('Error starting random quiz:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen px-4 py-8">
        {user ? (
          <div className="flex flex-col items-center space-y-8 w-full max-w-lg text-center">
            <p className="text-lg text-white">
              Welcome, <span className="font-semibold">{user.displayName}</span>
            </p>

            {/* Start Random Quiz Button */}
            <button
              onClick={startRandomQuiz}
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-4 rounded-full shadow-lg text-xl font-bold hover:scale-105 hover:brightness-110 transform transition focus:outline-none flex items-center justify-center w-full"
              aria-label="Start Random Quiz"
            >
              <MdQuiz className="text-2xl mr-2" />
              Start Random Quiz (25 Questions)
            </button>

            {/* Custom Challenge Section */}
            <p className="text-xl font-bold text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 px-6 py-3 rounded-lg shadow-md">
              Looking for a custom challenge?
            </p>

            <Dropdown
              label="Select Genre"
              options={triviaOptions.genres}
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <Dropdown
              label="Select Difficulty"
              options={triviaOptions.difficulties}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            />
            <Dropdown
              label="Select Show"
              options={triviaOptions.shows}
              value={show}
              onChange={(e) => setShow(e.target.value)}
            />

            {/* Start Specific Game Button */}
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white px-8 py-4 rounded-full shadow-lg text-xl font-bold hover:scale-105 hover:brightness-110 transform transition focus:outline-none flex items-center justify-center w-full"
              aria-label="Start Specific Game"
            >
              <MdPlayArrow className="text-2xl mr-2" />
              Start Specific Game
            </button>
          </div>
        ) : (
          <p className="text-lg text-white">
            Please <span className="font-semibold">sign in</span> to start playing!
          </p>
        )}
        <RandomGif />
      </div>
    </>
  );
}
