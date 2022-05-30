const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id= urlParams.get("id");
console.log(id);
fetch(`http://localhost:3000/api/products/${id}`) // fait la requete avec l'id en paramètre
.then(response=>response.json())
.then(data=>{
    console.log(data);
    const image=document.getElementsByClassName("item__img")[0];
    image.innerHTML=`<img src="${data.imageUrl}" alt="Photographie d'un canapé"></img>`
})