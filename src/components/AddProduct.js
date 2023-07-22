import React from "react";

const AddProduct = () => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const addProduct = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      setSuccess(false);
      return false;
    }
    setError(false);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: 'post',
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.warn(result);
    setSuccess(true);
    setName('');
    setPrice('');
    setCategory('');
    setCompany('');
    setTimeout(() => {
        setSuccess(false);
    }, 3000);
  }

  return (
    <div className="product">
      <h1>Add Products</h1>
      <input className="inputBox" type="text" placeholder="Enter product Name"
        value={name} onChange={(e) => { setName(e.target.value) }} />
      {error && !name && <span className="invalid-input">Enter Valid Name!...</span>}

      <input className="inputBox" type="text" placeholder="Enter product Price"
        value={price} onChange={(e) => { setPrice(e.target.value) }} />
      {error && !price && <span className="invalid-input">Enter Valid Price!...</span>}

      <input className="inputBox" type="text" placeholder="Enter product Category"
        value={category} onChange={(e) => { setCategory(e.target.value) }} />
      {error && !category && <span className="invalid-input">Enter Valid Category!...</span>}

      <input className="inputBox" type="text" placeholder="Enter product Company"
        value={company} onChange={(e) => { setCompany(e.target.value) }} />
      {error && !company && <span className="invalid-input">Enter Valid Company!...</span>}

      <button onClick={addProduct} className="appButton">Add Product</button>

      {success && <p className="success-message">Added Successfully!...</p>}
    </div>
  )
}

export default AddProduct;
