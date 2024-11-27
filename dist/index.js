"use strict";
class InventoryManager {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        if (this.products.some((p) => p.id === product.id)) {
            throw new Error(`Product with ID ${product.id} already exists.`);
        }
        if (product.price < 0 || product.quantity < 0) {
            throw new Error("Price and quantity must be non-negative.");
        }
        this.products.push(product);
    }
    removeProduct(id) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new Error(`Product with ID ${id} does not exist.`);
        }
        this.products.splice(index, 1);
    }
    updateProduct(id, updatedData) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new Error(`Product with ID ${id} does not exist.`);
        }
        if (updatedData.price !== undefined && updatedData.price < 0) {
            throw new Error("Price must be non-negative.");
        }
        if (updatedData.quantity !== undefined && updatedData.quantity < 0) {
            throw new Error("Quantity must be non-negative.");
        }
        Object.assign(product, updatedData);
    }
    getProduct(id) {
        return this.products.find((p) => p.id === id);
    }
    getProductsByCategory(category) {
        return this.products.filter((p) => p.category === category);
    }
    getTotalInventoryValue() {
        return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }
    restockProduct(id, additionalQuantity) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new Error(`Product with ID ${id} does not exist.`);
        }
        if (additionalQuantity < 0) {
            throw new Error("Additional quantity must be non-negative.");
        }
        product.quantity += additionalQuantity;
    }
}
const inventory = new InventoryManager();
try {
    inventory.addProduct({
        id: "1",
        name: "Laptop",
        price: 1000,
        quantity: 10,
        category: "Electronics",
    });
    inventory.addProduct({
        id: "2",
        name: "Smartphone",
        price: 700,
        quantity: 15,
        category: "Electronics",
    });
    console.log("Total Inventory Value:", inventory.getTotalInventoryValue());
    inventory.restockProduct("1", 5);
    console.log("Laptop after restock:", inventory.getProduct("1"));
    inventory.updateProduct("2", { price: 750 });
    console.log("Smartphone after price update:", inventory.getProduct("2"));
    inventory.removeProduct("1");
    console.log("Products after removing Laptop:", inventory.getProductsByCategory("Electronics"));
}
catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    }
    else {
        console.error('it is an error while removing Laptop');
    }
}
