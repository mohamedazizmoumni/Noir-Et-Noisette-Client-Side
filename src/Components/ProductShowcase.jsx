import { useState, useEffect } from 'react';
import darkTruffle from '../assets/Dark-truffle.jpg';
import hazelnutPraline from '../assets/Hazelnut-Praline-Chocolate-Truffles-2.jpg';
import noirCaramel from '../assets/Noir Caramel.jpg';

function ProductShowcase({ searchQuery }) {
  const [products, setProducts] = useState([
    { name: 'Dark Truffle', image: darkTruffle, description: 'Rich dark chocolate with a velvety center.' },
    { name: 'Hazelnut Praline', image: hazelnutPraline, description: 'Creamy hazelnut filling in smooth chocolate.' },
    { name: 'Noir Caramel', image: noirCaramel, description: 'Decadent caramel encased in dark chocolate.' },
  ]);

  useEffect(() => {
    if (searchQuery) {
      const filteredProducts = [
        { name: 'Dark Truffle', image: darkTruffle, description: 'Rich dark chocolate with a velvety center.' },
        { name: 'Hazelnut Praline', image: hazelnutPraline, description: 'Creamy hazelnut filling in smooth chocolate.' },
        { name: 'Noir Caramel', image: noirCaramel, description: 'Decadent caramel encased in dark chocolate.' },
      ].filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setProducts(filteredProducts);
    } else {
      setProducts([
        { name: 'Dark Truffle', image: darkTruffle, description: 'Rich dark chocolate with a velvety center.' },
        { name: 'Hazelnut Praline', image: hazelnutPraline, description: 'Creamy hazelnut filling in smooth chocolate.' },
        { name: 'Noir Caramel', image: noirCaramel, description: 'Decadent caramel encased in dark chocolate.' },
      ]);
    }
  }, [searchQuery]);

  return (
    <section id="products" className="py-20 px-4 md:px-20 bg-dark-chocolate text-cream">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-playfair font-bold mb-6">Our Signature Chocolates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-cream text-dark-chocolate p-6 rounded-lg shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
              <h3 className="text-2xl font-playfair font-bold mb-2">{product.name}</h3>
              <p className="font-lora">{product.description}</p>
            </div>
          ))}
        </div>
        <a
          href="#shop"
          className="font-lora mt-8 inline-block bg-cream text-dark-chocolate px-6 py-3 rounded-full hover:bg-milk-chocolate hover:text-cream transition duration-300"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}

export default ProductShowcase;