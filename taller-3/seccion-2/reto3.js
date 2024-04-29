let products = [];
let originalProducts = [];
let badDescription = [];
let going = true;

while (going) {
  let answer = prompt(
    'Type:\n1 to create a product. \n2 to duplicate one 3 to see all products. \n4 to search products by name or price. \n5 to update a product. \n6 to delete a product. \n7 to verify the existence of a product. \n8 to sell a product. \n9 to buy a product. \n10 to see the total value of the inventory. \n11 to sort the products by name, price, quantity or description. \n12 to see the black listed products (products with a bad word in their name or description). \n13 to see a general report, including the total value of the inventory, quantity of most expensive products, quantity of cheapest, quantity of products with more or less availability and quantity of products with possible bad words in their description. \nAnd nothing to end the program.'
  ).trim();

  switch (answer) {
    case '1':
      let newItem = {
        id: products.length + 1,
        name: '',
        price: 0,
        quantity: 0,
        description: '',
      };

      newItem.name = prompt('Please enter the name of the product')
        .trim()
        .toLowerCase();

      if (products.length > 0) {
        let coincidence = products.find(
          (product) => product.name === newItem.name
        );

        if (coincidence != undefined) {
          alert('Product repeated');
          continue;
        }
      }

      let replaceName = [];
      let replaceDescription = [];

      newItem.price = parseFloat(
        prompt('Please enter the price of the product').trim()
      );

      if (isNaN(newItem.price)) {
        alert('Price cannot be NaN');
        continue;
      }

      newItem.quantity = parseInt(
        prompt('Please enter the quantity of the products available').trim()
      );
      if (isNaN(newItem.quantity)) {
        alert('Quantity must be a number');
        continue;
      }

      newItem.description = prompt(
        "Please enter the product's description"
      ).trim();

      let censored = { ...newItem };

      badWords.forEach((el) => {
        if (newItem.name.includes(el)) {
          replaceName.push(el);
        }

        if (newItem.description.includes(el)) {
          replaceDescription.push(el);
          badDescription.push(newItem);
        }
      });

      if (replaceName.length > 1) {
        for (let i = 0; i < replaceName.length; i++) {
          censored.name = censored.name.replaceAll(
            replaceName[i],
            '*'.repeat(replaceName[0].length)
          );
        }
      } else {
        censored.name = censored.name.replaceAll(
          replaceName[0],
          '*'.repeat(replaceName[0].length)
        );
      }

      if (replaceDescription.length > 1) {
        for (let i = 0; i < replaceDescription.length; i++) {
          censored.description = censored.description.replaceAll(
            replaceDescription[i],
            '*'.repeat(replaceDescription[0].length)
          );
        }
      } else {
        censored.description = censored.description.replaceAll(
          replaceDescription[0],
          '*'.repeat(replaceDescription[0].length)
        );
      }

      products.push(censored);
      alert(`Your new product is: ${Object.values(censored).join(', ')}`);
      originalProducts.push(newItem);
      break;
    case '2':
      let id = parseInt(
        prompt('Please enter the id of the product you want to copy').trim()
      );

      if (isNaN(id)) {
        alert('Id invalid, please try again');
        continue;
      }

      let item = products[id - 1];
      let copy = { ...item };
      copy.id = products.length + 1;

      let lastCoincidence;

      for (let i = products.length - 1; i >= 0; i--) {
        if (
          products[i].name == item.name &&
          products[i].name.length > item.name
        ) {
          lastCoincidence = products[i];
          break;
        }
      }

      if (lastCoincidence == undefined) {
        copy.name = `${copy.name} copy`;
      } else {
        let number = parseInt(
          lastCoincidence.name[lastCoincidence.name.length - 1]
        );

        copy.name = `${copy.name} copy ${number + 1}`;
      }

      products.push(copy);
      alert(`Copy created successfully: ${Object.values(copy).join(', ')}`);
      break;

    case '3':
      alert(
        `Your products are: ${products.map(
          (el) => `{${Object.values(el).join(', ')}} `
        )}`
      );
      break;
    case '4':
      let searchBy = prompt(
        'Enter the property you want to search by (name or price)'
      )
        .toLowerCase()
        .trim();

      let searchItem;
      let property;

      if (searchBy == 'name') {
        property = prompt(`Enter the ${searchBy} of the item you want to see`)
          .toLowerCase()
          .trim();
        searchItem = products.find((product) => product[searchBy] == property);
        alert(`Your product is: ${Object.values(searchItem).join(', ')}`);
      } else if (searchBy == 'price') {
        property = prompt(
          'Please enter the minimum and maximum range of price you want, separated by spaces'
        )
          .trim()
          .split(' ');

        property = property.map((el) => parseFloat(el));
        searchItem = [];
        console.log(searchItem);

        if (property.length != 2 || isNaN(property[0]) || isNaN(property[1])) {
          alert('Range invalid, please try again');
          continue;
        }

        for (let i = 0; i < products.length; i++) {
          if (property[0] <= products[i].price <= property[1]) {
            searchItem.push(products[i]);
          }
        }

        if (searchItem.length < 1) {
          alert('No products meet this criteria');
          continue;
        }

        alert(
          `Your products are: ${searchItem.map(
            (el) => `{${Object.values(el).join(', ')}} `
          )}`
        );
      } else {
        alert('Property invalid');
        continue;
      }

      if (searchItem == undefined) {
        alert('Item(s) not found');
      }
      break;
    case '5':
      let updateId = parseInt(
        prompt('Please enter the id of the product you want to update').trim()
      );

      if (isNaN(updateId)) {
        alert('Product id invalid');
        continue;
      }

      let updateProduct = products[updateId - 1];

      alert(
        `The product you want to update is: {${Object.values(
          updateProduct
        ).join(', ')}}`
      );

      let updateField = prompt(
        'Which field do you wish to update? Choose between name, price, quantity or description'
      )
        .toLowerCase()
        .trim();

      let updateProperty = prompt(`Please type the new ${updateField}`).trim();

      switch (updateField) {
        case 'name':
          updateProperty = updateProperty.toLowerCase();
          break;
        case 'price':
          updateProperty = parseFloat(updateProperty);
          if (isNaN(updateProperty)) {
            alert('Price has to be a number');
            continue;
          }
          break;
        case 'quantity':
          updateProperty = parseInt(updateProperty);
          if (isNaN(updateProperty)) {
            alert('Quantity must be a number');
            continue;
          }
          break;
        case 'description':
          badWords.forEach((el) => {
            if (updateProperty.includes(el)) {
              badDescription.push(updateProduct);
            }
          });
          break;
        default:
          alert('Field invalid');
          continue;
      }

      updateProduct[updateField] = updateProperty;
      products[updateId - 1] = updateProduct;

      alert(
        `Product updated: ${Object.values(products[updateId - 1]).join(', ')}`
      );
      break;
    case '6':
      let deleteId = parseInt(
        prompt('Enter the id of the product you want to delete')
      );

      if (isNaN(deleteId) || deleteId < 0) {
        alert('Id invalid');
        continue;
      }
      products = products.filter((product) => product.id !== deleteId);
      alert('Product deleted successfully');
      break;
    case '7':
      let verifyName = prompt('Enter the name of the product')
        .toLowerCase()
        .trim();
      let verify = products.find((product) => product.name == verifyName);
      if (verify == undefined || verify.quantity == 0) {
        alert('Product not available');
      } else {
        alert(`Your product is: ${Object.values(verify).join(', ')}`);
      }
      break;
    case '8':
      let sellName = prompt('Enter the name of the product you want to sell')
        .toLowerCase()
        .trim();
      let sellProduct = products.find((product) => product.name === sellName);
      if (sellProduct == undefined || sellProduct.quantity < 1) {
        alert('Product not available');
      } else {
        let index = products.indexOf(sellProduct);
        products[index].quantity -= 1;
        alert(
          `Product sold successfully: ${Object.values(products[index]).join(
            ', '
          )}`
        );
      }
      break;
    case '9':
      let buyId = parseInt(
        prompt('Please enter the id of the item you want to buy')
      );
      if (isNaN(buyId) || buyId < 0) {
        alert('Id invalid');
      } else {
        let buyProduct = products.find((product) => product.id === buyId);
        if (buyProduct == undefined) {
          alert('Product does not exist');
        } else {
          let index = products.indexOf(buyProduct);
          products[index].quantity += 1;
          alert(
            `Product sold successfully: ${Object.values(products[index]).join(
              ', '
            )}`
          );
        }
      }
      break;
    case '10':
      let total = 0;
      products.forEach((el) => {
        if (el.quantity > 0) {
          total += el.price * el.quantity;
        }
      });
      alert(`The total of the inventory is: ${total}`);
      break;
    case '11':
      let sortFactor = prompt(
        'Please enter the factor of sort (name, price, quantity, description)'
      )
        .trim()
        .toLowerCase();
      let order = parseInt(
        prompt(
          'Please enter 1 to sort into ascending order, and 2 for descending order.'
        ).trim()
      );
      let result;

      if (order == 1) {
        switch (sortFactor) {
          case 'name':
            result = products.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'price':
            result = products.sort((a, b) => a.price - b.price);
            break;
          case 'quantity':
            result = products.sort((a, b) => a.quantity - b.quantity);
            break;
          case 'description':
            result = products.sort((a, b) =>
              a.description.localeCompare(b.description)
            );
            break;
          default:
            alert('Wrong sort property, please try again');
        }
      } else if (order == 2) {
        switch (sortFactor) {
          case 'name':
            result = products.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case 'price':
            result = products.sort((a, b) => b.price - a.price);
            break;
          case 'quantity':
            result = products.sort((a, b) => b.quantity - a.quantity);
            break;
          case 'description':
            result = products.sort((a, b) =>
              b.description.localeCompare(a.description)
            );
            break;
          default:
            alert('Wrong sort property, please try again');
        }
      } else {
        alert('Order invalid');
        continue;
      }

      if (result == undefined) {
        alert('There is no product that meet this criteria');
      } else {
        alert(
          `The products sorted are: ${result.map(
            (el) => `{${Object.values(el).join(', ')}} `
          )}`
        );
      }
      break;
    case '12':
      let blackListed = [];

      products.forEach((el) => {
        if (
          badWords.some(
            (word) => el.name.includes(word) || el.description.includes(word)
          )
        ) {
          blackListed.push(el);
        }
      });

      if (blackListed.length < 1) {
        alert('No products contain bad words');
      } else {
        alert(
          `The products that contain bad words are: ${blackListed.map(
            (el) => `{${Object.values(el).join(', ')}}`
          )}`
        );
      }
      break;
    case '13':
      let totalInventory = 0;
      let expensive = products.sort((a, b) => a.price - b.price);
      let cheapest = products.sort((a, b) => b.price - a.price);
      let available = products.sort((a, b) => a.quantity - b.quantity);
      let notAvailable = products.sort((a, b) => b.quantity - a.quantity);

      products.forEach((el) => {
        if (el.quantity > 0) {
          totalInventory += el.price * el.quantity;
        }
      });
      console.log(
        `The total inventory is: ${totalInventory}. The quantity of the most expensive product is: ${
          expensive[0].quantity
        }. The quantity of the cheapest product is: ${
          cheapest[0].quantity
        }. The products with more availability are: {${Object.values(
          available[0]
        ).join(', ')}}, {${Object.values(available[1]).join(
          ', '
        )}}, {${Object.values(available[2]).join(
          ', '
        )}}. The products with less availability are: {${Object.values(
          notAvailable[0]
        ).join(', ')}}, {${Object.values(notAvailable[1]).join(
          ', '
        )}}, {${Object.values(notAvailable[2]).join(
          ', '
        )}}. The quantity of possible bad words in their description is: ${
          badDescription.length
        }`
      );
      break;
    default:
      if (!answer) {
        going = false;
        alert('Program ended.');
      } else {
        alert('Please type a valid option');
      }
      break;
  }
}
