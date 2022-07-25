
fetch("http://localhost:3000/api/products")
  .then(response => response.json())
  /*fetch a récup la donnée à l'url donnée, 
  quand il a résolu il va dans le then; 
  il attribut le résultat dans la variable response puis la convertit*/
  .then(data => {
    const DOMItems = document.getElementById("items")
    for (let i = 0; i <= data.length; i++) {
      let element = data[i] //pour chaque i allant de 0 à la taille du tableau je prends l'élément i du tableau
      DOMItems.innerHTML +=
        `<a href="./product.html?id=${element._id}">
    <article>
      <img src="${element.imageUrl}" alt="${element.altTxt}">
      <h3 class="productName">${element.name}</h3>
      <p class="productDescription">${element.description}</p>
    </article>
  </a>`
    }
  })