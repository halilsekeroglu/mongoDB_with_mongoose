
//first of all we have to require(from node_modules) our mongoose.
const mongoose = require('mongoose');

//Connection of MONGODB(database) server.(with on port 27017 )
mongoose.connect('mongodb://localhost:27017/FruitDB',{useNewUrlParser: true,useUnifiedTopology: true});

//SCHEMA
const fruitSchema=new mongoose.Schema({ 
    name:{
        type: String,
        required:[true,"you specified anything ! don't forget to specify name of Fruit ! "]
    },
    rating:{
        type:Number,
        min:1,
        max:10
    },
    review:String
});



//It's collection where we store our document.
//Collection name : "Fruit"
//.model("Fruit",..)=
//when we're passing in  our collection name and fruitSchema &then we're telling that
// go and create a " Constructor Function it's called "Fruit". (back of scene-not able to see).

// function Fruit(name,rating,review) {
    // this.name=name;
    // this.rating=rating;
    // this.review=review;
// }
const Fruit=mongoose.model("Fruit",fruitSchema);

//Now we're going to create our document after we created model
//document name: apple
//Heads Up: the answer that why we're using "Object Constructor Function" ;
// just because if you have many common property of documents. This's the best way to declare 
// Constructor Function.(Property same just give name value every single time.)
//for instance : next time when we want to create new document it'll called with different name;
//just create new document name with the same way as it happend below.
const apple=new Fruit({
    name: "Apple",
    rating:7,
    review: "Pretty solid as a fruit"
})


//We're using save method to save our 'apple' document into Fruit collection.
//to prevent to add constantly add into collection, just comment out save method.
apple.save();


// // If we want to create a new collections what we have to do is to create new Schema,
// //because we have to specify "new brand Object Constructor Function"
// // just because our property is not the same with previous collections.
// //so let's declare new properties with new Schema.
const personSchema=mongoose.Schema({
    name:String,
    age:Number
});


// // after created our Schema we're free to create our collection name.
// //to create a collection name we're going to handle with model.//
const Person = mongoose.model("Person", personSchema);
// //Create new document for PERSON
const person1=new Person({
    name: "Halil",
    age: 26
});

person1.save();




// // we've created two different collections so far
// //now that I only want to uptade my 'Fruit' collections.
// //How to add 3 new fruits(like orange,banana,kiwi) ?
// // we've already collection name called "Fruit".
// //what we need to add 3 new documents. (we're not going to create new collection as we did before)
const orange = new Fruit({
    name: "orange",
    rating: 8,
    review: "nice!!"
});

const banana = new Fruit({
    name: "banana",
   rating: 10,
    review: "my best !"
});

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 9,
    review: "I like it !"
})

// We've created our 3 new brand documents to add collections.
// How to save them into 'Fruit(collection)'
// It's different as we did before for single document because we want to add multiple documents.
//to save 3 documents

Fruit.insertMany([orange, banana, kiwi], function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("succesfully save !");
        
    }
});

// ------------------------------------------------------------------------------------------
// we've learned how to CREATE 'collections' and 'documents' with mongoose.
// how about to read them as we did with mongoSHELL ?
//let's get started
// there is a callback function and that goes and find your collections.
//you don't have to give exact name for callback function parameters.
//first parameters for error, secon one is for collections.
//even if you write such as function(a,b) {...} 
//it'll returned to you.
//don't forget : "Fruit" and "fruits" same. only different Fruit for nodejs, fruits for terminal.
//because terminal makes our collection(Fruit) pluralize(fruits) as automatically.
Fruit.find(function(err,fruits) {
    if (err) {
        console.log(err);
    } else {
        //console.log(fruits); by using we can see our collection and document come as array.
        // if you want to get particular(single) object, you can call it as we did in Arrays.
         console.log(fruits[0].name) ; 
         console.log(fruits[0].rating);
         console.log(fruits[1].review);
        
         //to get each of them(multiple) we have to use ;
         fruits.forEach(function(fruit){
             console.log(fruit.name);  
         });
         mongoose.connection.close();
    }
});


