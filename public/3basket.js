if (localStorage.getItem("nom") != null)
    h1.textCONTENT = `Bonjour ${localStorage.getItem("nom")}`;
bouton.onclick = () => {
    localStorage.setItem("nom", nom.value);
}

clear.onclick = () => {
    localStorage.clear();
}