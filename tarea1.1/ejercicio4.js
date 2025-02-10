function combinarUsuarios(usuarios, detalles) {
  return usuarios.map((u) => {
    const detalle = detalles.find((d) => d.id === u.id);
    return { ...u, ...detalle };
  });
}

const usuarios = [
  { id: 1, nombre: "Juan" },
  { id: 2, nombre: "Pedro" },
];
const detalles = [
  { id: 1, edad: 25 },
  { id: 2, edad: 30 },
];

console.log(combinarUsuarios(usuarios, detalles));
