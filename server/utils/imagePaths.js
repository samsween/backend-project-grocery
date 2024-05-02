const addImagePath = (product) => {
  return {
    ...product._doc,
    imagePath: product.image
      ? `http://localhost:3000/images/${product.image}`
      : null,
  };
};
const addImagePaths = (products) => {
  return products.map((product) => {
    return addImagePath(product);
  });
};

module.exports = { addImagePaths, addImagePath };
