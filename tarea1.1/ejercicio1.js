function aplicarImpuestos(arr) {
  const arrayConImpuestos = arr.map((obj) => {
    const impuesto = obj.precio * 0.1;
    return {
      ...obj,
      precio: obj.precio + impuesto,
    };
  });

  const arrayFiltrado = arrayConImpuestos.filter((obj) => obj.precio > 50);

  return arrayFiltrado;
}

const productos = [
  { nombre: "Camisa", precio: 45 },
  { nombre: "Zapatos", precio: 80 },
];

console.log(aplicarImpuestos(productos));
