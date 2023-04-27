let products = [];
let brands = [];
let productss = []
const listProd = document.querySelector("ul");
const formProd = document.querySelector("form");
let selectOrd = document.querySelector("#ordenation");
let selectBrand = document.querySelector("#brand")

async function init() {
  [products] = await Promise.all([listProducts()]);
  selectOrd.addEventListener("click", selectedOrdenation)
  selectBrand.addEventListener("click", selectBrands)
  renderBrand();
  renderData();
  let testeValor = products.find((product)=> product.name === 'Dior Holiday Couture Collection')
  console.log(testeValor)
  productss = products;
}
init()

function selectedOrdenation() {
  clearSelection()
  if (formProd.ordenation.value == "a") {
    productss = productss.sort((a,b) => {
      return a.name.toLowerCase().trim() > b.name.toLowerCase().trim() ? 1 : -1
    }); 
    
    renderData()
    return productss
  }

  if (formProd.ordenation.value == "z") {
    productss = productss.sort((a,b) => {
      return a.name.toLowerCase().trim() < b.name.toLowerCase().trim() ? 1 : -1
    }); 
    renderData()
    return productss
  }

  if (formProd.ordenation.value == "melhor") {
    // productss = productss.sort((a,b) => {
    //   return a.name.toLowerCase().trim() < b.name.toLowerCase().trim() ? 1 : -1
    // }); 
    productss = productss.sort((a,b) => {
      return a.rating < b.rating ? 1 : -1
    }); 
    renderData()
    console.log(productss)
    return productss
  }

  if (formProd.ordenation.value == "menor") {
    productss = productss.sort((a,b) => {
      return a.price > b.price ? 1 : -1
    }); 
    
    renderData()
    return productss
  }

  if (formProd.ordenation.value == "maior") {
    productss = productss.sort((a,b) => {
      return a.name.toLowerCase().trim() < b.name.toLowerCase().trim() ? 1 : -1
    }); 
    productss = productss.sort((a,b) => {
      return a.price < b.price ? 1 : -1
    }); 
    
    renderData()
    return productss
  }

}

function selectBrands(){
  // console.log(formProd.brand.value)
  productss = productss.filter((product)=> product.brand !== null)
  // console.log(productss)
  // productss = productss.filter((product) => {
  //   // if (product.brand != null){
  //     return product.brand.includes(formProd.brand.value)
  //   // } 
  //   // console.log(product.brand)
  // })
  // console.log(productss)
  productss = productss.filter((product) => console.log(product.brand.includes(formProd.brand.value)))
  // console.log(productss)
}

function renderData() {
  listProd.innerHTML = "";
  console.log(productss);
  for (const product of productss) {
    // console.log(product.brand)
    let price = (Number(product.price) * 5.50).toFixed(2)
    product.price = price
    const li = document.createElement("li");
    const divProduct = document.createElement("div");
    const figureProduct = document.createElement("figure");
    const imgProduct = document.createElement("img")
    // imgProduct.src = product.image_link;
    imgProduct.src = "./lippie-pencil_grande.webp";
    const section = document.createElement("section");
    const h1ProductName = document.createElement("h1");
    h1ProductName.textContent = product.name;
    const divProductBrand = document.createElement("div");
    const spanBackBrand = document.createElement("span");
    spanBackBrand.textContent = product.brand;
    const spanBackPrice = document.createElement("span");
    spanBackPrice.textContent = `R$${product.price} ${product.id}`;
    li.appendChild(divProduct);
    divProduct.appendChild(figureProduct);
    divProduct.appendChild(section);
    figureProduct.appendChild(imgProduct);
    section.appendChild(h1ProductName);
    section.appendChild(divProductBrand);
    divProductBrand.appendChild(spanBackBrand);
    divProductBrand.appendChild(spanBackPrice);
    listProd.appendChild(li);
  }
}

function renderBrand(){
  for (const product of productss) {
    brands.push(product.brand)
  }
  brands = [...new Set(brands)];
  // console.log(brands);

  for (const brand of brands){
      const option = document.createElement("option");
      option.textContent = brand;
      option.value = brand;
      option.className = "brand"
      formProd.brand.appendChild(option);
  }
}



function clearSelection() {
  selectOrd = undefined;
}