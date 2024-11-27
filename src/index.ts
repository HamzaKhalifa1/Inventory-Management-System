interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category?: string;
}

class InventoryManager {
    private products: Product[];

    constructor() {
        this.products = [];
    }

    addProduct(product: Product): void {
        if (this.products.some((p) => p.id === product.id)) {
            throw new Error(`Product with ID ${product.id} already exists.`);
        }
        if (product.price < 0 || product.quantity < 0) {
            throw new Error("Price and quantity must be non-negative.");
        }
        this.products.push(product);
    }

    removeProduct(id: string): void {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new Error(`Product with ID ${id} does not exist.`);
        }
        this.products.splice(index, 1);
    }

    updateProduct(id: string, updatedData: Partial<Product>): void {
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

    getProduct(id: string): Product {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new Error(`Product with ID ${id} does not exist.`);
        }
        return product;
    }

    getProductsByCategory(category: string): Product[] {
        return this.products.filter((p) => p.category === category);
    }

    getTotalInventoryValue(): number {
        return this.products.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        );
    }

    restockProduct(id: string, additionalQuantity: number): void {
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
        price: 1500,
        quantity: 10,
        category: "Electronics",
    });

    inventory.addProduct({
        id: "2",
        name: "phone",
        price: 600,
        quantity: 15,
        category: "Electronics",
    });


    console.log("Total Inventory Value:", inventory.getTotalInventoryValue());

    inventory.restockProduct("1", 5);
    console.log("Laptop after restock:", inventory.getProduct("6"));

    inventory.updateProduct("2", { price: 800 });
    console.log("Smartphone after price update:", inventory.getProduct("2"));

    inventory.removeProduct("1");
    console.log("Products after removing Laptop:", inventory.getProductsByCategory("Electronics"));
} catch (error) {
        console.error(error.message);
}
