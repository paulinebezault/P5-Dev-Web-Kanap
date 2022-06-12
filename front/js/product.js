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
    const title=document.getElementById("title");
    title.innerHTML=data.name;
    const price=document.getElementById("price");
    price.innerHTML=data.price;
    const description=document.getElementById("description");
    description.innerHTML=data.description;
    const colors=document.getElementById("colors");
    for (let i=0;i<data.colors.length;i++){
        colors.innerHTML+=`<option value="${data.colors[i]}">${data.colors[i]}</option>`
    }//pour chaque i commençant de zéro jusqu'à la taille de mon tableau de couleur

})