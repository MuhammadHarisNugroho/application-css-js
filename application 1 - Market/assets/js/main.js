// Muhammad Haris Nugroho
// IndoApril

// Instructions:
// Write an HTML program to Display and Add a list of grocery items.
// (use JavaScript and HTML coding in class to assist you) see below.
// Display subtotal and Grand total with tax.

// Tax is 8.65%
const tax = 0.0865;

// Storing all of the dom elements in vars
let groceryList = document.getElementById("grocery-list"),
  nameInput = document.getElementById("name-input"),
  priceInput = document.getElementById("price-input"),
  qtyInput = document.getElementById("qty-input"),
  submitBtn = document.getElementById("submit-btn"),
  subtotalEl = document.getElementById("subtotal"),
  grandtotalEl = document.getElementById("grandtotal");

// Initializing array to store all items
let groceryItems = [];

// Calculate subtotal and grand total and display in HTML
const calcTotals = () => {
  subtotal = groceryItems.reduce(
    (subtotal, item) => (subtotal += item.subtotal),
    0
  );
  // Formatting currency values and injecting into HTML
  subtotalEl.innerHTML = `$${subtotal.toFixed(2)}`;
  grandtotal = subtotal + subtotal * tax;
  grandtotalEl.innerHTML = `$${grandtotal.toFixed(2)}`;
};

// Helper function to capitalize strings
const capitalize = (string) => {
  return (
    string
      // Convert entire string to lowercase
      .toLowerCase()
      // Split each word into an array
      .split(" ")
      // Loop over the word array and capitalize each first letter
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      // Recombine into new string
      .join(" ")
  );
};

// Initializing class to create items
class Item {
  constructor(name, price, qty) {
    this.name = capitalize(name.trim());
    this.price = parseFloat(price);
    this.qty = parseInt(qty);
    this.subtotal = this.price * this.qty;
    // this.init executes every time a new obj of this class is initialized
    this.init = () => {
      // Create new dom node to contain dynamic HTML elements
      let row = document.createElement("div");
      row.setAttribute("class", "row");
      // Demonstrating another way to inject HTML into DOM with JS
      row.insertAdjacentHTML(
        "afterbegin",
        `
      <span class="name">${this.name}</span>
      <span class="qty">${this.qty}</span>
      <span class="price">$${this.price.toFixed(2)}</span>
      <span class="subtotal">$${this.subtotal.toFixed(2)}</span>
    `
      );
      // Create dom node for a remove button
      let rmBtn = document.createElement("span");
      rmBtn.innerHTML = "✖";
      rmBtn.setAttribute("class", "delete");
      // When clicked, will delete item
      rmBtn.addEventListener("click", () => {
        // Delete DOM node
        row.remove();
        // Remove from our data structure
        groceryItems = groceryItems.filter((item) => item !== this);
        // Recalculate totals
        calcTotals();
      });
      // Append remove button to the row
      row.append(rmBtn);

      // Append our dynamically created DOM nodes to the DOM itself
      groceryList.append(row);

      // Add the new object to our groceryItems array
      groceryItems.push(this);
    };
    this.init();
    calcTotals();
  }
}

// Creating beginning data
// new Item("Almond Milk", 5.2, 2);
// new Item("Bananas", 2.71, 3);
// new Item("Nutella", 7.2, 1);
// new Item("Bread", 3.61, 2);

// Add new item by submitting form
submitBtn.addEventListener("click", () => {
  let name = nameInput.value;
  let price = priceInput.value;
  let qty = qtyInput.value;
  // Checks if input values are valid
  if (name === "" || !price || !qty) {
    return;
  }
  new Item(name, price, qty);
  // Reset input values
  nameInput.value = "";
  priceInput.value = "";
  qtyInput.value = "";
});
