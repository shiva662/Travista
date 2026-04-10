const mongoose = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place');
require('dotenv').config();

const seedDb = async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    
    const bcrypt = require('bcrypt');
    let admin = await User.findOne({ email: 'admin@travista.com' });
    if (!admin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        admin = new User({
            name: 'Travista Admin',
            email: 'admin@travista.com',
            password: hashedPassword,
            role: 'admin'
        });
        await admin.save();
    } else if (admin.role !== 'admin') {
        // Upgrade existing dummy user to admin and update password
        admin.role = 'admin';
        admin.password = await bcrypt.hash('admin123', 10);
        await admin.save();
    }

    // Insert Mock Places
    const places = [
        {
            title: "Sunny Days in Goa",
            description: "Beach paradise - Sun, sand, and Portuguese heritage. Enjoy Goa's beaches, Portuguese architecture, water sports, and vibrant nightlife.",
            state: "Goa",
            city: "Panjim",
            imageUrl: "https://images.unsplash.com/photo-1663848018507-accf7c6a2ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMGluZGlhfGVufDF8fHx8MTc3MTc2ODgxMnww&ixlib=rb-4.1.0&q=80&w=1080",
            createdBy: admin._id
        },
        {
            title: "5 Days in Kerala",
            description: "God's Own Country - Backwaters, beaches, and hill stations. Experience the natural beauty of Kerala with houseboat stays, tea plantations, and Ayurvedic wellness.",
            state: "Kerala",
            city: "Kochi",
            imageUrl: "https://images.unsplash.com/photo-1707893013488-51672ef83425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaG91c2Vib2F0fGVufDF8fHx8MTc3MTgyOTc1OXww&ixlib=rb-4.1.0&q=80&w=1080",
            createdBy: admin._id
        },
        {
            title: "Taj Mahal & Fatehpur Sikri",
            description: "Sunrise at Taj Mahal. The most iconic India circuit covering historical monuments, royal palaces, and cultural experiences.",
            state: "Uttar Pradesh",
            city: "Agra",
            imageUrl: "https://images.unsplash.com/photo-1551857704-ba9b620ad444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMHN1bnJpc2UlMjBpbmRpYXxlbnwxfHx8fDE3NzE4NzI4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            createdBy: admin._id
        },
        {
            title: "7 Days in Rajasthan",
            description: "Royal heritage tour - Forts, palaces, and desert camps. Complete Rajasthan circuit covering Jaipur, Jodhpur, Jaisalmer, and Udaipur.",
            state: "Rajasthan",
            city: "Jaipur",
            imageUrl: "https://images.unsplash.com/photo-1670687174580-c003b4716959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBkZXNlcnQlMjBjYW1lbHxlbnwxfHx8fDE3NzE3Njg4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
            createdBy: admin._id
        }
    ];

    await Place.deleteMany({});
    await Place.insertMany(places);
    console.log("Mock data successfully seeded into MongoDB!");
    process.exit(0);
};

seedDb().catch(console.dir);
