# Sitcom Showdown

Sitcom Showdown is a web-based trivia game where fans of sitcoms can challenge their knowledge about popular TV shows. Players can enjoy single-player quizzes or dive into multiplayer competitions for an engaging experience. With dynamic questions, real-time gameplay, and leaderboards, Sitcom Showdown is the perfect game for sitcom enthusiasts.

## Features

- **Single-Player Mode**: Choose your favorite genre, difficulty, or TV show for a tailored trivia experience.
- **Random Quiz**: Take a challenge with a random set of 25 questions from all genres and shows.
- **Multiplayer Mode**: Join or create lobbies to compete with other players in real time.
- **Leaderboards**: Track high scores and compare your performance with others.
- **Dynamic Questions**: Trivia questions dynamically loaded and shuffled for a fresh experience every time.
- **Customizable Themes**: Sitcom-inspired UI with fun and colorful designs.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Firebase Authentication, Firestore Database, Firebase Hosting
- **Real-Time Multiplayer**: Firebase Realtime Database
- **API Integration**: Giphy API for dynamic sitcom GIFs

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YarinBou/Sitcom-Showdown.git
   cd Sitcom-Showdown
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project.
   - Add your Firebase configuration to `.env.local`:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Deployment

The project is set up for deployment using Firebase Hosting:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Usage

- **Sign In**: Log in using your Google account to start playing.
- **Single-Player**: Choose a genre, difficulty, or show, or start a random quiz.
- **Multiplayer**: Create or join a lobby to play with others.
- **Leaderboards**: Check high scores and track your progress.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements

- Giphy API for providing sitcom-themed GIFs.
- Firebase for real-time database and hosting services.
- OpenAI for assistance in content generation.

## Contact

For any queries or suggestions, feel free to reach out:
- Author: YarinBou
- GitHub: [https://github.com/YarinBou/Sitcom-Showdown](https://github.com/YarinBou/Sitcom-Showdown)

