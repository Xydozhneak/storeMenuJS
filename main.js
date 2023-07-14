const categoryList = [
  {
    category: 'Laptops',
    items: {
      hp: [10000, 'RAM = 8GB', 'SSD = 256GB', 'Processor = Intel Core i5'],
      lenovo: [21000, 'RAM = 16GB', 'SSD = 512GB', 'Processor = Intel Core i7'],
      dell: [15000, 'RAM = 12GB', 'SSD = 1TB', 'Processor = Intel Core i7'],
      msi: [12000, 'RAM = 16GB', 'SSD = 1TB', 'Processor = AMD Ryzen 7'],
    }
  },
  {
    category: 'Tv',
    items: {
      lg: [28000, 'ROM = 54GB', 'RAM = 4GB', 'Type of display - OLED', 'COLOR BLUE'],
      samsung: [28000, 'ROM = 54GB', 'RAM = 4GB', 'Type of display - OLED', 'COLOR BLUE'],
      sony: [28000, 'ROM = 344GB', 'RAM = 4GB', 'Type of display - OLED', 'COLOR BLUE'],
      kivi: [28000, 'ROM = 534GB', 'RAM = 4GB', 'Type of display - OLED', 'COLOR BLUE'],
    }
  },
  {
    category: 'Smartphones',
    items: {
      iphone12: [28000, 'ROM = 64GB', 'RAM = 4GB', 'Type of display - OLED', 'COLOR BLUE'],
      iphone13: [30000, 'ROM = 128GB', 'RAM = 4GB', 'Type of display - OLED', 'COLOR BLUE'],
      galaxys22: [28000, 'ROM = 256GB', 'RAM = 12GB', 'Type of display - AMALED', 'COLOR BLUE'],
    }
  }
];
const cities = ["Odesa", "Harkiv", "Lviv", "Mykolaiv"];

let orders = [];

const fullNameField = document.querySelector("#fullNameField");
const citySelect = document.querySelector("#citySelect");
const branchField = document.querySelector("#branchField");
const codPayment = document.querySelector("#codPayment");
const cardPayment = document.querySelector("#cardPayment");
const quantityField = document.querySelector("#quantityField");
const commentField = document.querySelector("#commentField");
const confirmButton = document.querySelector("#confirm");
const buyButton = document.createElement('button');
buyButton.textContent = 'Buy';
const categoryContainer = document.querySelector('#category');
const listContainer = document.querySelector('#list');
const infoContainer = document.querySelector('#info');
const orderForm = document.querySelector('#myForm');
const orderListBtn = document.createElement('button');
orderListBtn.id = "orderListBtn";
orderListBtn.textContent = "Order List";
const orderList = document.createElement('div');
orderList.classList.add('orderList','d-none');
const categoryHold = document.createElement('div');
categoryHold.append(categoryContainer);
categoryHold.append(orderList, orderListBtn);
document.body.prepend(categoryHold);

categoryList.forEach(item => {
  const categoryItem = document.createElement('li');
  categoryItem.textContent = item.category;
  categoryItem.classList.add('categoryItem');
  categoryItem.addEventListener('click', () => {
    showItems(item.items);
  });
  categoryContainer.append(categoryItem);
});

let selectedProduct;

function showItems(items) {
  listContainer.innerHTML = '';
  infoContainer.innerHTML = '';
  for (let key in items) {
    const listItem = document.createElement('li');
    listItem.textContent = `${key}`;
    listItem.addEventListener('click', () => {
      selectedProduct = [key];
      selectedProductInfo = items[key];
      showInfo(items[key]);
    });
    listContainer.append(listItem);
  }
}

function showInfo(info) {
  infoContainer.innerHTML = '';
  infoContainer.append(buyButton);
  buyButton.addEventListener('click', showForm);
  info.forEach(item => {
    const infoItem = document.createElement('li');
    infoItem.textContent = item;
    infoContainer.append(infoItem);
  });
}

function clearList() {
  listContainer.innerHTML = '';
  infoContainer.innerHTML = '';
  categoryHold.innerHTML = '';
}

function showForm() {
  citySelect.innerHTML = '';
  clearList();
  document.body.style.backgroundColor = 'hwb(0 28% 69% / 0.226)';
  cities.forEach(item => {
    const currentCity = document.createElement('option');
    currentCity.value = item;
    currentCity.textContent = `${item}`;
    citySelect.append(currentCity);
  })
  orderForm.classList.remove('d-none');
}

function checkFields() {
  if (!fullNameField.value || !citySelect.value || !branchField.value || (!codPayment.checked && !cardPayment.checked) || !quantityField.value) {
    alert('Please fill in all the order form fields.');
    return false;
  }
  return true;
}

confirmButton.addEventListener('click', handleConfirm);

function handleConfirm(event) {
  event.preventDefault();
  if (checkFields()) {
    const orderData = {
      fullName: fullNameField.value,
      city: citySelect.value,
      branch: branchField.value,
      paymentMethod: codPayment.checked ? 'COD' : 'Card',
      quantity: quantityField.value,
      comment: commentField.value,
      selectedProduct: selectedProduct,
      selectedProductInfo: selectedProductInfo,
      date: new Date(),
      cost: selectedProductInfo[0],
    };
    orderForm.innerHTML = `
      <h2>Your order was confirmed</h2>
      <p>city: ${orderData.city}</p>
      <p>branch: ${orderData.branch}</p>
      <p>Product: ${selectedProduct}</p>
      <p>Product Details: ${selectedProductInfo}</p>
    `;
    if (localStorage.getItem('orders')) {
      orders = JSON.parse(localStorage.getItem('orders'));
    }
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    setTimeout(() => {
      location.reload();
    }, 3000);
  }
}

function showOrderList() {
  orderList.innerHTML = '';
  if (localStorage.getItem('orders')) {
    orders = JSON.parse(localStorage.getItem('orders'));
  };
  if (orders.length === 0) {
    orderList.textContent =" NO ORDERS FOUND";
  } else {
    orders.forEach((order, index) => {
      const orderItem = document.createElement('div');
      orderItem.classList.add('order-item');

      const orderSummary = document.createElement('p');
      orderSummary.textContent = `Order ${index + 1}  Cost: ${order.cost} Date : ${order.date} `;
      orderItem.append(orderSummary);

      const orderDetails = document.createElement('ul');
      orderDetails.classList.add('d-none');
      const productInfo = document.createElement('li');
      productInfo.textContent = `Product: ${order.selectedProduct} Info: ${order.selectedProductInfo}`;
      orderDetails.append(productInfo);
      orderItem.append(orderDetails);

      orderSummary.addEventListener('click', () => {
        orderDetails.classList.toggle('d-none');
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete');
      deleteButton.addEventListener('click', () => {
        deleteOrder(index);
      });
      orderItem.append(deleteButton);
      orderList.append(orderItem);
    });
  }
}

function deleteOrder(index) {
  orders.splice(index, 1);
  localStorage.setItem('orders', JSON.stringify(orders));
  showOrderList();
}

orderListBtn.addEventListener('click', () => {
  orderList.classList.toggle('d-none');
  categoryContainer.classList.toggle('d-none');
  showOrderList();
});
