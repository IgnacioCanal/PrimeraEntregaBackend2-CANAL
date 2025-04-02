import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";



const productSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false, default: 'Sin descripción' },
    precio: { type: Number, required: true },
    categoria: { type: String, required: false, default: 'Sin categoría' },
    stock: { type: Number, default: 0 },
    codigo: { type: String, required: false, unique: false },
    thumbnails: [String]
});

productSchema.plugin(mongoosePaginate);



export const Product = model('Product', productSchema);