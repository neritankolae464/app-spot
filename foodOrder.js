/* foodOrder.js */

// This code is a simulation of an online food ordering system.
// It allows users to place orders, add items to their cart, and finalize their order.
// It also has functionality for handling coupon codes, calculating the total price, and displaying order information.

// Define menu items and their prices
const menu = {
  1: { name: 'Burger', price: 10 },
  2: { name: 'Pizza', price: 12 },
  3: { name: 'Salad', price: 8 },
  // ... More menu items
};

// Define coupon codes and their discounts
const coupons = {
  DISC10: 0.1,  // 10% off
  DISC20: 0.2,  // 20% off
  // ... More coupon codes
};

// Define cart object
const cart = {
  items: [],
  add(item) {
    this.items.push(item);
  },
  remove(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  },
};

// Define order object
const order = {
  customer: null,
  coupon: null,
  cart,
  calculateTotal() {
    let total = 0;
    for (const item of this.cart.items) {
      total += menu[item].price;
    }
    if (this.coupon) {
      total *= 1 - coupons[this.coupon];
    }
    return total;
  },
  finalize() {
    if (!this.customer) {
      console.log('Please enter customer information before finalizing the order.');
      return;
    }
    if (this.cart.items.length === 0) {
      console.log('There are no items in the cart. Please add items before finalizing the order.');
      return;
    }
    const total = this.calculateTotal();
    console.log(`Order placed by ${this.customer}`);
    console.log('Items:');
    for (const item of this.cart.items) {
      console.log(`${menu[item].name}: ${menu[item].price}`);
    }
    console.log(`Total: ${total}`);
    console.log('Thank you for your order!');
  },
};

// Example usage:
order.customer = 'John Doe';
order.cart.add(1); // Add a burger
order.cart.add(3); // Add a salad
order.coupon = 'DISC10'; // Apply a coupon code
order.finalize(); // Place the order

// Output will be:
// Order placed by John Doe
// Items:
// Burger: 10
// Salad: 8
// Total: 16.2
// Thank you for your order!