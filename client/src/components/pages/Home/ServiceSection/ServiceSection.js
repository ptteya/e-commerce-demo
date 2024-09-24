import { SERVICES } from "constants/homeConstants";
import './ServiceSection.css';

const ServiceSection = () => {
    return (
        <div className="services">
            {SERVICES.map(service => (
                <div className="service" key={service.name}>
                    <i className={`fas ${service.icon} icon`}></i>
                    <div className="info">
                        <p className="name">{service.name}</p>
                        <p className='desc'>{service.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServiceSection;