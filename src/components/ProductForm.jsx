const ProductForm = ({ formData, setFormData, onSubmit, buttonText }) => {
  return (
    <form onSubmit={onSubmit} className="product-form">
      <input 
        type="text" 
        placeholder="Product Name" 
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required 
      />
      <input 
        type="number" 
        placeholder="Price" 
        value={formData.price}
        onChange={(e) => setFormData({...formData, price: e.target.value})}
        required 
      />
      <input 
        type="text" 
        placeholder="Category" 
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value})}
        required 
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default ProductForm;