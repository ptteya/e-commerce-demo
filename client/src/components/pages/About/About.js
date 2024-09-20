import './About.css';

const About = () => {
    return (
        <section className="about-section">
            <section className="hero">
                <div className="content">
                    <h1>About Homely</h1>
                    <p>Discover our story, mission, and values.</p>
                </div>
            </section>

            <article className="about-content">
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

                <p className="about-subHeading">At Homely, our core values guide our evolution:</p>

                <div className="values-container">
                    <p className='value'>
                        At Homely, we believe your home should reflect your unique style. Whether it's modern, classic, or eclectic, we have something to make every space feel like home.
                    </p>
                    <p className='value'>
                        Furniture is about comfort as much as style. We design pieces that not only look great but make your home a more enjoyable place to live.
                    </p>
                    <p className='value'>
                        Homely is committed to sustainable design. We source eco-friendly materials so you can furnish your home with style and care for the planet.
                    </p>

                </div>
            </article>
        </section >
    );
};

export default About;