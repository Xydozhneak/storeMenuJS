
const categoryList = [
  {
    category: 'laptops',
    items: {
      hp: [10000, 'RAM = 8GB', 'SSD = 256GB', 'Processor = Intel Core i5'],
      lenovo: [21000, 'RAM = 16GB', 'SSD = 512GB', 'Processor = Intel Core i7'],
      dell: [15000, 'RAM = 12GB', 'SSD = 1TB', 'Processor = Intel Core i7'],
      msi: [12000, 'RAM = 16GB', 'SSD = 1TB', 'Processor = AMD Ryzen 7'],
    }
  },
  {
    category: 'tv',
    items: {
      lg: [28000, 'ROM = 54GB', 'RAM = 4GB', 'Type of display - OLED', 'COLOR BLUE'],
      samsung: [28000, 'ROM = 54GB', 'RAM = 4GB', 'Type of display - OLED', 'COLOR BLUE'],
      sony: [28000, 'ROM = 344GB', 'RAM = 4GB', 'Type of display - OLED', 'COLOR BLUE'],
      kivi: [28000, 'ROM = 534GB', 'RAM = 4GB', 'Type of display - OLED', 'COLOR BLUE'],
    }
  },
  {
    category: 'smartphones',
    items: {
      iphone12: [28000, 'ROM = 64GB', 'RAM = 4GB', 'Type of display - OLED', 'COLOR BLUE'],
      iphone13: [30000, 'ROM = 128GB', 'RAM = 4GB', 'Type of display - OLED', 'COLOR BLUE'],
      galaxys22: [28000, 'ROM = 256GB', 'RAM = 12GB', 'Type of display - AMALED', 'COLOR BLUE'],
    }
  }
];

const categoryContainer = document.querySelector('#category');
const listContainer = document.querySelector('#list');
const infoContainer = document.querySelector('#info');

categoryList.forEach(item => {
  const categoryItem = document.createElement('li');
  categoryItem.textContent = item.category;
  categoryItem.addEventListener('click', () => {
    showItems(item.items);
  });
  categoryContainer.append(categoryItem);
});

function showItems(items) {
  for (let key in items) {
    const listItem = document.createElement('li');
    listItem.textContent = `${key}`;
    listItem.addEventListener('click', () => {
      showInfo(items[key]);
    });
    listContainer.append(listItem);
  }
}

function showInfo(info) {
  const buyButton = document.createElement('button');
  buyButton.textContent = 'Buy';
  infoContainer.prepend(buyButton);
  buyButton.addEventListener('click', () => {
    alert('You buy all items');
    clearList();
  });
  info.forEach(item => {
    const infoItem = document.createElement('li');
    infoItem.textContent = item;
    infoContainer.append(infoItem);
  });
}

function clearList() {
  listContainer.innerHTML = '';
  infoContainer.innerHTML = '';
}


