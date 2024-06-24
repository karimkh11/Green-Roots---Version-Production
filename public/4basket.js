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
function addBasket(tree) {
//Recupere le panier    
    let basket = getBasket();
    let foundProduct = basket.find(t => t.id == tree.id);
    if (foundProduct !== undefined) {
        foundProduct.quantity++;
    } else {
        tree.quantity = 1;    
//On ajoute le produit dans le tableau
        basket.push(tree);
    }
// On enregistre un nouveau le panier
    saveBasket(basket);
}

//Rétirer un produit depuis le panier
function removeFromBasket(tree) {
    let basket = getBasket();
    basket = basket.filter(t => t.id != tree.id);
    saveBasket(basket);
}

//Changer le quantité de produit
function changeQuantity(tree, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find(t => t.id == tree.id);
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
    for (let tree of basket) {
        number += tree.quantity;
    }
    return number;
}

//Calcul le prix totals de produits qui se trouve dans le panier
function getTotalPrice() {
    let basket = getBasket();
    let total = 0;
    for (let tree of basket) {
        total += tree.quantity * tree.price;
    }
    return total;
}


