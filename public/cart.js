document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.counter-up').forEach(button => {
        button.addEventListener('click', event => {
            const input = event.target.nextElementSibling;
            input.value = parseInt(input.value) + 1;
        });
    });

    document.querySelectorAll('.counter-down').forEach(button => {
        button.addEventListener('click', event => {
            const input = event.target.previousElementSibling;
            if (parseInt(input.value) > 0) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });
});

function addToCart(tree) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.id === tree.id);
    if (index !== -1) {
        cart[index].quantity += 1;
    } else {
        tree.quantity = 1;
        cart.push(tree);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Arbre ajouté au panier');
}
