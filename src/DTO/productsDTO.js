
class ProductDTO {
  constructor(product) {
    this.id = product._id;
    this.nombre = product.nombre;
    this.descripcion = product.descripcion || "Sin descripción";
    this.precio = product.precio;
    this.categoria = product.categoria || "Sin categoría";
    this.stock = product.stock;
    this.thumbnails = product.thumbnails || [];
  }
}

export default ProductDTO;
