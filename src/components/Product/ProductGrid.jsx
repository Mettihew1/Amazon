import './ProductGrid.css';

const ProductGrid = ({ title, products }) => {
  return (
    <div className="product-grid">
      <h2 className="grid-title">{title}</h2>
      <div className="grid-container">
        {products.map((product, index) => (
          <div key={index} className="product-square">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p className="price">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;