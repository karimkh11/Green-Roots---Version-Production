class Basket {
    constructor() {
    //Récuperer l'item qui porte la clé "basket"
        let basket = localStorage.getItem("basket");
        if (basket == null) {
            this.basket [];
        } else {
//JSON.parse - Transformer la chaine de caractère un nouveau en objet, un tableau ou données complexes
        this.basket = JSON.parse(basket);
        }
    }

//Enregister le panier dans le localStorage
    save() {
// JSON.stringify  - Serialization: passer le donneé complexe en une chaine de caractere
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }

//Ajouter l'item dans le panier
    add(product) {
//Recupere le panier    
        let foundProduct = this.basket.find(p => p.id == product.id);
        if (foundProduct !== undefined) {
            foundProduct.quantity++;
        } else {
            product.quantity = 1;    
//On ajoute le produit dans le tableau
            this.basket.push(product);
    }
// On enregistre un nouveau le panier
        this.save();
    }

//Rétirer un produit depuis le panier
    remove(product) {
        this.basket = this.basket.filter(p => p.id != product.id);
        this.save();
    }

//Changer le quantité de produit
    changeQuantity(product, quantity) {
        let foundProduct = this.basket.find(p => p.id == product.id);
        if (foundProduct !== undefined) {
            foundProduct.quantity += quantity;
            if (foundProduct.quantity <= 0) {
                this.remove(foundProduct);
            } else {
// On enregistre un nouveau le panier
            this.save();
            } 
        }
    }

//Calcul le quantité de produits qui se trouve dans le panier
    getNumberProduct() {
        let number = 0;
        for (let product of this.basket) {
            number += product.quantity;
        }
        return number;
    }

//Calcul le prix totals de produits qui se trouve dans le panier
    getTotalPrice() {
        let total = 0;
        for (let product of this.basket) {
            total += product.quantity * product.price;
        }
        return total;
    }
   
}














