import { useMemo } from 'react';
import { useFetchFurniture } from 'hooks/useFetchFurniture ';
import WelcomeSection from './WelcomeSection/WelcomeSection';
import ServiceSection from './ServiceSection/ServiceSection';
import CategoriesSection from './CategoriesSection/CategoriesSection';
import FurnitureCollection from './FurnitureCollection/FurnitureCollection ';
import SaleBanner from './SaleBanner/SaleBanner';
import Reviews from './Reviews/Reviews';

const Home = () => {
    const furniture = useFetchFurniture();

    const recentFurniture = useMemo(() => furniture.slice(-5), [furniture]);
    const trendyFurniture = useMemo(() => furniture.slice(0, 5), [furniture]);

    return (
        <div className="homepage-wrapper">
            <WelcomeSection />
            <ServiceSection />
            <CategoriesSection />
            <FurnitureCollection furniture={recentFurniture} subtitle='Fresh Picks' title='Recent Collection' />
            <SaleBanner />
            <FurnitureCollection furniture={trendyFurniture} subtitle='This Week' title='Trendy Collection' />
            <Reviews />
        </div>
    );
};

export default Home;