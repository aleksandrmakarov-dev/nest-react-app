import { Role, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const externalProviders: string[] = ["google", "github"];

interface InitialUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const users: InitialUser[] = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: Role.ADMIN,
  },
  {
    name: "Editor User",
    email: "editor@example.com",
    password: "editor123",
    role: Role.EDITOR,
  },
  {
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: Role.USER,
  },
];

async function seed() {
  const prisma = new PrismaClient();

  await prisma.$connect();

  await prisma.tag.deleteMany();
  await prisma.article.deleteMany();

  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.externalProvider.deleteMany();

  console.log("delete all tables...");

  await prisma.externalProvider.createMany({
    data: externalProviders.map((p) => ({
      name: p,
    })),
  });

  console.log("seeded external providers...");

  await Promise.all(
    users.map(async (user) => {
      const { password, ...userData } = user;
      const passwordHash = await bcrypt.hash(user.password, 10);
      const now = new Date();

      const createdUser = await prisma.user.create({
        data: { ...userData, passwordHash: passwordHash, emailVerifiedAt: now },
      });

      if (!createdUser) {
        throw Error("Failed to create user");
      }
    }),
  );

  console.log("seeded users...");

  const foundUsers = await prisma.user.findMany({
    where: {
      NOT: {
        role: Role.USER,
      },
    },
  });

  const tags = [
    "web-development",
    "csharp",
    "react",
    "nest-js",
    "next-js",
    "software-development",
    "english",
  ];

  const userId = foundUsers[0].id;

  await prisma.tag.createMany({
    data: tags.map((t) => ({
      name: t,
      userId: userId,
    })),
  });

  console.log("seeded tags...");

  const foundTags = await prisma.tag.findMany();

  const articles = [
    {
      title: "Spectacular Sunset at Ocean's Edge",
      description:
        "Witness the breathtaking beauty of nature as the sun sets over the vast ocean.",
      content:
        "Experience the magic of a golden hour at the beach. Waves gently kissing the shore, vibrant hues painting the sky – it's a mesmerizing sight that will leave you in awe.",
      image: "https://placekitten.com/800/600",
    },
    {
      title: "Discovering Hidden Waterfalls",
      description:
        "Embark on a journey through lush forests to uncover enchanting hidden waterfalls.",
      content:
        "Immerse yourself in the serenity of nature as we trek through dense woods to discover cascading waterfalls surrounded by untouched beauty. An adventure for the soul!",
      image: "https://placekitten.com/800/601",
    },
    {
      title: "Tech Expo 2024: Future Unleashed",
      description:
        "Explore the latest advancements in technology at the most anticipated tech expo of the year.",
      content:
        "From AI breakthroughs to futuristic gadgets, the Tech Expo 2024 promises an immersive experience into the world of innovation. Don't miss the chance to witness the future!",
      image: "https://placekitten.com/801/602",
    },
    {
      title: "Culinary Delights in the Heart of the City",
      description:
        "Indulge in a gastronomic journey through the city's culinary hotspots.",
      content:
        "Savor the flavors of diverse cuisines as we explore hidden gems and popular eateries. From street food to fine dining, this culinary adventure has it all.",
      image: "https://placekitten.com/800/603",
    },
    {
      title: "Capturing Moments: Photography Workshop",
      description:
        "Hone your photography skills in a hands-on workshop led by renowned photographers.",
      content:
        "Join us for a day of creativity and learning as we delve into the art of photography. From composition techniques to post-processing tricks, this workshop is perfect for enthusiasts of all levels.",
      image: "https://placekitten.com/803/604",
    },
    {
      title: "Epic Road Trip: Mountains and Valleys",
      description:
        "Embark on a thrilling road trip through scenic mountain ranges and picturesque valleys.",
      content:
        "Hit the open road and traverse winding paths that lead to breathtaking vistas. This epic journey promises adventure, stunning landscapes, and memories to last a lifetime.",
      image: "https://placekitten.com/800/605",
    },
    {
      title: "Artisan Market: Handcrafted Wonders",
      description:
        "Explore a vibrant market showcasing unique, handcrafted creations by local artisans.",
      content:
        "From handmade jewelry to bespoke furniture, the Artisan Market is a treasure trove of one-of-a-kind pieces. Support local artists and bring home something truly special.",
      image: "https://placekitten.com/805/606",
    },
    {
      title: "Fitness Fiesta: Wellness for the Mind and Body",
      description:
        "Join a wellness event focused on fitness, mindfulness, and healthy living.",
      content:
        "Engage in invigorating workout sessions, mindfulness workshops, and discover holistic approaches to well-being. It's time to prioritize your health and happiness!",
      image: "https://placekitten.com/800/607",
    },
    {
      title: "Urban Jungle: Exploring City Parks",
      description:
        "Escape the urban hustle and bustle by immersing yourself in the tranquility of city parks.",
      content:
        "Discover hidden oases within the city – parks filled with lush greenery, serene lakes, and winding trails. A perfect retreat for those seeking a peaceful urban escape.",
      image: "https://placekitten.com/800/608",
    },
    {
      title: "Fashion Forward: Runway Extravaganza",
      description:
        "Witness the latest trends and designs as top fashion designers showcase their collections on the runway.",
      content:
        "From haute couture to street style, the runway extravaganza promises a visual feast of fashion. Join us in celebrating creativity, style, and innovation.",
      image: "https://placekitten.com/800/609",
    },
    {
      title: "Mindful Meditation Retreat",
      description:
        "Embark on a journey of self-discovery and inner peace at a tranquil meditation retreat.",
      content:
        "Escape the noise of everyday life and immerse yourself in mindfulness practices, guided meditation, and serene surroundings. Reconnect with your inner calm on this transformative retreat.",
      image: "https://placekitten.com/809/610",
    },
    {
      title: "Gastronomic Adventure: Street Food Safari",
      description:
        "Embark on a flavorful journey through the city's vibrant street food scene.",
      content:
        "Satisfy your taste buds with a variety of mouthwatering street eats – from spicy tacos to sweet treats. Join us on this gastronomic adventure that celebrates the diversity of street food culture.",
      image: "https://placekitten.com/809/611",
    },
    {
      title: "Art in the Park: Outdoor Gallery Experience",
      description:
        "Immerse yourself in a captivating outdoor art exhibition surrounded by nature's beauty.",
      content:
        "Stroll through an open-air gallery featuring sculptures, paintings, and installations by talented artists. Art in the Park offers a unique blend of creativity and natural splendor.",
      image: "https://placekitten.com/811/612",
    },
    {
      title: "Science and Space Exploration Symposium",
      description:
        "Engage with leading scientists and space enthusiasts at a symposium dedicated to the wonders of science and space exploration.",
      content:
        "From cutting-edge research to space missions, this symposium brings together experts to share insights and inspire curiosity. Join us for an intellectually stimulating experience.",
      image: "https://placekitten.com/800/613",
    },
    {
      title: "Local Music Festival: Sounds of the Community",
      description:
        "Celebrate local talent and diverse musical genres at a vibrant community music festival.",
      content:
        "Experience the joy of live music as local bands and artists take the stage. From indie rock to folk melodies, the music festival promises a weekend of rhythmic delights.",
      image: "https://placekitten.com/813/614",
    },
    {
      title: "Wildlife Conservation Expedition",
      description:
        "Join a conservation expedition to protect endangered wildlife and their natural habitats.",
      content:
        "Contribute to the preservation of our planet's biodiversity by participating in hands-on conservation efforts. This expedition offers a unique opportunity to make a positive impact on the environment.",
      image: "https://placekitten.com/800/615",
    },
    {
      title: "Tech and Gaming Extravaganza",
      description:
        "Immerse yourself in the latest advancements in technology and the world of gaming.",
      content:
        "From virtual reality experiences to the newest gaming consoles, the Tech and Gaming Extravaganza is a paradise for tech enthusiasts and gamers alike. Get ready for an unforgettable tech-filled adventure!",
      image: "https://placekitten.com/815/616",
    },
    {
      title: "Vintage Car Show: Nostalgia on Wheels",
      description:
        "Step back in time and admire a stunning display of vintage cars from different eras.",
      content:
        "Witness the elegance and craftsmanship of classic automobiles as collectors showcase their prized possessions. The Vintage Car Show is a nostalgic journey through automotive history.",
      image: "https://placekitten.com/800/617",
    },
    {
      title: "Sustainable Living Workshop",
      description:
        "Learn practical ways to embrace a sustainable lifestyle and contribute to a greener future.",
      content:
        "Discover eco-friendly practices, from zero-waste living to sustainable fashion. The Sustainable Living Workshop empowers you to make conscious choices for a more sustainable and environmentally-friendly life.",
      image: "https://placekitten.com/817/618",
    },
    {
      title: "Adventure Photography Expedition",
      description:
        "Embark on an adrenaline-fueled photography expedition capturing thrilling moments in the great outdoors.",
      content:
        "Join a team of adventure photographers as they document extreme sports, daring landscapes, and the spirit of adventure. This expedition is for those who seek to capture the raw and untamed beauty of the world.",
      image: "https://placekitten.com/800/619",
    },
  ];

  await Promise.all(
    articles.map(async (a) => {
      const startIndex = Math.floor(Math.random() * foundTags.length);
      // Generate a random slice length between 1 and the remaining items in the array
      const remainingItems = foundTags.length - startIndex;
      const sliceLength =
        Math.floor(Math.random() * Math.min(3, remainingItems)) + 1;
      // Get the random slice
      const randomSlice = foundTags.slice(startIndex, startIndex + sliceLength);

      await prisma.article.create({
        data: {
          ...a,
          userId: foundUsers[Math.floor(Math.random() * foundUsers.length)].id,
          tags: {
            connect: randomSlice.map((tag) => ({ id: tag.id })),
          },
        },
      });
    }),
  );

  console.log("seeded articles...");

  console.log("seeding completed");
}

seed();
