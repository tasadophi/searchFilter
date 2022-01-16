// selectors
const searchInput = document.querySelector(".search-box");
const productsContainer = document.querySelector(".products");
const btns = document.querySelectorAll(".btn");
let products;
let filteredProduct = "";

// fucntions
const sepratePrice = (number) => {
  number += "";
  number = number.replace(",", "");
  let x = number.split(".");
  let y = x[0];
  let z = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, "$1" + "٫" + "$2");
  return y + z;
};

const renderProducts = (products, filter) => {
  const filtered = products.filter((product) => {
    return product.title.includes(filter) || product.category.includes(filter);
  });
  productsContainer.innerHTML = "";
  filtered.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    const productContent = `<div class="img-box">
              <img src="${product.image}" alt="p-${product.id}" />
            </div>
            <div class="product-desc">
              <div class="product-title">${product.title}</div>
              <div class="product-price">${sepratePrice(product.price)}</div>
            </div>`;
    productDiv.innerHTML = productContent;
    productsContainer.appendChild(productDiv);
  });
};

// events
document.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:3000/items").then((items) => {
    products = items.data;
    renderProducts(products, filteredProduct);
  });
});

searchInput.addEventListener("input", (e) => {
  filteredProduct = e.target.value;
  renderProducts(products, filteredProduct);
});

btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        filteredProduct = e.target.innerText;
        renderProducts(products, filteredProduct);
    })
})
