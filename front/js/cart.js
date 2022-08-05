let currentCart = JSON.parse(localStorage.getItem("cart"));
if (!currentCart) {
  currentCart = [];
}//si currentCart n'existe pas ou est null, on réinitialise à tableau vide
function deleteItem(id, color) {
  let index = currentCart.findIndex((item) => item.id === id && item.selectedColor === color);
  currentCart.splice(index, 1); //on retire l'élément de position index et on en retire qu'un seul
  localStorage.setItem("cart", JSON.stringify(currentCart));
  location.reload();
}

function modifyItem(id, color) {
  let index = currentCart.findIndex((item) => item.id === id && item.selectedColor === color);
  let newQuantity = document.getElementById("quantity_" + id).value;
  currentCart[index].selectedQuantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(currentCart));
  location.reload();
}

let totalQuantity = 0;
let totalPrice = 0;

currentCart.forEach((itemCart, /*index, array) fonction complète mais pas besoin la plupart du temps, 
revient à récupérer index=i*/) => {
  let items = document.getElementById("cart__items");
  fetch(`http://localhost:3000/api/products/${itemCart.id}`) // fait la requete avec l'id en paramètre
    .then(response => response.json())
    .then(data => {
      totalQuantity += parseInt(itemCart.selectedQuantity); 
      //on incrémente totalQuantity de la quantité sélectionnée de cet élément du panier
      totalPrice += parseInt(data.price) * parseInt(itemCart.selectedQuantity); 
      // on incrémente totalPrice du prix de cet élément du panier
      items.innerHTML += `<article class="cart__item" data-id="${itemCart.id}" 
      data-color="${itemCart.selectedColor}">
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
      document.getElementById("totalQuantity").innerHTML = totalQuantity;
      document.getElementById("totalPrice").innerHTML = totalPrice;
    })

})

const firstName = document.getElementById("firstName");
const firstNameErrorMessage = document.getElementById("firstNameErrorMsg");
const lastName = document.getElementById("lastName");
const lastNameErrorMessage = document.getElementById("lastNameErrorMsg");
const address = document.getElementById("address");
const addressErrorMessage = document.getElementById("addressErrorMsg");
const city = document.getElementById("city");
const cityErrorMessage = document.getElementById("cityErrorMsg");
const email = document.getElementById("email");
const emailErrorMessage = document.getElementById("emailErrorMsg");
const orderButton = document.getElementById("order");

firstName.addEventListener("change", (event) => { //on récupère les modif de firstName
  let value = event.target.value; //on récupère ce qu'on écrit à l'intérieur du champ
  if (value.trim() == "")/*supprime les espaces et les sauts de lignes*/ {
    firstNameErrorMessage.innerHTML = `Le prénom ne peut pas être vide`;

  } else {
    firstNameErrorMessage.innerHTML = "";

  }
});

lastName.addEventListener("change", (event) => { //on récupère les modif de firstName
  let value = event.target.value; //on récupère ce qu'on écrit à l'intérieur du champ
  if (value.trim() == "")/*supprime les espaces et les sauts de lignes*/ {
    lastNameErrorMessage.innerHTML = `Le nom ne peut pas être vide`;

  } else {
    lastNameErrorMessage.innerHTML = "";

  }
});

address.addEventListener("change", (event) => {
  let value = event.target.value;
  if (value.trim() == "") {
    addressErrorMessage.innerHTML = `L'adresse ne peut pas être vide`;

  } else {
    addressErrorMessage.innerHTML = "";

  }
});

city.addEventListener("change", (event) => {
  let value = event.target.value;
  if (value.trim() == "") {
    cityErrorMessage.innerHTML = `La ville ne peut pas être vide`;

  } else {
    cityErrorMessage.innerHTML = "";

  }
});



email.addEventListener("change", (event) => {
  let value = event.target.value;
  if (value.trim() == "") {
    emailErrorMessage.innerHTML = `L'email ne peut pas être vide`;

  } else {
    emailErrorMessage.innerHTML = "";

  }
});


orderButton.addEventListener("click", (event) => {
  /*vérification des champs*/
  if (firstName.value.trim() == "" || lastName.value.trim() == "" || address.value.trim() == "" || city.value.trim() == "" || email.value.trim() == "") {
    alert("Merci de remplir correctement les champs")
  } else {
    fetch(`http://localhost:3000/api/products/order`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }, //ce qu'on envoie c'est du JSON
      body: JSON.stringify({
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value
        },
        products: currentCart.map((currentItemCart) => currentItemCart.id) 
        //mapping de tous les objets vers tous les id des objets
      })
    })
      .then(response => response.json())
      .then(data => {
        let orderId = data.orderId;
        window.location.replace(`/front/html/confirmation.html?orderId=${orderId}`) 
        //redirection vers une url
        localStorage.setItem("cart", JSON.stringify([]));//vidage du panier
      })
      .catch(error => console.error(error))//différence de couleur d'écriture
  }
})

