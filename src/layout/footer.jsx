// This component renders the footer section of the application, providing navigation links, social media icons,
// and app download options. It is designed to enhance user experience by offering quick access to important links
// and promoting the app download feature.

// Why: This component is designed to provide users with essential links, social media connections, and app download options,
// improving accessibility and engagement.

// Key Features:
// - Company links: Provides navigation links to pages like "About Us," "Contact Us," "Careers," etc.
// - Social media integration: Displays social media icons with links to platforms like Twitter, Twitch, Threads, and YouTube.
// - App download section: Includes a QR code for app download and links to Play Store and App Store.
// - Responsive design: Adapts to different screen sizes with flexible layouts for desktop and mobile views.

import { useState, useEffect } from 'react';
import WebLogo from "../assets/icons/download (2).svg";
import QR from "../assets/Images/QRcode.png";
import LinkTag from "../components/LinkTag";
import { RiTwitterXFill } from "react-icons/ri";
import { FaTwitch } from "react-icons/fa";
import { FaAppStoreIos } from "react-icons/fa6";
import { RiThreadsFill } from "react-icons/ri";
import { BiLogoPlayStore } from "react-icons/bi";
import { IoLogoYoutube } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className="relative footer w-full h-auto bg-c-d-grey flex md:flex-row sm:flex-col xs:flex-col justify-between items-center border-t-1 border-c-red overflow-hidden p-2 sm:space-y-1.5">
                {/* Logo and Social Media Section */}
                <section className='relative min-w-80 min-h-32 w-auto h-auto roundex-lg flex flex-col'>
                    <img className='relative w-80 h-22 object-cover' src={WebLogo} alt="logo" />
                    <div className='social-icons flex flex-col justify-start items-center w-full h-22'>
                        <h3 className='relative w-auto text-c-white text-xl border-b self-start ml-1'>follow us</h3>
                        <div className='social-icons flex flex-row justify-between items-center w-80 h-22 p-2'>
                            <LinkTag href="/x" icon={RiTwitterXFill} Text="x" />
                            <LinkTag href="/twitch" icon={FaTwitch} Text="Twitch" />
                            <LinkTag href="/threads" icon={RiThreadsFill} Text="Threads" />
                            <LinkTag href="/youtube" icon={IoLogoYoutube} Text="Youtube" />
                        </div>
                    </div>
                </section>

                {/* Company Links Section */}
                <section className='min-w-80 min-h-32 w-auto h-auto roundex-lg'>
                    <nav className='w-full h-auto flex flex-col justify-center md:items-start sm:items-center xs:items-center p-1'>
                        <h3 className='text-xl font-semiboldh text-c-white w-full'>company</h3>
                        <ul className='w-auto h-auto flex flex-col space-y-1.5 text-c-l-grey'>
                            <li className='hover:text-c-red hover:scale-105 transition-all duration-150'><Link to="/about">about us</Link></li>
                            <li className='hover:text-c-red hover:scale-105 transition-all duration-150'><Link to="/contact">contact us</Link></li>
                            <li className='hover:text-c-red hover:scale-105 transition-all duration-150'><Link to="/carrers">Careers</Link></li>
                            <li className='hover:text-c-red hover:scale-105 transition-all duration-150'><Link to="/advertise">Advertise with us</Link></li>
                            <li className='hover:text-c-red hover:scale-105 transition-all duration-150'><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </nav>
                </section>

                {/* App Download Section */}
                <section className='min-w-80 min-h-32 w-auto h-auto roundex-lg'>
                    <div className='w-80 h-auto flex flex-row space-x-2 justify-start items-center p-1'>
                        <img className='relative w-auto h-32 object-cover' src={QR} alt="QR Code" />
                        <div className='flex flex-col space-y-1.5'>
                            <h3 className='relative w-auto text-c-white text-md border-b self-start ml-1'>Scan to download</h3>
                            <p className='text-c-l-grey text-sm'>Download our app for the best experience</p>
                            <h3 className='relative w-auto text-c-white text-md border-b self-start ml-1'>Also available on</h3>
                            <span className='flex flex-row space-x-4'>
                                <LinkTag href="/playstore" icon={BiLogoPlayStore} Text="PlayStore" />
                                <LinkTag href="/appstoreIos" icon={FaAppStoreIos} Text="AppStoreIos" />
                            </span>
                        </div>
                    </div>
                </section>
            </footer>
        </>
    );
};

export default Footer;