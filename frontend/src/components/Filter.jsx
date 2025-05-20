import React, { useRef, useState, useEffect } from 'react'
import { amazingViews, arctic, beachFront, bedandbreakfasts, cabin, camping, castles, caves, farms, historicalhomes, islands, lakefront, rooms, treehouse, trending } from '../assets/index'
import { PiArrowCircleLeftThin } from "react-icons/pi";
import { BsSliders } from "react-icons/bs";
import {  FilterModal } from "../components/index.js";

function Filter({ handleFilter, selectedCategory, applyModalFilters, resetFilters }) {
    const filterIcons = [amazingViews, arctic, beachFront, bedandbreakfasts, cabin, camping, castles, caves, farms, historicalhomes, islands, lakefront, rooms, treehouse, trending]
    const titles = ['Amazing Views', 'Arctic', 'Beachfront', 'Bed & breakfasts', 'Cabins', 'Camping', 'Castles', 'Caves', 'Farms', 'Historical homes', 'Islands', 'Lakefront', 'Rooms', 'Treehouse', 'Trending']

    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const openFilterModal = () => {
        setIsFilterModalOpen(true);
    }

    const handleCloseFilterModal = () => {
        setIsFilterModalOpen(false);
    }

    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 768); // md breakpoint in Tailwind
        };

        // Initial check
        checkScreenSize();

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (container) {
            // Show left arrow if we've scrolled at all
            setShowLeftArrow(container.scrollLeft > 0);

            // Show right arrow if we haven't reached the end
            const maxScroll = container.scrollWidth - container.clientWidth;
            const isAtEnd = Math.abs(container.scrollLeft - maxScroll) < 1;
            setShowRightArrow(!isAtEnd);
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = isDesktop ? -350 : -200; // 5 items on desktop (230 * 5), 1 item on mobile
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = isDesktop ? 350 : 200; // 5 items on desktop (230 * 5), 1 item on mobile
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className='h-20 w-full flex items-center gap-6'>
            {showLeftArrow && (
                <div
                    className='opacity-65 flex flex-col justify-start items-center hover:opacity-100 cursor-pointer'
                    onClick={scrollLeft}
                >
                    <PiArrowCircleLeftThin className='w-10 h-10 relative bottom-3' />
                </div>
            )}

            <div className='flex-1 overflow-hidden'>
                <div
                    ref={scrollContainerRef}
                    className='flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6'
                    onScroll={handleScroll}
                >
                    {filterIcons.map((icon, index) => (
                        <div
                            className={`select-none w-20 h-20 opacity-65 flex flex-col justify-start items-center gap-1.5 hover:opacity-100 hover:border-b-2 hover:border-b-gray-500 cursor-pointer flex-shrink-0 ${selectedCategory === titles[index] ? 'opacity-100 border-b-2 border-b-gray-500' : ''
                                }`}
                            key={index}
                            onClick={() => {
                                resetFilters();
                                handleFilter(titles[index]);
                            }}
                        >
                            <img src={icon} alt="icon" className='w-7' />
                            <p className='text-xs font-semibold text-center font-jakarta whitespace-nowrap'>{titles[index]}</p>
                        </div>
                    ))}
                </div>
            </div>

            {showRightArrow && (
                <div
                    className='opacity-50 flex flex-col justify-start items-center gap-2 hover:opacity-100 cursor-pointer flex-shrink-0'
                    onClick={scrollRight}
                >
                    <PiArrowCircleLeftThin className='w-10 h-10 rotate-180 relative bottom-3' />
                </div>
            )}

            <div className='hidden md:flex justify-center items-center h-full w-1/10'>
                <div className='flex justify-center items-center gap-3 shadow-[0_0_5px_rgba(0,0,0,0.2)] p-3 rounded-md relative bottom-5 cursor-pointer hover:shadow-md transition-all duration-300'
                    onClick={openFilterModal}
                >
                    <span className='text-lg'><BsSliders /></span>
                    <p className='font-jakarta text-md'>Filters</p>
                </div>
            </div>

            <FilterModal 
            isOpen={isFilterModalOpen}
            onClose={handleCloseFilterModal}
            onApply={applyModalFilters}
            onClear={resetFilters}
            />
        </div>
    )
}

export default Filter;
