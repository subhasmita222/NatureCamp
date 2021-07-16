const mongoose = require ('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers') ;
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0 ; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
       const camp = new Campground({
           //YOUR USER ID
           author: '60e1a5061365682648dee605',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, ut expedita ducimus cum repellat et, harum architecto omnis labore, laborum alias dolores rerum quod non ullam quis in quisquam obcaecati!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
            ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/subhasmita/image/upload/v1625818341/YelpCamp/e3zlk4wv3frxekfqkn2f.jpg',
                  filename: 'YelpCamp/e3zlk4wv3frxekfqkn2f'
                },
                {
                  url: 'https://res.cloudinary.com/subhasmita/image/upload/v1625813648/YelpCamp/ibwcvzvlkbvo9x6vluxk.jpg',
                  filename: 'YelpCamp/ibwcvzvlkbvo9x6vluxk'
                }
              ]
        })
        await camp.save();
    }
   

}

seedDB().then(() => {
    mongoose.connection.close();
})

