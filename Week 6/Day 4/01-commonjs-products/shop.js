const products = require("./products");

function findProduct(productName) {
  return products.find(
    (product) => product.name.toLowerCase() === productName.toLowerCase(),
  );
}

for (const productName of ["Laptop", "Coffee Mug", "Unknown Product"]) {
  const product = findProduct(productName);
  console.log(product ?? `Product not found: ${productName}`);
}
