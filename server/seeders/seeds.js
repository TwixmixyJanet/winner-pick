const db = require('../config/connection');
const { User, Family, Recipe } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');
    await cleanDB('Recipe', 'recipes');
    await cleanDB('Family', 'families');

    const families = await Family.insertMany([
      {
        name: "Kernighan"
      },
      {
        name: "Kanat-Alexander"
      },
      {
        name: "Bull"
      },
      {
        name: "Berard"
      },
      {
        name: "Kay"
      },
      {
        name: "Thomas"
      },
      {
        name: "Knuth"
      }
    ]);

    console.log('👪 families seeded 👪');

    const recipes = await Recipe.insertMany([
      {
        name: "Spaghetti Bolognese",
        photo: "https://github.com/abenedetti27/recipe-rolodex/assets/117195025/360b8d3c-3927-4889-819b-062629e20bee",
        cookingTime: 30,
        instructions: "Boil spaghetti. Brown ground beef. Mix with tomato sauce. Serve over spaghetti.",
        ingredients: "Spaghetti, ground beef, tomato sauce",
        servingSize: 4,
        author: "B-King",
        families: [families[0]._id]
      },
      {
        name: "Chicken Alfredo",
        photo: "https://github.com/abenedetti27/recipe-rolodex/assets/117195025/7b6ab1fa-3ad0-4cff-aa32-1c256f23a5f5",
        cookingTime: 40,
        instructions: "Cook chicken. Prepare Alfredo sauce. Mix with cooked pasta. Garnish with parsley.",
        ingredients: "Chicken breasts, fettuccine pasta, Alfredo sauce",
        servingSize: 6,
        author: "Superman",
        families: [families[2]._id]
      },
      {
        name: "Vegetarian Stir Fry",
        photo: "https://github.com/abenedetti27/recipe-rolodex/assets/117195025/d7ca02dd-7afe-494c-b0e0-f06c9e62a996",
        cookingTime: 25,
        instructions: "Stir-fry assorted vegetables. Add tofu. Season with soy sauce. Serve hot.",
        ingredients: "Broccoli, bell peppers, tofu, soy sauce",
        servingSize: 3,
        author: "EVBcooks",
        families: [families[3]._id]
      },
      {
          name: "Chicken Parmesan",
          photo: "https://github.com/abenedetti27/recipe-rolodex/assets/117195025/f19b9879-c8fd-448a-a896-0e39e31c94b4",
          cookingTime: 45,
          instructions: "Bread chicken. Fry chicken. Add tomato sauce and cheese. Bake until cheese is melted.",
          ingredients: "Chicken breasts, bread crumbs, tomato sauce, mozzarella cheese",
          servingSize: 4,
          author: "KissUncleKay",
          families: [families[4]._id]
      },
      {
          name: "Chicken Tikka Masala",
          photo: "https://github.com/abenedetti27/recipe-rolodex/assets/117195025/4abe79c7-2f43-4615-87af-acc3626f6bf9",
          cookingTime: 60,
          instructions: "Marinate chicken. Bake chicken. Add tomato sauce and spices. Serve with rice.",
          ingredients: "Chicken breasts, tomato sauce, spices, rice",
          servingSize: 4,
          author: "D-Time",
          families: [families[5]._id]
      }
      ,
      {
          name: "Roast Beef",
          photo: "https://github.com/abenedetti27/recipe-rolodex/assets/117195025/36621a27-f49d-4db4-b2dd-b31768211721",
          cookingTime: 120,
          instructions: "Season beef. Bake beef. Serve with potatoes and vegetables.",
          ingredients: "Beef, potatoes, vegetables",
          servingSize: 6,
          author: "KissAuntKay",
          families: [families[2]._id]
      }
    ]);
    console.log('🍝 recipes seeded 🍝');

    const users = await User.insertMany([
      {
        username: "B-King",
        firstName: "Brian",
        lastName: "Kernighan",
        email: "bkernighan@techfriends.dev",
        password: "password01",
        families: [families[0]._id],
        recipes: [recipes[0]._id],
      },
      {
        username: "MaxCannotSpell",
        firstName: "Max",
        lastName: "Kanat-Alexander",
        email: "mkanatalexander@techfriends.dev",
        password: "password02",
        families: [families[1]._id],
        recipes: [],
      },
      {
        username: "Barbie",
        firstName: "Barbara",
        lastName: "Bull",
        email: "bbull@techfriends.dev",
        password: "password03",
        families: [families[2]._id],
        recipes: [recipes[5]._id],
      },
      {
        username: "Superman",
        firstName: "Kent",
        lastName: "Bull",
        email: "kbull@techfriends.dev",
        password: "password04",
        families: [families[2]._id],
        recipes: [recipes[1]._id],
      },
      {
        username: "EVBcooks",
        firstName: "Edward V.",
        lastName: "Berard",
        email: "evberard@techfriends.dev",
        password: "password05",
        families: [families[3]._id],
        recipes: [recipes[2]._id],
      },
      {
        username: "KissAuntKay",
        firstName: "Alana",
        lastName: "Kay",
        email: "akay@techfriends.dev",
        password: "password06",
        families: [families[4]._id],
        recipes: [recipes[5]._id],
      },
      {
        username: "KissUncleKay",
        firstName: "Albert",
        lastName: "Kay",
        email: "akay2@techfriends.dev",
        password: "password07",
        families: [families[4]._id],
        recipes: [recipes[3]._id],
      },
      {
        username: "D-Time",
        firstName: "David",
        lastName: "Thomas",
        email: "dthomas@techfriends.dev",
        password: "password08",
        families: [families[5]._id],
        recipes: [recipes[4]._id],
      },
      {
        username: "TheRealDonald",
        firstName: "Donald",
        lastName: "Knuth",
        email: "dknuth@techfriends.dev",
        password: "password09",
        families: [families[6]._id],
        recipes: [],
      }
    ]);
    console.log('👨‍🍳 users seeded 👩‍🍳');

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('🌱🌱🌱seeding all done!🌱🌱🌱');
  process.exit(0);
});
