let currentCart = JSON.parse(localStorage.getItem("cart"));
console.log(currentCart);
function deleteItem(id,color){
       let index = currentCart.findIndex((item) => item.id === id && item.selectedColor === color);
        currentCart.splice(index , 1); //on retire l'élément de position index et on en retire qu'un seul
    localStorage.setItem("cart", JSON.stringify(currentCart));
    location.reload();
}
currentCart.forEach((itemCart, /*index, array fonction complète mais pas besoin la plupart du temps, revient à récupérer index=i*/) => {
    let items = document.getElementById("cart__items");
    fetch(`http://localhost:3000/api/products/${itemCart.id}`) // fait la requete avec l'id en paramètre
        .then(response => response.json())
        .then(data => {
            items.innerHTML += `<article class="cart__item" data-id="${itemCart.id}" data-color="${itemCart.selectedColor}">
    <div class="cart__item__img">
      <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${data.name}</h2>
        <p>${itemCart.selectedColor}</p>
        <p>${data.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemCart.selectedQuantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" onclick="deleteItem('${itemCart.id}', '${itemCart.selectedColor}')" >Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
        })
})