// This component renders the "Home" page of the application, serving as the main entry point for users.
// It integrates the header, main content section, and footer to provide a complete layout for the homepage.

// Why: This component is designed to offer a structured and visually appealing layout for the homepage,
// ensuring a seamless user experience by combining navigation, content, and footer sections.

// Key Features:
// - Header integration: Includes the `Header` component for navigation and branding.
// - Main content: Displays the main content using the `MainSection` component, which showcases movies and TV shows.
// - Footer integration: Includes the `Footer` component for additional navigation links and app download options.
// - Responsive design: Adapts to various screen sizes for an optimal viewing experience.

import ToggleButton from '../components/Button';
import MainSection from '../layout/MainSection';
import Header from '../layout/header';
import Footer from '../layout/footer';

const HomePage = () => {
    return (
        <>
        <section className="w-full min-h-1/2 bg-c-d-grey flex flex-col justify-between items-start">
            <Header />
            <MainSection />
            <Footer />
        </section>
        </>
    );
};

export default HomePage;