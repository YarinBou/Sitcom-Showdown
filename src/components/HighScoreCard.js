export default function HighScoreCard({ highScore, rank }) {
    return (
      <li className="bg-white shadow-lg rounded-lg p-5 hover:bg-gray-100 transition">
        {rank !== undefined && (
          <p className="text-sm text-gray-500 font-bold">Rank: #{rank + 1}</p>
        )}
        <p className="font-bold text-lg text-gray-800">{highScore.score} points</p>
        <p className="text-sm text-gray-600">
          Player: <span className="font-medium">{highScore.user || 'Anonymous'}</span>
        </p>
        <p className="text-sm text-gray-600">
          Show: <span className="font-medium">{highScore.show || 'N/A'}</span>, Genre:{' '}
          <span className="font-medium">{highScore.genre || 'N/A'}</span>, Difficulty:{' '}
          <span className="font-medium">{highScore.difficulty || 'N/A'}</span>
        </p>
        <p className="text-sm text-gray-600">
          Total Questions: <span className="font-medium">{highScore.totalQuestions || 'N/A'}</span>
        </p>
        <p className="text-sm text-gray-600">
          Date:{' '}
          <span className="font-medium">
            {highScore.timestamp ? new Date(highScore.timestamp.seconds * 1000).toLocaleString() : 'N/A'}
          </span>
        </p>
      </li>
    );
  }
  