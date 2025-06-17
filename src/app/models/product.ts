import { Type } from "./enums/type";

export class Product {
    id!: string;
    name!: string;
    price!: number;
    type!: Type;
    photo!: string

    constructor(id: string, name: string, price: number, type: Type, photo: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.photo = photo;
    }
}
