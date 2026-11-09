import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'GUESS 10 - Yes/No Card Guessing Game',
  description: 'Digital card-based guessing game inspired by Yes/No trivia card games. Guess the secret card in up to 10 questions!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#F7F6FF]">
        {children}
      </body>
    </html>
  );
}

