import './About.css';

export const About = () => {
    return (
        <section className="about-section">
            <section className="hero">
                <h1>About Homely</h1>
                <p>Discover our story, mission, and values.</p>
            </section>

            <article className="about-content">
                <div className="about-left">
                    <p className="about-subHeading">We are an interior design company dedicated to deliver quality items to our
                        customers!</p>
                    <p className="about-info">
                        Since our establishment in 2015, we have proudly served our clients for over 8 years, specializing in
                        high-quality furniture and superior customer experiences.
                        Our dedication goes beyond just providing functional pieces; we believe that furniture should reflect
                        your unique style and personality. With this philosophy in mind, we meticulously curate a diverse
                        selection of furniture options, each designed to cater to a wide range of tastes and preferences.
                        Whether you seek classNameic elegance, modern minimalism, or eclectic charm, our collection is crafted to
                        help you create a space that is truly your own.
                    </p>
                    <a href="/furniture/catalog/couches" className="yellow-btn">See Products</a>
                </div>
                <div className="about-right">
                    <div className="image-container">
                        <img className="about_image" src="/images/building.png" alt='building' />
                        <p className="about-box-description">
                            Visit our shops today and experience the difference of exceptional quality, outstanding customer
                            service, and a wide selection of stylish furniture.
                        </p>
                    </div>
                </div>
            </article>
        </section >
    );
}
