/*
 * File Name: ComplexCode.js
 * Description: This code is a complex implementation of a contact management system
 * Author: Jane Doe
 * Created: 2021-09-15
 * Last Modified: 2021-09-20
 */

// Import necessary libraries
const fs = require('fs');
const readline = require('readline');

// Custom classes
class Contact {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

class ContactManager {
  constructor() {
    this.contacts = [];
  }

  addContact(contact) {
    this.contacts.push(contact);
  }

  deleteContact(name) {
    this.contacts = this.contacts.filter(contact => contact.name !== name);
  }

  searchContact(query) {
    const results = [];

    for (const contact of this.contacts) {
      if (
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.includes(query)
      ) {
        results.push(contact);
      }
    }

    return results;
  }

  exportContacts(filename) {
    const data = [];

    for (const contact of this.contacts) {
      data.push(`${contact.name},${contact.email},${contact.phone}`);
    }

    fs.writeFile(filename, data.join('\n'), (err) => {
      if (err) throw err;
      console.log('Contacts exported successfully!');
    });
  }
}

// Main program
const contactManager = new ContactManager();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log('=== Contact Management System ===');
  console.log('1. Add Contact');
  console.log('2. Delete Contact');
  console.log('3. Search Contacts');
  console.log('4. Export Contacts');
  console.log('0. Exit');
}

function getInput(prompt) {
  return new Promise((resolve, reject) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
}

async function main() {
  while (true) {
    displayMenu();
    const choice = await getInput('Enter your choice (0-4): ');

    switch (choice) {
      case '1':
        const name = await getInput('Enter contact name: ');
        const email = await getInput('Enter contact email: ');
        const phone = await getInput('Enter contact phone: ');

        contactManager.addContact(new Contact(name, email, phone));
        console.log('Contact added successfully!');
        break;

      case '2':
        const deleteName = await getInput('Enter contact name to delete: ');

        contactManager.deleteContact(deleteName);
        console.log('Contact deleted successfully!');
        break;

      case '3':
        const searchQuery = await getInput('Enter search query: ');

        const searchResults = contactManager.searchContact(searchQuery);
        console.log('Search Results:');
        for (const contact of searchResults) {
          console.log(`${contact.name} | ${contact.email} | ${contact.phone}`);
        }
        break;

      case '4':
        const exportFilename = await getInput('Enter filename for export: ');

        contactManager.exportContacts(exportFilename);
        break;

      case '0':
        console.log('Goodbye!');
        rl.close();
        process.exit(0);
      
      default:
        console.log('Invalid choice. Please try again!');
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});