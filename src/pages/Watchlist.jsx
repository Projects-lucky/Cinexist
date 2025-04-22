// This component renders the "Watchlist" page, displaying the user's saved movies and TV shows.
// It allows users to view their watchlist and provides a message if the watchlist is empty.

// Why: This component is designed to enhance user experience by providing a dedicated page for managing
// and viewing saved movies and TV shows, encouraging users to engage with their personalized content.

// Key Features:
// - Watchlist display: Shows a grid of saved movies and TV shows using the `NewMovieCard` component.
// - Empty state: Displays a message when the watchlist is empty, prompting users to add content.
// - Header and footer: Includes the `Header` and `Footer` components for consistent navigation and layout.
// - Responsive design: Adapts to various screen sizes with a grid layout for optimal viewing.

import Header from '../layout/header';
import Footer from '../layout/footer';
import { useWatchlist } from '../context/WatchlistContext';
import NewMovieCard from '../components/NewMovieCard';

const WatchList = () => {
    const { watchlist } = useWatchlist();
    return (
        <>
        <Header />
        <div className='w-full min-h-screen flex flex-col items-center bg-c-d-grey p-8'>
            <h1 className='text-3xl font-bold text-white mb-4'>My Watch List</h1>
            
            {watchlist.length === 0 ? (
                <p className='text-gray-400'>Your saved movies and shows will appear here.</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full'>
                    {watchlist.map((movie, index) => (
                        <NewMovieCard 
                            key={movie.id} 
                            movies={movie} 
                            Index={index}
                        />
                    ))}
                </div>
            )}
        </div>
        <Footer />
        </>
    );
};

export default WatchList;