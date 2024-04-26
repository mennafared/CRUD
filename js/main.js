var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");

var addProductButton = document.getElementById("addProductButton");
var updateProductBuuton = document.getElementById("updateProductBuuton");

var updatedProductIndex;

var productsList = [];

if (localStorage.getItem("ourProduct") != null) {
  productsList = JSON.parse(localStorage.getItem("ourProduct"))
  displayProduct(productsList);
}

function addProduct() {
  var product = {
    productName: productNameInput.value,
    productPrice: productPriceInput.value,
    productCategory: productCategoryInput.value,
    productDescription: productDescriptionInput.value,
    productImage: productImageInput.files[0].name
  }

  productsList.push(product);
  localStorage.setItem("ourProduct" , JSON.stringify(productsList));
  // console.log(productsList);
  resetProduct();
  displayProduct(productsList);
}

function resetProduct() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = "Choose Product Category";
  productDescriptionInput.value = null;
  productImageInput.files[0].name = null;
}

function displayProduct(arr) {
  containerElement = ``;
  for (var i = 0; i < arr.length; i++) {
    containerElement += `<div class="col mb-4">
    <div class="border shadow-sm p-2">
      <div class="product-img mb-4">
        <img src="./images/${arr[i].productImage}" class="w-100 h-100 object-fit-contain" alt="">
      </div>
      <h3 class="fs-5">${arr[i].productName}</h3>
      <p class="fs-6 text-secondary">${arr[i].productDescription}.</p>
      <p><span class="fw-semibold">Category: </span>${arr[i].productCategory}</p>
      <div class="d-flex justify-content-between pe-3">
        <p class="fw-semibold">${arr[i].productPrice} EGP</p>
        <div>
          <i onclick="deleteProduct(${i})" class="fa-solid fa-trash-can fs-5 text-danger"></i>
          <i onclick="moveProductDetailsToInputs(${i})" class="fa-solid fa-pen-to-square fs-5 text-success"></i>
        </div>
      </div>
    </div>
  </div>`;

  }
  productContainerElement.innerHTML = containerElement;
}

function deleteProduct(deletedIndex) {
  productsList.splice(deletedIndex,1);
  localStorage.setItem("ourProduct" , JSON.stringify(productsList));
  displayProduct(productsList);
}

function moveProductDetailsToInputs(index) {
  productNameInput.value = productsList[index].productName;
  productPriceInput.value = productsList[index].productPrice;
  productCategoryInput.value = productsList[index].productCategory;
  productDescriptionInput.value = productsList[index].productDescription;

  addProductButton.classList.replace("d-block" , "d-none");
  updateProductBuuton.classList.replace("d-none" , "d-block");

  updatedProductIndex = index ;
  
}

function updateProduct() {
  productsList[updatedProductIndex].productName = productNameInput.value;
  productsList[updatedProductIndex].productPrice = productPriceInput.value;
  productsList[updatedProductIndex].productCategory = productCategoryInput.value;
  productsList[updatedProductIndex].productDescription = productDescriptionInput.value;

  if (productImageInput.files.length != 0) {
    productsList[updatedProductIndex].productImage = productImageInput.files[0].name;
  }

  displayProduct(productsList);
  localStorage.setItem("ourProduct" , JSON.stringify(productsList));

  addProductButton.classList.replace("d-none" , "d-block");
  updateProductBuuton.classList.replace("d-block" , "d-none");

}

function searchProduct(term) {
  var filteredProducts = [];

  for (var i = 0; i < productsList.length; i++) {
    
    if(productsList[i].productName.toLowerCase().includes(term.toLowerCase()) == true){
      filteredProducts.push(productsList[i])
    }

  }

  displayProduct(filteredProducts);
}