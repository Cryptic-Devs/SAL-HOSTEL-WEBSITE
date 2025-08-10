const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getRooms, getRoom, createRoom, updateRoom, deleteRoom } = require('../controllers/roomController');

// Public: View rooms
router.get('/', getRooms);
router.get('/:id', getRoom);

// Admin: Manage rooms
router.post('/', auth, createRoom);
router.put('/:id', auth, updateRoom);
router.delete('/:id', auth, deleteRoom);

module.exports = router;

const readline = require("readline");

class Room {
    constructor(id, number, type, capacity, status) {
        this.id = id;
        this.number = number;
        this.type = type;
        this.capacity = capacity;
        this.status = status;
    }
    toString() {
        return 'Room ID: ${this.id}, Number: ${this.number}, Type: ${this.type}, Capacity: ${this.capacity}, Status: ${this.status}';
    }
}

class AdminDashboard {
    constructor() {
        this.rooms = [];
        this.counter = 1;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    start() {
        this.showMenu();
    }

    showMenu() {
        console.log("\n=== Admin Dashboard ===");
        console.log("1. View Rooms");
        console.log("2. Add Room");
        console.log("3. Edit Room");
        console.log("4. Delete Room");
        console.log("5. Exit");
        this.rl.question("Enter choice: ", choice => {
            switch (choice) {
                case "1": this.viewRooms(); break;
                case "2": this.addRoom(); break;
                case "3": this.editRoom(); break;
                case "4": this.deleteRoom(); break;
                case "5": console.log("Exiting..."); this.rl.close(); break;
                default: console.log("Invalid choice!"); this.showMenu();
            }
        });
    }

    findRoom(id) {
        return this.rooms.find(r => r.id === id);
    }

    viewRooms() {
        if (this.rooms.length === 0) console.log("No rooms found.");
        else this.rooms.forEach(r => console.log(r.toString()));
        this.showMenu();
    }

    addRoom() {
        this.rl.question("Room number: ", number => {
            this.rl.question("Type: ", type => {
                this.rl.question("Capacity: ", capacity => {
                    this.rl.question("Status: ", status => {
                        this.rooms.push(new Room(this.counter++, number, type, parseInt(capacity), status));
                        console.log("Room added!");
                        this.showMenu();
                    });
                });
            });
        });
    }

    editRoom() {
        this.rl.question("Enter room ID: ", id => {
            const room = this.findRoom(parseInt(id));
            if (!room) {
                console.log("Room not found.");
                return this.showMenu();
            }
            this.rl.question("New number: ", number => {
                this.rl.question("New type: ", type => {
                    this.rl.question("New capacity: ", capacity => {
                        this.rl.question("New status: ", status => {
                            room.number = number;
                            room.type = type;
                            room.capacity = parseInt(capacity);
                            room.status = status;
                            console.log("Room updated!");
                            this.showMenu();
                        });
                    });
                });
            });
        });
    }

    deleteRoom() {
        this.rl.question("Enter room ID: ", id => {
            const index = this.rooms.findIndex(r => r.id === parseInt(id));
            if (index === -1) console.log("Room not found.");
            else {
                this.rooms.splice(index, 1);
                console.log("Room deleted!");
            }
            this.showMenu();
        });
    }
}

new AdminDashboard().start();