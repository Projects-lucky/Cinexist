// This component serves as the main section of the application, rendering various content components such as carousels,
// trending content, and categorized movie frames. It acts as the central hub for displaying dynamic movie and TV show data.

// Why: This component is designed to provide a structured and visually appealing layout for showcasing different types
// of content, enhancing the user experience by organizing the data into distinct sections.

// Key Features:
// - Carousel integration: Displays a carousel of popular movies using the `Fcarousel` component.
// - Popular content: Renders popular movies and TV shows with the `Fcardframe` component.
// - Trending content: Displays trending movies and TV shows using the `FcardFrameTrending` component.
// - Categorized content: Organizes movies by genres with pagination using the `FNcardframe` component.
// - Responsive design: Adapts to various screen sizes for an optimal viewing experience.

import FNcardframe from "../FetchComponents/FNCardFrame";
import Fcarousel from "../FetchComponents/Fcarousel";
import Fcardframe from "../FetchComponents/FcardFramePopular";
import FcardFrameTrending from "../FetchComponents/FcardFrameTrending";

const MainSection = () => {
    return (
        <>
        <main className='w-full h-auto flex flex-col justify-between items-start relative space-y-8 text-c-red'>
            {/* Carousel Section */}
            <Fcarousel />

            {/* Popular Content Section */}
            <Fcardframe />

            {/* Trending Content Section */}
            <FcardFrameTrending />

            {/* Categorized Content Section */}
            <FNcardframe />
        </main>
        </>
    );
};

export default MainSection;3