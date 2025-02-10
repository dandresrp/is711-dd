function actualizarStock(arr, id, nuevoStock) {
  const producto = arr.find((obj) => obj.id === id);

  if (producto) {
    producto.stock = nuevoStock;
    return productos;
  }

  return null;
}

const productos = [
  { id: 1, nombre: "Lápiz", stock: 10 },
  { id: 2, nombre: "Cuaderno", stock: 5 },
];

console.log(actualizarStock(productos, 2, 20));
console.log(actualizarStock(productos, 3, 20));
