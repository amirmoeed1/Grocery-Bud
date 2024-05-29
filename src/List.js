import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import jsPDF from "jspdf";

const List = ({ items: initialItems, removeItem, editItem }) => {
  const getInitialState = (key, defaultState) => {
    const storedState = localStorage.getItem(key);
    return storedState ? JSON.parse(storedState) : defaultState;
  };

  const [items, setItems] = useState(initialItems);
  const [quantities, setQuantities] = useState(() =>
    getInitialState("quantities", Array(initialItems.length).fill(0))
  );
  const [prices, setPrices] = useState(() =>
    getInitialState("prices", Array(initialItems.length).fill(0))
  );
  const [totalBill, setTotalBill] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  // const [newItemTitle, setNewItemTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("quantities", JSON.stringify(quantities));
    localStorage.setItem("prices", JSON.stringify(prices));

    const newTotalBill = quantities.reduce((total, quantity, index) => {
      return total + prices[index] * quantity;
    }, 0);
    setTotalBill(newTotalBill);
  }, [quantities, prices]);

  const handleQuantityChange = (index, quantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = quantity;
    setQuantities(newQuantities);
  };

  const handlePriceChange = (index, price) => {
    const newPrices = [...prices];
    newPrices[index] = parseFloat(price) || 0;
    setPrices(newPrices);
  };

  const incrementValue = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] = (newQuantities[index] || 0) + 1;
    setQuantities(newQuantities);
  };

  const decrementValue = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max((newQuantities[index] || 0) - 1, 0);
    setQuantities(newQuantities);
  };

  const handleRemoveItem = (id, index) => {
    removeItem(id);

    const newPrices = [...prices];
    newPrices[index] = 0;
    setPrices(newPrices);

    const newQuantities = [...quantities];
    newQuantities.splice(index, 1);
    setQuantities(newQuantities);

    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    items.forEach((item, index) => {
      const itemString = `${item.title}: ${quantities[index]} x ${prices[index]} = ${quantities[index] * prices[index]}`;
      doc.text(itemString, 10, yPos);
      yPos += 10;
    });

    doc.text(`Total Bill: Rs${totalBill.toFixed(2)}`, 10, yPos + 10);
    doc.save("items_list.pdf");
  };

  const handleAddItem = () => {
    if (newItemTitle.trim() !== "") {
      const newItem = { id: Date.now(), title: newItemTitle };
      setItems([...items, newItem]);
      setQuantities([...quantities, 0]);
      setPrices([...prices, 0]);
      setNewItemTitle("");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grocery-list">
     
        
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search items"
        />
      </div>
      {filteredItems.map((item, index) => {
        const { id, title } = item;
        return (
          <article className="grocery-item" key={id}>
            <p className="title">{title}</p>
            <div className="input-group">
              <button
                type="button"
                className="button-minus"
                onClick={() => decrementValue(index)}
              >
                -
              </button>
              <input
                type="number"
                step={1}
                max={10}
                min={0}
                value={quantities[index]}
                name="quantity"
                className="quantity-field"
                onChange={(e) =>
                  handleQuantityChange(index, parseInt(e.target.value) || 0)
                }
              />
              <button
                type="button"
                className="button-plus"
                onClick={() => incrementValue(index)}
              >
                +
              </button>
              <input
                type="number"
                step={0.01}
                min={0}
                value={prices[index]}
                name="price"
                className="quantity-field"
                onChange={(e) => handlePriceChange(index, e.target.value)}
              />
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleRemoveItem(id, index)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
      <div className="total-bill">
        <h3>Total Bill: Rs{totalBill.toFixed(2)}</h3>
      </div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default List;
