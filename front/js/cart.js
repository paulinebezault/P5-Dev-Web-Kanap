let currentCart = JSON.parse(localStorage.getItem("cart"));
console.log(currentCart);
function deleteItem(id,color){
       let index = currentCart.findIndex((item) => item.id === id && item.selectedColor === color);
        currentCart.splice(index , 1); //on retire l'élément de position index et on en retire qu'un seul
    localStorage.setItem("cart", JSON.stringify(currentCart));
    location.reload();
}

function modifyItem(id,color){
  let index = currentCart.findIndex((item) => item.id === id && item.selectedColor === color);
  let newQuantity = document.getElementById("quantity_" + id).value;
  currentCart[index].selectedQuantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(currentCart));
    location.reload();
}

let totalQuantity=0;
let totalPrice=0;

currentCart.forEach((itemCart, /*index, array fonction complète mais pas besoin la plupart du temps, revient à récupérer index=i*/) => {
    let items = document.getElementById("cart__items");
    fetch(`http://localhost:3000/api/products/${itemCart.id}`) // fait la requete avec l'id en paramètre
        .then(response => response.json())
        .then(data => {
            totalQuantity += parseInt(itemCart.selectedQuantity); //on incrémente totalQuantity de la quantité sélectionnée de cet élément du panier
            totalPrice += parseInt(data.price)*parseInt(itemCart.selectedQuantity); // on incrémente totalPrice du prix de cet élément du panier
            console.log(totalPrice);
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
          <input type="number" class="itemQuantity" name="itemQuantity" id="quantity_${itemCart.id}" onchange="modifyItem('${itemCart.id}', '${itemCart.selectedColor}')" min="1" max="100" value="${itemCart.selectedQuantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" onclick="deleteItem('${itemCart.id}', '${itemCart.selectedColor}')" >Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
        document.getElementById("totalQuantity").innerHTML=totalQuantity;
        document.getElementById("totalPrice").innerHTML=totalPrice;
      })
        
})