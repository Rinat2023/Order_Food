const cartImage = document.getElementById('cart_image');
const modalContainer = document.getElementsByClassName('modal_container');
const background_for_modal = document.getElementsByClassName(
  'background_for_modal'
);
const carts = document.getElementById('carts') as HTMLDivElement;

cartImage?.addEventListener('click', () => {
  (modalContainer[0] as HTMLButtonElement).style.display = 'block';
  carts.innerHTML = '';
  renderCart();
});

background_for_modal[0].addEventListener('click', () => {
  (modalContainer[0] as HTMLButtonElement).style.display = 'none';
});

type FoodT = {
  name: string;
  price: number;
  amount?: number;
  id: number;
};

const foodsData: FoodT[] = [
  { name: 'Лазанья', price: 4, id: Math.random() },
  { name: 'Суши', price: 5, id: Math.random() },
  { name: 'Стейк', price: 18, id: Math.random() },
  { name: 'Паэлья', price: 11, id: Math.random() },
  { name: 'Шоколадный фондю', price: 100, id: Math.random() },
];

const renderFoods = () => {
  const content = document.getElementsByClassName('content');
  for (let i = 0; i < foodsData.length; i++) {
    const food_container = document.createElement('div');
    food_container.classList.add('food_container');
    const food_nameContainer = document.createElement('div');
    food_nameContainer.classList.add('food_name-container');
    const priceOfFood = document.createElement('span');
    priceOfFood.innerHTML = String(`${foodsData[i].price}$`);
    const nameOfFood = document.createElement('span');
    nameOfFood.innerHTML = String(foodsData[i].name);
    food_nameContainer.append(priceOfFood, nameOfFood);
    const add_to_cartContainer = document.createElement('div');
    add_to_cartContainer.classList.add('add_to_cart-container');
    const amount_input = document.createElement('input');
    amount_input.classList.add('amount_input');
    amount_input.setAttribute('type', 'number');
    amount_input.setAttribute('max', '10');
    amount_input.setAttribute('min', '0');
    amount_input.setAttribute('placeholder', '0');
    const add_button = document.createElement('button');
    add_button.classList.add('add_button');
    add_button.innerText = 'ADD';
    add_button.addEventListener('click', () => {
      addNewCart(
        foodsData[i].name,
        Number(amount_input.value),
        foodsData[i].price,
        foodsData[i].id
      );
      content[0].innerHTML = '';
      amount_input.innerText = '';
      renderFoods();
    });
    add_to_cartContainer.append(amount_input, add_button);
    food_container.append(food_nameContainer, add_to_cartContainer);
    content[0].append(food_container);
  }
};
renderFoods();

let cartArray: FoodT[] = [];

const addNewCart = (
  name: string,
  amount: number,
  price: number,
  id: number
) => {
  const data: FoodT = {
    name,
    amount: amount !== 0 ? amount : 1,
    price,
    id,
  };
  cartArray.push(data);
};

let price = 0;
const renderPrice = () => {
  price = 0;
  const priceDiv = document.getElementById('price') as HTMLDivElement;
  for (let i = 0; i < cartArray.length; i++) {
    price = price + cartArray[i].price * cartArray[i].amount;
  }
  priceDiv.innerText = `price: ${price}$`;
};

const renderCart = () => {
  carts.innerHTML = '';
  for (let i = 0; i < cartArray.length; i++) {
    const cart = document.createElement('div');
    cart.classList.add('cart');
    const name = document.createElement('span');
    name.innerText = cartArray[i].name;
    const price = document.createElement('span');
    price.innerText = String(`${cartArray[i].price}$`);
    const modal_input = document.createElement('input');
    modal_input.addEventListener('change', () => {
      cartArray[i].amount = Number(modal_input.value);
      renderPrice();
      if (cartArray[i].amount === 0) {
        cartArray = cartArray.filter((el) => el.id !== cartArray[i].id);
        renderCart();
      }
    });
    modal_input.classList.add('modal_input');
    modal_input.setAttribute('type', 'number');
    modal_input.setAttribute('max', '10');
    modal_input.setAttribute('min', '0');
    modal_input.setAttribute('placeholder', '0');
    modal_input.value = String(cartArray[i].amount);
    cart.append(name, price, modal_input);
    carts.prepend(cart);
  }
  renderPrice();
};

renderCart();

const buy_button = document.getElementsByClassName('buy_button');
buy_button[0].addEventListener('click', () => {
  alert(
    cartArray.map((el) => {
      return `${el.name}: ${el.amount}`;
    })
  );
  alert(`price: ${price}$`);
});
