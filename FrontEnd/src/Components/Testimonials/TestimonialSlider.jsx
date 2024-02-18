import { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Testimonial from './Testimonial';
import './Testimonial.scss'


const TestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const apiURL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiURL}/avis/approved`);
        setTestimonials(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
      }
    };

    fetchTestimonials();

  }, []);

  useEffect(() => {
    import('swiper').then((SwiperModule) => {
      SwiperModule.default.use([SwiperModule.Autoplay]);
    });
});

  return (
    <Swiper
      autoplay = {{
        delay: 2500,
        disableOnInteraction: false,
      }}
      spaceBetween={50}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
      }}
    >
      {Array.isArray(testimonials) && testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.Id_avis}>
          <Testimonial
            name={testimonial.Nom}
            prenom={testimonial.Prenom}
            description={testimonial.Description}
            date={testimonial.Date}
            rating={testimonial.Note}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialsCarousel;
