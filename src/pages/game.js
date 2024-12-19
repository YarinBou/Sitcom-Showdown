import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { auth, saveScore } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import RandomGif from '../components/RandomGif';

export default function GamePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [user, setUser] = useState(null);

  const { genre = '', difficulty = '', show = '', playerName = 'Guest', questions: encodedQuestions } = router.query;

  const calculateStrokeDasharray = (time) => {
    const total = 15; // Total timer duration
    const radius = 50; // Circle radius
    const circumference = 2 * Math.PI * radius;
    const dashArray = (time / total) * circumference;
    return `${dashArray} ${circumference}`;
  };

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
    if (encodedQuestions) {
      try {
        const parsedQuestions = JSON.parse(encodedQuestions);
        setQuestions(parsedQuestions);
      } catch (error) {
        console.error('Error parsing questions:', error);
        router.push('/');
      }
    }
  }, [encodedQuestions, router]);

  const shuffleOptions = useCallback(() => {
    const options = [...questions[currentQuestionIndex]?.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
  }, [questions, currentQuestionIndex]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(15);
    } else {
      setIsCompleted(true);
    }
  }, [currentQuestionIndex, questions.length]);

  useEffect(() => {
    if (questions.length > 0) {
      shuffleOptions();
    }
  }, [questions, currentQuestionIndex, shuffleOptions]);

  useEffect(() => {
    if (questions.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            handleNextQuestion();
            return 15;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [questions, currentQuestionIndex, handleNextQuestion]);

  useEffect(() => {
    if (isCompleted && user) {
      saveScore(user, score, {
        genre,
        difficulty,
        show,
        totalQuestions: questions.length,
      });
      router.push({ pathname: '/results', query: { score, total: questions.length } });
    }
  }, [isCompleted, user, router, score, questions.length, genre, difficulty, show]);

  if (questions.length === 0) {
    return <p className="text-center text-lg text-gray-500">Loading questions...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (option) => {
    if (!selectedAnswer) {
      setSelectedAnswer(option);
      if (option === currentQuestion?.answer) {
        setScore((prevScore) => prevScore + 1);
      }
      setTimeout(() => handleNextQuestion(), 1000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen py-10 px-5">
        <p className="text-lg text-white">
          Good Luck, <span className="font-semibold">{playerName}</span>!
        </p>
        <h2 className="text-2xl font-bold text-yellow-300 mt-4">Score: {score}</h2>
        <h2 className="text-xl font-semibold text-white mt-2">
          Question {currentQuestionIndex + 1} / {questions.length}
        </h2>
        <RandomGif showName={currentQuestion?.show} />
        <div className="relative mt-6">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle cx="50%" cy="50%" r="50" stroke="gray" strokeWidth="8" fill="none" />
            <circle
              cx="50%"
              cy="50%"
              r="50"
              stroke={timeLeft <= 5 ? 'red' : 'limegreen'}
              strokeWidth="8"
              fill="none"
              strokeDasharray={calculateStrokeDasharray(timeLeft)}
              style={{
                transition: 'stroke-dasharray 0.5s linear, stroke 0.5s linear',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xl font-bold text-white">{timeLeft}s</p>
          </div>
        </div>
        <p className="text-xl text-white mt-6 text-center max-w-2xl">{currentQuestion.question}</p>
        <div className="flex flex-wrap justify-center mt-8 gap-4">
          {shuffledOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`px-6 py-3 rounded-lg shadow-lg text-lg font-semibold transition-all focus:outline-none ${
                selectedAnswer
                  ? option === currentQuestion.answer
                    ? 'bg-green-500 text-white'
                    : option === selectedAnswer
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-300 text-black'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
