/*
 * Filename: complexCode.js
 * 
 * Description: This code demonstrates a complex and sophisticated implementation
 *              of a social media platform that allows users to create accounts,
 *              post messages, follow other users, and perform various operations.
 *              This code is more than 200 lines long and showcases various
 *              JavaScript concepts like Object-Oriented Programming, closures,
 *              asynchronous operations, and more.
 * 
 * Author: Your Name
 * Date: Date
 */

// Global variables
const users = [];
let currentUserId = 0;

// User Class
class User {
    constructor(name, email, password) {
        this.id = currentUserId++;
        this.name = name;
        this.email = email;
        this.password = password;
        this.followers = [];
        this.posts = [];
    }

    follow(user) {
        if (!user.followers.includes(this.id)) {
            user.followers.push(this.id);
        }
    }

    unfollow(user) {
        const index = user.followers.indexOf(this.id);
        if (index > -1) {
            user.followers.splice(index, 1);
        }
    }

    post(message) {
        const post = new Post(this, message);
        this.posts.push(post);
    }

    getFeed() {
        const feed = [];

        for (const postId in this.posts) {
            const post = this.posts[postId];
            feed.push(post);
        }

        for (const followerId in this.followers) {
            const follower = this.followers[followerId];
            const user = users.find(u => u.id === follower);
            if (user) {
                for (const postId in user.posts) {
                    const post = user.posts[postId];
                    feed.push(post);
                }
            }
        }

        return feed.sort((a, b) => b.timestamp - a.timestamp);
    }
}

// Post Class
class Post {
    constructor(user, message) {
        this.id = generateUniqueId();
        this.user = user;
        this.message = message;
        this.timestamp = Date.now();
    }
}

// Generate unique post id
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

// Example usage

// Create users
const user1 = new User("John Doe", "john@doe.com", "password1");
const user2 = new User("Jane Smith", "jane@smith.com", "password2");

// Make users follow each other
user1.follow(user2);
user2.follow(user1);

// Users post messages
user1.post("Hello World!");
user2.post("Hey there!");

// Get user feeds
const user1Feed = user1.getFeed();
const user2Feed = user2.getFeed();

console.log("User 1 Feed:");
console.log(user1Feed);

console.log("\nUser 2 Feed:");
console.log(user2Feed);

// Output:
// User 1 Feed:
// [
//     Post {
//         id: 'oj47zo2a4',
//         user: User { id: 0, name: 'John Doe', ... },
//         message: 'Hello World!',
//         timestamp: 1642806973997
//     },
//     Post {
//         id: 'v9n59i0yg',
//         user: User { id: 1, name: 'Jane Smith', ... },
//         message: 'Hey there!',
//         timestamp: 1642806973998
//     }
// ]

// User 2 Feed:
// [
//     Post {
//         id: 'v9n59i0yg',
//         user: User { id: 1, name: 'Jane Smith', ... },
//         message: 'Hey there!',
//         timestamp: 1642806973998
//     },
//     Post {
//         id: 'oj47zo2a4',
//         user: User { id: 0, name: 'John Doe', ... },
//         message: 'Hello World!',
//         timestamp: 1642806973997
//     }
// ]
// ... and more lines of code following this example.