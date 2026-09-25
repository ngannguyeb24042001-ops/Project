// =============================================
// 1. DỮ LIỆU SẢN PHẨM
// =============================================

const products = [
  {
    id: 1,
    name: "Cà phê sữa",
    category: "coffee",
    price: 35000,
    image: "./images/ca-phe-sua.jpg",
    description: "Cà phê đậm vị hòa cùng sữa ngọt béo.",
    badge: "Bán chạy",
    hasSize: true,
  },
  {
    id: 2,
    name: "Bạc xỉu",
    category: "coffee",
    price: 39000,
    image: "./images/bac-xiu.jpg",
    description: "Nhiều sữa, ít cà phê, nhẹ nhàng và dễ uống.",
    badge: "",
    hasSize: true,
  },
  {
    id: 3,
    name: "Cappuccino",
    category: "coffee",
    price: 45000,
    image: "./images/cappuccino.webp",
    description: "Espresso thơm nồng cùng lớp bọt sữa mềm mịn.",
    badge: "",
    hasSize: true,
  },
  {
    id: 4,
    name: "Matcha Latte",
    category: "non-coffee",
    price: 49000,
    image: "./images/matcha-latte.jpg",
    description: "Matcha thanh nhẹ kết hợp cùng sữa tươi béo dịu.",
    badge: "Bán chạy",
    hasSize: true,
  },
  {
    id: 5,
    name: "Chocolate đá xay",
    category: "non-coffee",
    price: 49000,
    image: "./images/chocolate-da-xay.jpg",
    description: "Chocolate mát lạnh, ngọt dịu và thơm béo.",
    badge: "Món mới",
    hasSize: true,
  },
  {
    id: 6,
    name: "Bánh sừng bò bơ",
    category: "bakery",
    price: 35000,
    image: "./images/banh-sung-bo.jpg",
    description: "Vỏ bánh nhiều lớp giòn nhẹ, thơm mùi bơ.",
    badge: "",
    hasSize: false,
  },
  {
    id: 7,
    name: "Bánh Tiramisu",
    category: "bakery",
    price: 49000,
    image: "./images/tiramisu.jpeg",
    description: "Bánh mềm mịn với vị cacao và cà phê hài hòa.",
    badge: "Bán chạy",
    hasSize: false,
  },
  {
    id: 8,
    name: "Bánh Cheesecake",
    category: "bakery",
    price: 45000,
    image: "./images/cheesecake.jpg",
    description: "Vị phô mai béo mịn kết hợp cùng đế bánh giòn.",
    badge: "",
    hasSize: false,
  },
];

// =============================================
// 2. LẤY CÁC PHẦN TỬ HTML
// =============================================

const screens = document.querySelectorAll(".screen");

const btnStart = document.querySelector("#btnStart");
const btnDineIn = document.querySelector("#btnDineIn");
const btnTakeAway = document.querySelector("#btnTakeAway");
const btnBackWelcome = document.querySelector("#btnBackWelcome");

const productList = document.querySelector("#productList");
const categoryButtons = document.querySelectorAll(".category-button");
const btnOpenCart = document.querySelector("#btnOpenCart");
const cartCount = document.querySelector("#cartCount");
const orderTypeLabel = document.querySelector("#orderTypeLabel");
const cartOrderTypeLabel = document.querySelector("#cartOrderTypeLabel");

const productModal = document.querySelector("#productModal");
const modalImage = document.querySelector("#modalImage");
const modalName = document.querySelector("#modalName");
const modalDescription = document.querySelector("#modalDescription");
const modalPrice = document.querySelector("#modalPrice");
const modalQuantity = document.querySelector("#modalQuantity");
const sizeArea = document.querySelector("#sizeArea");
const sizeButtons = document.querySelectorAll(".size-button");
const btnCloseModal = document.querySelector("#btnCloseModal");
const btnDecrease = document.querySelector("#btnDecrease");
const btnIncrease = document.querySelector("#btnIncrease");
const btnAddToCart = document.querySelector("#btnAddToCart");

const cartList = document.querySelector("#cartList");
const summaryQuantity = document.querySelector("#summaryQuantity");
const summaryTotal = document.querySelector("#summaryTotal");
const btnBackMenu = document.querySelector("#btnBackMenu");
const btnConfirmOrder = document.querySelector("#btnConfirmOrder");

const orderNumber = document.querySelector("#orderNumber");
const successOrderType = document.querySelector("#successOrderType");
const successTotal = document.querySelector("#successTotal");
const btnNewOrder = document.querySelector("#btnNewOrder");
const toast = document.querySelector("#toast");
const btnBackOrderType = document.querySelector("#btnBackOrderType");

// =============================================
// 3. KHAI BÁO BIẾN
// =============================================

let orderType = "";
let cart = [];

let selectedProduct = null;
let selectedSize = "M";
let selectedQuantity = 1;

// =============================================
// 4. CÁC HÀM DÙNG CHUNG
// =============================================

function showScreen(screenId) {
  for (let i = 0; i < screens.length; i++) {
    screens[i].classList.remove("active");
  }

  const selectedScreen = document.querySelector("#" + screenId);
  selectedScreen.classList.add("active");

  window.scrollTo(0, 0);
}

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

function saveCart() {
  localStorage.setItem("myHometownCart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem("myHometownCart");

  if (savedCart !== null) {
    try {
      cart = JSON.parse(savedCart);
    } catch (error) {
      cart = [];
    }
  }
}

function getOrderTypeName() {
  if (orderType === "dine-in") {
    return "Dùng tại quán";
  }

  return "Mang đi";
}

function getCategoryName(category) {
  if (category === "coffee") {
    return "CÀ PHÊ";
  }

  if (category === "non-coffee") {
    return "ĐỒ UỐNG KHÁC";
  }

  return "BÁNH NGỌT";
}

function showToast() {
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 1800);
}

// =============================================
// 5. CHUYỂN MÀN HÌNH VÀ CHỌN HÌNH THỨC
// =============================================

btnStart.onclick = function () {
  showScreen("orderTypeScreen");
};

btnBackWelcome.onclick = function () {
  showScreen("welcomeScreen");
};

btnBackOrderType.onclick = function () {
  showScreen("orderTypeScreen");
};

btnDineIn.onclick = function () {
  orderType = "dine-in";
  orderTypeLabel.innerText = "☕ Dùng tại quán";
  cartOrderTypeLabel.innerText = "☕ Dùng tại quán";
  showScreen("menuScreen");
};

btnTakeAway.onclick = function () {
  orderType = "take-away";
  orderTypeLabel.innerText = "🥤 Mang đi";
  cartOrderTypeLabel.innerText = "🥤 Mang đi";
  showScreen("menuScreen");
};

// =============================================
// 6. HIỂN THỊ VÀ LỌC SẢN PHẨM
// =============================================

function displayProducts(category) {
  productList.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    if (category === "all" || product.category === category) {
      let badgeHTML = "";

      if (product.badge !== "") {
        badgeHTML = '<span class="product-badge">' + product.badge + "</span>";
      }

      productList.innerHTML += `
                <article class="product-card">
                    <div class="product-image-box">
                        ${badgeHTML}
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <span class="product-type">${getCategoryName(product.category)}</span>
                        <h3>${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-bottom">
                            <span class="product-price">Từ ${formatPrice(product.price)}</span>
                            <button class="add-button" onclick="openProductModal(${product.id})">+</button>
                        </div>
                    </div>
                </article>
            `;
    }
  }
}

for (let i = 0; i < categoryButtons.length; i++) {
  categoryButtons[i].onclick = function () {
    for (let j = 0; j < categoryButtons.length; j++) {
      categoryButtons[j].classList.remove("active");
    }

    this.classList.add("active");

    const selectedCategory = this.getAttribute("data-category");
    displayProducts(selectedCategory);
  };
}

// =============================================
// 7. HỘP CHỌN SIZE VÀ SỐ LƯỢNG
// =============================================

function openProductModal(productId) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      selectedProduct = products[i];
    }
  }

  selectedSize = selectedProduct.hasSize ? "M" : "Không có";
  selectedQuantity = 1;

  modalImage.src = selectedProduct.image;
  modalName.innerText = selectedProduct.name;
  modalDescription.innerText = selectedProduct.description;
  modalQuantity.innerText = selectedQuantity;

  if (selectedProduct.hasSize === true) {
    sizeArea.style.display = "block";
  } else {
    sizeArea.style.display = "none";
  }

  for (let i = 0; i < sizeButtons.length; i++) {
    sizeButtons[i].classList.remove("active");

    if (sizeButtons[i].getAttribute("data-size") === "M") {
      sizeButtons[i].classList.add("active");
    }
  }

  updateModalPrice();
  productModal.classList.add("show");
}

function closeProductModal() {
  productModal.classList.remove("show");
}

function getSelectedUnitPrice() {
  let unitPrice = selectedProduct.price;

  if (selectedProduct.hasSize === true && selectedSize === "L") {
    unitPrice = unitPrice + 10000;
  }

  return unitPrice;
}

function updateModalPrice() {
  const totalPrice = getSelectedUnitPrice() * selectedQuantity;
  modalPrice.innerText = formatPrice(totalPrice);
}

btnCloseModal.onclick = function () {
  closeProductModal();
};

for (let i = 0; i < sizeButtons.length; i++) {
  sizeButtons[i].onclick = function () {
    for (let j = 0; j < sizeButtons.length; j++) {
      sizeButtons[j].classList.remove("active");
    }

    this.classList.add("active");
    selectedSize = this.getAttribute("data-size");
    updateModalPrice();
  };
}

btnDecrease.onclick = function () {
  if (selectedQuantity > 1) {
    selectedQuantity--;
    modalQuantity.innerText = selectedQuantity;
    updateModalPrice();
  }
};

btnIncrease.onclick = function () {
  selectedQuantity++;
  modalQuantity.innerText = selectedQuantity;
  updateModalPrice();
};

// =============================================
// 8. THÊM VÀO GIỎ HÀNG
// =============================================

btnAddToCart.onclick = function () {
  const unitPrice = getSelectedUnitPrice();
  let existingItem = null;

  for (let i = 0; i < cart.length; i++) {
    if (
      cart[i].productId === selectedProduct.id &&
      cart[i].size === selectedSize
    ) {
      existingItem = cart[i];
    }
  }

  if (existingItem !== null) {
    existingItem.quantity = existingItem.quantity + selectedQuantity;
  } else {
    const newItem = {
      productId: selectedProduct.id,
      name: selectedProduct.name,
      image: selectedProduct.image,
      size: selectedSize,
      unitPrice: unitPrice,
      quantity: selectedQuantity,
    };

    cart.push(newItem);
  }

  saveCart();
  updateCartCount();
  closeProductModal();
  showToast();
};

productModal.onclick = function (event) {
  if (event.target === productModal) {
    closeProductModal();
  }
};

document.onkeydown = function (event) {
  if (event.key === "Escape") {
    closeProductModal();
  }
};

function updateCartCount() {
  let totalQuantity = 0;

  for (let i = 0; i < cart.length; i++) {
    totalQuantity = totalQuantity + cart[i].quantity;
  }

  cartCount.innerText = totalQuantity;
}

// =============================================
// 9. HIỂN THỊ VÀ CẬP NHẬT GIỎ HÀNG
// =============================================

btnOpenCart.onclick = function () {
  displayCart();
  showScreen("cartScreen");
};

btnBackMenu.onclick = function () {
  showScreen("menuScreen");
};

function displayCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = `
            <div class="empty-cart">
                <span>🛒</span>
                <h3>Đơn hàng đang trống</h3>
                <p>Hãy quay lại thực đơn và chọn món bạn yêu thích.</p>
            </div>
        `;
  }

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const itemTotal = item.unitPrice * item.quantity;

    let sizeText = "Không chọn size";

    if (item.size !== "Không có") {
      sizeText = "Size " + item.size;
    }

    cartList.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>${sizeText} · ${formatPrice(item.unitPrice)}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="decreaseCartItem(${i})">−</button>
                    <strong>${item.quantity}</strong>
                    <button onclick="increaseCartItem(${i})">+</button>
                    <button class="delete-button" onclick="removeCartItem(${i})">×</button>
                </div>
                <strong class="cart-item-price">${formatPrice(itemTotal)}</strong>
            </div>
        `;
  }

  updateCartSummary();
}

function increaseCartItem(index) {
  cart[index].quantity++;
  saveCart();
  updateCartCount();
  displayCart();
}

function decreaseCartItem(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }

  saveCart();
  updateCartCount();
  displayCart();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  displayCart();
}

function getCartTotal() {
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].unitPrice * cart[i].quantity;
  }

  return total;
}

function updateCartSummary() {
  let totalQuantity = 0;

  for (let i = 0; i < cart.length; i++) {
    totalQuantity = totalQuantity + cart[i].quantity;
  }

  summaryQuantity.innerText = totalQuantity;
  summaryTotal.innerText = formatPrice(getCartTotal());
}

// =============================================
// 10. XÁC NHẬN ĐƠN HÀNG
// =============================================

btnConfirmOrder.onclick = function () {
  if (cart.length === 0) {
    alert("Bạn chưa chọn món nào.");
    return;
  }

  const randomNumber = Math.floor(Math.random() * 900) + 100;
  const finalTotal = getCartTotal();

  orderNumber.innerText = "A" + randomNumber;
  successOrderType.innerText = getOrderTypeName();
  successTotal.innerText = formatPrice(finalTotal);

  showScreen("successScreen");
};

// =============================================
// 11. TẠO ĐƠN HÀNG MỚI
// =============================================

btnNewOrder.onclick = function () {
  cart = [];
  orderType = "";

  localStorage.removeItem("myHometownCart");

  updateCartCount();
  displayProducts("all");
  showScreen("welcomeScreen");
};

// =============================================
// 12. CHẠY KHI TRANG WEB VỪA MỞ
// =============================================

loadCart();
updateCartCount();
displayProducts("all");
