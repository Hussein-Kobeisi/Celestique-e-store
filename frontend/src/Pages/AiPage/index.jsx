import { useState } from "react";
import axios from "axios";

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/ai/products", {
        message: input,
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error talking to AI:", err);
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <h2>Ask the Jewelry Assistant 💎</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="I want a gold necklace for my wife under $500"
        style={{ width: "100%", padding: "10px" }}
      />
      <button onClick={handleAsk} style={{ marginTop: "10px", padding: "10px" }}>
        Ask AI
      </button>

      {loading && <p>Loading...</p>}

      <div style={{ marginTop: "2rem" }}>
        {products.length === 0 && !loading && <p>No products found.</p>}
        {products.map((prod) => (
          <div key={prod.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h3>{prod.name}</h3>
            <p>Category: {prod.category}</p>
            <p>Price: ${prod.price}</p>
            <p>Occasion: {prod.occasion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}