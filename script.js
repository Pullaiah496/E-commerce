const cartCountElem = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartModal = document.getElementById('cart-modal');
const cartItemsElem = document.getElementById('cart-items');
const totalPriceElem = document.getElementById('total-price');
const closeCartBtn = document.getElementById('close-cart');
const viewCartBtn = document.getElementById('view-cart');

let cart = {};

function updateCartUI() {
    const items = Object.values(cart);
    let totalQty = 0;
    let totalPrice = 0;

    cartItemsElem.innerHTML = '';

    items.forEach(item => {
        totalQty += item.qty;
        totalPrice += item.qty * item.price;

        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.qty} - $${(item.qty * item.price).toFixed(2)}`;
        cartItemsElem.appendChild(li);
    });

    cartCountElem.textContent = totalQty;
    totalPriceElem.textContent = totalPrice.toFixed(2);
}

function addToCart(productElem) {
    const id = productElem.dataset.id;
    const price = parseFloat(productElem.dataset.price);
    const name = productElem.dataset.name;

    if (cart[id]) {
        cart[id].qty += 1;
    } else {
        cart[id] = { name, price, qty: 1 };
    }

    updateCartUI();
}

addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productElem = e.target.closest('.product');
        addToCart(productElem);
    });
});

viewCartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Optional: close modal if clicking outside content
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});
