const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

fetch(`http://localhost:3000/api/products/${id}`) // fait la requete avec l'id en paramètre
    .then(response => response.json())
    .then(data => {
        const image = document.getElementsByClassName("item__img")[0];
        image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}"></img>`
        const title = document.getElementById("title");
        title.innerHTML = data.name;
        const price = document.getElementById("price");
        price.innerHTML = data.price;
        const description = document.getElementById("description");
        description.innerHTML = data.description;
        const colors = document.getElementById("colors");
        for (let i = 0; i < data.colors.length; i++) {
            colors.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`
        }//pour chaque i commençant de zéro jusqu'à la taille de mon tableau de couleur

        const quantity = document.getElementById("quantity");
        const button = document.getElementById("addToCart");
        button.onclick = () => {
            let previousCart = JSON.parse(localStorage.getItem("cart"));//je vais chercher dans localStorage la clé "cart" je la parse et la mets dans la variable
            if (previousCart == null) { previousCart = [] };//si pas de panier, alors tableau vide

            let alreadyExist = previousCart.findIndex((el) => el.id == data._id && el.selectedColor == colors.value)//si il y a un élément du tableau dont l'id correspond à l'id qu'on cherche et dont la couleur correspond à la couleur qu'on cherche
            if (alreadyExist >= 0) {
                previousCart[alreadyExist].selectedQuantity += parseInt(quantity.value);//on modifie la quantité
            } else {
                let dataToStore = {
                    id: data._id,
                    selectedColor: colors.value,
                    selectedQuantity: parseInt(quantity.value)
                };//crée l'objet à ajouter dans le panier
                previousCart.push(dataToStore);//on l'ajoute au tableau du panier  
            }

            localStorage.setItem("cart", JSON.stringify(previousCart));//on modifie le locastorage avec la nouvelle valeur
        }//fonction qui se déclenche chaque fois qu'on clique sur le bouton

    })