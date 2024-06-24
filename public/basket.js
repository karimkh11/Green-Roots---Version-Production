//Enregister le panier dans le localStorage
function saveBasket(basket) {
// JSON.stringify  - Serialization: passer le donneé complexe en une chaine de caractere
    localStorage.setItem("basket", JSON.stringify(basket));
}

//Récuperer l'item qui porte la clé "basket"
function getBasket(basket) {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
    } else {
//JSON.parse - Transformer la chaine de caractère un nouveau en objet, un tableau ou données complexes
        return JSON.parse(basket);
    }
}

//Ajouter l'item dans le panier
function addBasket(product) {
//Recupere le panier    
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if (foundProduct !== undefined) {
        foundProduct.quantity++;
    } else {
        product.quantity = 1;    
//On ajoute le produit dans le tableau
        basket.push(product);
    }
// On enregistre un nouveau le panier
    saveBasket(basket);
}

//Rétirer un produit depuis le panier
function removeFromBasket(product) {
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id);
    saveBasket(basket);
}

//Changer le quantité de produit
function changeQuantity(product, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if (foundProduct !== undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeFromBasket(foundProduct);
        } else {
// On enregistre un nouveau le panier
            saveBasket(basket);
        } 
    }
}

//Calcul le quantité de produits qui se trouve dans le panier
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += product.quantity;
    }
    return number;
}

//Calcul le prix totals de produits qui se trouve dans le panier
function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let product of basket) {
        total += product.quantity * product.price;
    }
    return total;
}


