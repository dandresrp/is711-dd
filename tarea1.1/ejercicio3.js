function contarOcurrencias(arr) {
  return arr.reduce((acumulador, elemento) => {
    acumulador[elemento] = (acumulador[elemento] || 0) + 1;
    return acumulador;
  }, {});
}

const elementos = ["a", "b", "a", "c", "b"];

console.log(contarOcurrencias(elementos));
