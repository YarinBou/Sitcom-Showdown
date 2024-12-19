import { useEffect, useState } from 'react';

const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

export default function RandomGif({ showName }) {
  const [selectedGif, setSelectedGif] = useState(''); // Store the randomly selected GIF

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const query = showName || 'The office'; // Use showName if provided, otherwise default to "The office"
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=5`
        );

        const data = await response.json();
        if (data.data.length > 0) {
          const urls = data.data.map((gif) => gif.images.original.url); // Extract URLs of all fetched GIFs
          setSelectedGif(urls[Math.floor(Math.random() * urls.length)]); // Pick a random GIF
        } else {
          setGifUrls([]);
          setSelectedGif(''); // Handle no GIF found
        }
      } catch (error) {
        console.error('Error fetching GIFs:', error);;
        setSelectedGif('');
      }
    };

    fetchGifs();
  }, [showName]);

  // If no GIF is selected, return nothing
  if (!selectedGif) return null;

  return (
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-md aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden shadow-md">
        <img
          src={selectedGif}
          alt="Random Sitcom GIF"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
