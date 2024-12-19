import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, signInWithGoogle, logout } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Navbar({ playerName }) {
  const [isOpen, setIsOpen] = useState(false); // State for the burger menu
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleSignIn = async () => {
    await signInWithGoogle();
    router.push('/');
  };

  return (
    <nav className="bg-indigo-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push('/')}>
            Sitcom Showdown
            </h1>
            {playerName && (
        <p className="text-lg font-medium">Welcome, {playerName}!</p>
      )}
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="hover:bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </button>
              <button
                onClick={() => router.push('/results')}
                className="hover:bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                My Results
              </button>
              <button
                onClick={() => router.push('/global-results')}
                className="hover:bg-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Global Results
              </button>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-200 hover:bg-indigo-600 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => router.push('/')}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600"
            >
              Home
            </button>
            <button
              onClick={() => router.push('/results')}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600"
            >
              Results History
            </button>
            <button
              onClick={() => router.push('/global-results')}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600"
            >
              Global Results
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                className="block bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleSignIn}
                className="block bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
