import { useLocation } from 'react-router-dom';

function Wishlist() {
  const location = useLocation();
  const favorites = location.state?.favorites || [];

  return (
    <div className="p-4 min-h-screen bg-cream">
      <h1 className="text-2xl font-playfair font-bold text-dark-chocolate mb-4">Wishlist</h1>
      {favorites.length === 0 ? (
        <p className="text-md font-lora text-dark-chocolate">Your wishlist is empty.</p>
      ) : (
        <table className="w-full text-md font-lora text-dark-chocolate border-collapse">
          <thead>
            <tr className="bg-dark-chocolate text-cream">
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Description</th>
              <th className="p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map(fav => (
              <tr key={fav.id} className="border-b">
                <td className="p-2"><img src={fav.image} alt={fav.name} className="w-16 h-16 object-cover rounded-md" /></td>
                <td className="p-2">{fav.name}</td>
                <td className="p-2">{fav.description}</td>
                <td className="p-2">{fav.price.toFixed(2)} TND</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Wishlist;