import { useFetchFurniture } from 'hooks/useFetchFurniture ';
import WelcomeSection from './WelcomeSection/WelcomeSection';
import ServiceSection from './ServiceSection/ServiceSection';
import CategoriesSection from './CategoriesSection/CategoriesSection';
import RecentItems from './RecentItems/RecentItems';
import MidPageBanner from './MidPageBanner/MidPageBanner';
import Reviews from './Reviews/Reviews';

const Home = () => {
    const recentFurniture = useFetchFurniture().slice(-5)

    return (
        <div className="homepage-wrapper">
            <WelcomeSection />
            <ServiceSection />
            <CategoriesSection />
            <RecentItems furniture={recentFurniture} />
            <MidPageBanner />
            <Reviews />
        </div>
    );
};

export default Home;

