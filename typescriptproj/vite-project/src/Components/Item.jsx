import React from 'react';

function Item({ item }) {
  return (
    <div className="p-4 border rounded mb-2">
      <h3 className="font-bold">{item.title}</h3>
      <p>{item.description}</p>
      <p>{item.price} руб.</p>
    </div>
  );
}

export default Item;