import { signInWithGoogle } from '../../firebase';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import RandomGif from '../components/RandomGif';

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/'); // Redirect to the Home Page after successful login
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen px-4 py-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-white mb-6">Sitcom Showdown</h1>
          <p className="text-lg text-white max-w-2xl mx-auto mb-8">
            Welcome to <span className="font-bold">Sitcom Showdown</span>, the ultimate test of your sitcom knowledge! 
            Sign in to play, track your scores, and relive the best moments from your favorite shows.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center max-w-sm w-full">
          <button
            onClick={handleSignIn}
            className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white px-8 py-3 rounded-full shadow-lg text-lg font-medium hover:scale-105 hover:brightness-110 transform transition focus:outline-none mb-4"
            aria-label="Sign In with Google"
          >
            Sign In with Google
          </button>
          <p className="text-sm text-gray-500 text-center">
            Ready to show off your sitcom knowledge? Click the button to start playing!
          </p>
        </div>
        <div className="mt-10">
          <RandomGif /> {/* Render a random GIF */}
        </div>
      </div>
    </>
  );
}
