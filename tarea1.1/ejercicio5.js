function generarReporte(ventas) {
  const totalVentas = ventas.reduce(
    (acumulador, elemento) => acumulador + elemento.monto,
    0
  );

  return {
    totalVentas,
    promedio: totalVentas / ventas.length,
    cantidadTransacciones: ventas.length,
  };
}

const ventas = [
  { producto: "TV", monto: 1000 },
  { producto: "Radio", monto: 200 },
];

console.log(generarReporte(ventas));
