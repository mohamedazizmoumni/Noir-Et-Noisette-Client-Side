import Slider from "react-slick";
import choco from '../assets/Choco.jpg';
import choco2 from '../assets/choco2.jpg';
import choco3 from '../assets/choco3.jpg';

function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const images = [choco, choco2, choco3];

  return (
    <section className="relative">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="h-screen relative">
            <img src={img} alt={`Slide ${index + 1}`} className="w-full h-screen object-cover" />
            <div className="absolute inset-0 bg-dark-chocolate bg-opacity-60 flex flex-col justify-center items-center text-center text-cream px-4">
              <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4 animate-fade-in">
                Noir et Noisette
              </h2>
              <p className="text-xl md:text-2xl font-lora mb-6 animate-fade-in-delayed">
                Indulgent Chocolates Crafted with Passion
              </p>
              <a
                href="#products"
                className="font-lora bg-cream text-dark-chocolate px-6 py-3 rounded-full hover:bg-milk-chocolate hover:text-cream transition duration-300"
              >
                Discover Our Collection
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Hero;
