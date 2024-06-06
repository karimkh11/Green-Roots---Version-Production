// buttonclick.js
document.addEventListener("DOMContentLoaded", function() {
    const boutonsAjouterAuPanier = document.querySelectorAll(".ajouter-au-panier");

    boutonsAjouterAuPanier.forEach(bouton => {
        bouton.addEventListener("click", function(event) {
            event.preventDefault();
            const treeId = this.getAttribute("data-tree-id");
            ajouterAuPanier(treeId);
        });
    });

    function ajouterAuPanier(treeId) {
        fetch(`/panier/ajouter/${treeId}`, { // Utilisez l'URL avec l'ID de l'arbre
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ treeId: treeId })
        })
        .then(response => {
            if (response.ok) {
                console.log("Arbre ajouté au panier avec succès !");
            } else {
                console.error("Erreur lors de l'ajout de l'arbre au panier :", response.statusText);
            }
        })
        .catch(error => {
            console.error("Erreur lors de la requête POST :", error);
        });
    }
});
