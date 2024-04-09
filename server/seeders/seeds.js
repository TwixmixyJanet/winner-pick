const db = require("../config/connection");
const {
  User,
  Group,
  Game,
  CastMember,
  Elimination,
  Roster,
  Coin,
} = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
    await cleanDB("Game", "games");
    await cleanDB("Group", "groups");
    await cleanDB("CastMember", "castmembers");
    await cleanDB("Elimination", "eliminations");
    await cleanDB("Roster", "rosters");
    await cleanDB("Coin", "coins");

    const coins = await Coin.insertMany([
      {
        name: "Gold",
        value: 100,
      },
      {
        name: "Silver",
        value: 50,
      },
      {
        name: "Bronze",
        value: 25,
      },
    ]);

    console.log("💰 coins seeded 💰");

    const eliminations = await Elimination.insertMany([
      {
        order: 1,
      },
      {
        order: 2,
      },
      {
        order: 3,
      },
      {
        order: 4,
      },
      {
        order: 5,
      },
      {
        order: 6,
      },
      {
        order: 7,
      },
      {
        order: 8,
      },
      {
        order: 9,
      },
      {
        order: 10,
      },
      {
        order: 11,
      },
      {
        order: 12,
      },
      {
        order: 13,
      },
      {
        order: 14,
      },
      {
        order: 15,
      },
      {
        order: 16,
      },
      {
        order: 17,
      },
      {
        order: 18,
      },
      {
        order: 19,
      },
      {
        order: 20,
      },
    ]);

    console.log("🔥 eliminations seeded 🔥");

    const castMembers = await CastMember.insertMany([
      {
        name: "Ben Katzman",
      },
      {
        name: "Bhanu Gopal",
      },
      {
        name: "Charlie Davis",
      },
      {
        name: "David Jelinsky",
      },
      {
        name: "Hunter McKnight",
      },
      {
        name: "Jem Hu Adams",
      },
      {
        name: "Jessica Chong",
      },
      {
        name: "Kenzie Veurink",
      },
      {
        name: "Liz Wilcox",
      },
      {
        name: "Maria Shrime Gonzalez",
      },
      {
        name: "Moriah Gaynor",
      },
      {
        name: "Quintavius Burdette",
      },
      {
        name: "Randen Montalvo",
      },
      {
        name: "Sodasia Thompson",
      },
      {
        name: "Tevin Davis",
      },
      {
        name: "Tiffany Nicole Ervin",
      },
      {
        name: "Tim Spicer",
      },
      {
        name: "Venus Vafa",
      },
      {
        name: "Phil Keoghan",
      },
      {
        name: "Clayton Echard",
      },
      {
        name: "Michelle Young",
      },
      {
        name: "Rachel Lindsay",
      },
    ]);

    console.log("🎭 cast members seeded 🎭");

    const groups = await Group.insertMany([
      {
        name: "Weblins",
      },
      {
        name: "The Tribe Has Spoken",
      },
      {
        name: "Bitchelorette",
      },
      {
        name: "Traitors",
      },
      {
        name: "Alligabler",
      },
      {
        name: "ChampagneAllDay",
      },
      {
        name: "Jeff4Ever",
      },
    ]);

    console.log("👪 groups seeded 👪");

    const games = await Game.insertMany([
      {
        name: "Survivor 46",
        photo:
          "https://m.media-amazon.com/images/M/MV5BYjFhYjQzMDUtNGYxZC00YjliLTlmYzAtODE1ZTU1M2ExY2I0XkEyXkFqcGdeQXVyMTE0MzQwMjgz._V1_QL75_UY281_CR31,0,500,281_.jpg",
        description:
          "Survivor Season 46 returns to Mamanuca Island, Fiji, with beautiful beaches and clear water.",
        castMembers: [
          castMembers[0]._id,
          castMembers[1]._id,
          castMembers[2]._id,
          castMembers[3]._id,
          castMembers[4]._id,
          castMembers[5]._id,
          castMembers[6]._id,
          castMembers[7]._id,
          castMembers[8]._id,
          castMembers[9]._id,
          castMembers[10]._id,
          castMembers[11]._id,
          castMembers[12]._id,
          castMembers[13]._id,
          castMembers[14]._id,
          castMembers[15]._id,
          castMembers[16]._id,
          castMembers[17]._id,
        ],
        coinBuyIn: 18,
        groups: [groups[0]._id],
      },
      {
        name: "The Bachelor",
        photo:
          "https://parade.com/.image/ar_1.91%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_1200/MjAzMDQ3ODg4NzI3NTgxODc4/the-bachelor-joey-graziadei.jpg",
        description:
          "The Bachelor is an American dating and relationship reality television series that debuted on March 25, 2002, on ABC.",
        castMembers: [castMembers[20]._id],
        coinBuyIn: 1,
        groups: [groups[1]._id],
      },
      {
        name: "The Bachelorette",
        photo:
          "https://www.etonline.com/sites/default/files/images/2017-04/1280_rachel_lindsay_bachelorette_twitter.jpg",
        description:
          "The Bachelorette is an American reality television dating game show that debuted on ABC on January 8, 2003.",
        castMembers: [castMembers[21]._id],
        coinBuyIn: 1,
        groups: [groups[2]._id],
      },
      {
        name: "The Amazing Race",
        photo:
          "https://wwwimage-tve.cbsstatic.com/base/files/seo/ar_us_s35_social_1200x627_5.jpg",
        description:
          "The Amazing Race is back for its 33rd season! This season, 11 teams will embark on a trek around the world.",
        castMembers: [castMembers[19]._id],
        coinBuyIn: 1,
        groups: [groups[3]._id],
      },
    ]);
    console.log("🏆 games seeded 🏆");

    const users = await User.insertMany([
      {
        username: "B-King",
        firstName: "Brian",
        lastName: "Kernighan",
        email: "bkernighan@techfriends.dev",
        password: "password01",
        groups: [groups[0]._id],
        games: [games[0]._id],
      },
      {
        username: "MaxCannotSpell",
        firstName: "Max",
        lastName: "Kanat-Alexander",
        email: "mkanatalexander@techfriends.dev",
        password: "password02",
        groups: [groups[1]._id],
        games: [games[1]._id],
      },
      {
        username: "Barbie",
        firstName: "Barbara",
        lastName: "Bull",
        email: "bbull@techfriends.dev",
        password: "password03",
        groups: [groups[2]._id],
        games: [games[3]._id],
      },
      {
        username: "Superman",
        firstName: "Kent",
        lastName: "Bull",
        email: "kbull@techfriends.dev",
        password: "password04",
        groups: [groups[2]._id],
        games: [games[1]._id],
      },
      {
        username: "EVBcooks",
        firstName: "Edward V.",
        lastName: "Berard",
        email: "evberard@techfriends.dev",
        password: "password05",
        groups: [groups[3]._id],
        games: [games[2]._id],
      },
      {
        username: "KissAuntKay",
        firstName: "Alana",
        lastName: "Kay",
        email: "akay@techfriends.dev",
        password: "password06",
        groups: [groups[4]._id],
        games: [games[0]._id],
      },
      {
        username: "KissUncleKay",
        firstName: "Albert",
        lastName: "Kay",
        email: "akay2@techfriends.dev",
        password: "password07",
        groups: [groups[4]._id],
        games: [games[0]._id],
      },
      {
        username: "D-Time",
        firstName: "David",
        lastName: "Thomas",
        email: "dthomas@techfriends.dev",
        password: "password08",
        groups: [groups[5]._id],
        games: [games[2]._id],
      },
    ]);
    console.log("👤 users seeded 👤");

    const rosters = await Roster.insertMany([
      {
        user: users[0]._id,
        games: games[0]._id,
        castMembers: [
          castMembers[1]._id,
          castMembers[5]._id,
          castMembers[7]._id,
          castMembers[15]._id,
        ],
      },
    ]);
    console.log("📋 rosters seeded 📋");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("🌱🌱🌱seeding all done!🌱🌱🌱");
  process.exit(0);
});
