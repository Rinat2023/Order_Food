var cartImage = document.getElementById('cart_image');
var modalContainer = document.getElementsByClassName('modal_container');
var background_for_modal = document.getElementsByClassName('background_for_modal');
var carts = document.getElementById('carts');
cartImage === null || cartImage === void 0 ? void 0 : cartImage.addEventListener('click', function () {
    modalContainer[0].style.display = 'block';
    carts.innerHTML = '';
    renderCart();
});
background_for_modal[0].addEventListener('click', function () {
    modalContainer[0].style.display = 'none';
});
var foodsData = [
    { name: 'Лазанья', price: 4, id: Math.random() },
    { name: 'Суши', price: 5, id: Math.random() },
    { name: 'Стейк', price: 18, id: Math.random() },
    { name: 'Паэлья', price: 11, id: Math.random() },
    { name: 'Шоколадный фондю', price: 100, id: Math.random() },
];
var renderFoods = function () {
    var content = document.getElementsByClassName('content');
    var _loop_1 = function (i) {
        var food_container = document.createElement('div');
        food_container.classList.add('food_container');
        var food_nameContainer = document.createElement('div');
        food_nameContainer.classList.add('food_name-container');
        var priceOfFood = document.createElement('span');
        priceOfFood.innerHTML = String("".concat(foodsData[i].price, "$"));
        var nameOfFood = document.createElement('span');
        nameOfFood.innerHTML = String(foodsData[i].name);
        food_nameContainer.append(priceOfFood, nameOfFood);
        var add_to_cartContainer = document.createElement('div');
        add_to_cartContainer.classList.add('add_to_cart-container');
        var amount_input = document.createElement('input');
        amount_input.classList.add('amount_input');
        amount_input.setAttribute('type', 'number');
        amount_input.setAttribute('max', '10');
        amount_input.setAttribute('min', '0');
        amount_input.setAttribute('placeholder', '0');
        var add_button = document.createElement('button');
        add_button.classList.add('add_button');
        add_button.innerText = 'ADD';
        add_button.addEventListener('click', function () {
            addNewCart(foodsData[i].name, Number(amount_input.value), foodsData[i].price, foodsData[i].id);
            content[0].innerHTML = '';
            amount_input.innerText = '';
            renderFoods();
        });
        add_to_cartContainer.append(amount_input, add_button);
        food_container.append(food_nameContainer, add_to_cartContainer);
        content[0].append(food_container);
    };
    for (var i = 0; i < foodsData.length; i++) {
        _loop_1(i);
    }
};
renderFoods();
var cartArray = [];
var addNewCart = function (name, amount, price, id) {
    var data = {
        name: name,
        amount: amount !== 0 ? amount : 1,
        price: price,
        id: id,
    };
    cartArray.push(data);
};
var price = 0;
var renderPrice = function () {
    price = 0;
    var priceDiv = document.getElementById('price');
    for (var i = 0; i < cartArray.length; i++) {
        price = price + cartArray[i].price * cartArray[i].amount;
    }
    priceDiv.innerText = "price: ".concat(price, "$");
};
var renderCart = function () {
    carts.innerHTML = '';
    var _loop_2 = function (i) {
        var cart = document.createElement('div');
        cart.classList.add('cart');
        var name_1 = document.createElement('span');
        name_1.innerText = cartArray[i].name;
        var price_1 = document.createElement('span');
        price_1.innerText = String("".concat(cartArray[i].price, "$"));
        var modal_input = document.createElement('input');
        modal_input.addEventListener('change', function () {
            cartArray[i].amount = Number(modal_input.value);
            renderPrice();
            if (cartArray[i].amount === 0) {
                cartArray = cartArray.filter(function (el) { return el.id !== cartArray[i].id; });
                renderCart();
            }
        });
        modal_input.classList.add('modal_input');
        modal_input.setAttribute('type', 'number');
        modal_input.setAttribute('max', '10');
        modal_input.setAttribute('min', '0');
        modal_input.setAttribute('placeholder', '0');
        modal_input.value = String(cartArray[i].amount);
        cart.append(name_1, price_1, modal_input);
        carts.prepend(cart);
    };
    for (var i = 0; i < cartArray.length; i++) {
        _loop_2(i);
    }
    renderPrice();
};
renderCart();
var buy_button = document.getElementsByClassName('buy_button');
buy_button[0].addEventListener('click', function () {
    alert(cartArray.map(function (el) {
        return "".concat(el.name, ": ").concat(el.amount);
    }));
    alert("price: ".concat(price, "$"));
});
