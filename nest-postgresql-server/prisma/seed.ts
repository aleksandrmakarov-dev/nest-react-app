import { Role, PrismaClient, Tool } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as fs from "fs";
import * as path from "path";

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

  console.log("deleting all tables...");

  await prisma.tool.deleteMany();
  await prisma.project.deleteMany();

  await prisma.tag.deleteMany();
  await prisma.article.deleteMany();

  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.externalProvider.deleteMany();

  console.log("seeding external providers...");

  await prisma.externalProvider.createMany({
    data: externalProviders.map((p) => ({
      name: p,
    })),
  });

  console.log("seeding users...");

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

  console.log("seeding tags...");

  await prisma.tag.createMany({
    data: tags.map((t) => ({
      name: t,
      userId: userId,
    })),
  });

  const foundTags = await prisma.tag.findMany();

  const content: string = await new Promise((resolve, reject) => {
    fs.readFile(
      path.join(process.cwd(), "prisma/content.md"),
      "utf-8",
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      },
    );
  });

  console.log("seeding articles...");

  const articles = [
    {
      title: "Spectacular Sunset at Ocean's Edge",
      description:
        "Witness the breathtaking beauty of nature as the sun sets over the vast ocean.",
      content: content,
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
    {
      title: "Discovering Hidden Waterfalls",
      description:
        "Embark on a journey to explore secret waterfalls tucked away in lush, untouched landscapes.",
      content:
        "Join our team of explorers as they venture into remote areas to unveil the beauty of hidden waterfalls. This expedition promises breathtaking views, the soothing sound of cascading water, and the thrill of discovering nature's well-kept secrets.",
      image: "https://placekitten.com/800/620",
    },
    {
      title: "Urban Street Art Exploration",
      description:
        "Immerse yourself in the vibrant world of urban street art with this eye-opening expedition.",
      content:
        "Walk the streets of bustling cities and witness the creativity of street artists as they transform ordinary spaces into captivating works of art. This expedition is an opportunity to document the dynamic and ever-evolving street art scene.",
      image: "https://placekitten.com/800/621",
    },
    {
      title: "Culinary Adventures Around the Globe",
      description:
        "Embark on a gastronomic journey, exploring diverse cuisines and culinary traditions worldwide.",
      content:
        "Join our team of food enthusiasts as they travel across continents to savor unique flavors, learn cooking techniques, and capture the essence of global cuisine. This expedition is a feast for the senses, combining travel, culture, and delicious discoveries.",
      image: "https://placekitten.com/800/622",
    },
    {
      title: "Sunset Serenity Yoga Retreat",
      description:
        "Escape to a tranquil yoga retreat and experience the serenity of sunset sessions in breathtaking locations.",
      content:
        "Immerse yourself in a rejuvenating yoga experience surrounded by nature's beauty. This retreat offers a perfect blend of mindfulness, relaxation, and breathtaking sunsets that will leave you refreshed and energized.",
      image: "https://placekitten.com/800/623",
    },
    {
      title: "Historical Architecture Expedition",
      description:
        "Journey through time as you explore the intricate details of historical architecture around the world.",
      content:
        "Uncover the stories behind centuries-old buildings, palaces, and monuments. This expedition is a visual feast for architecture enthusiasts, capturing the grandeur and beauty of structures that have withstood the test of time.",
      image: "https://placekitten.com/800/624",
    },
    {
      title: "Wildlife Conservation Safari",
      description:
        "Contribute to wildlife conservation efforts on an immersive safari experience in natural habitats.",
      content:
        "Join a team of conservationists on a mission to protect endangered species. This safari provides an opportunity to observe and document wildlife behavior, contributing to the preservation of Earth's diverse and precious ecosystems.",
      image: "https://placekitten.com/800/625",
    },
    {
      title: "Underwater Photography Expedition",
      description:
        "Dive into the depths of the ocean and capture the mesmerizing world beneath the waves.",
      content:
        "Embark on an underwater adventure with experienced divers and photographers. This expedition explores vibrant coral reefs, marine life, and mysterious underwater landscapes, offering a unique perspective on the beauty of the ocean.",
      image: "https://placekitten.com/800/626",
    },
    {
      title: "Cultural Festivals Documentation",
      description:
        "Immerse yourself in the colors, music, and traditions of cultural festivals from around the globe.",
      content:
        "Capture the vibrancy and diversity of cultural celebrations worldwide. This documentation project allows you to witness and preserve the richness of traditional festivals, from lively parades to intricate rituals.",
      image: "https://placekitten.com/800/627",
    },
    {
      title: "Mountain Peak Photography Expedition",
      description:
        "Reach new heights and capture the awe-inspiring beauty of mountain peaks around the world.",
      content:
        "Join a team of mountaineers and photographers on a journey to conquer towering peaks. This expedition offers breathtaking vistas, challenging climbs, and the chance to document the majesty of some of the world's highest mountains.",
      image: "https://placekitten.com/800/628",
    },
    {
      title: "Sci-Fi Cosplay Showcase",
      description:
        "Step into the futuristic world of sci-fi cosplay and document the creativity of enthusiasts.",
      content:
        "Explore the imaginative and elaborate costumes of sci-fi enthusiasts at conventions and events. This showcase captures the dedication and artistry of cosplayers, bringing to life iconic characters from the realm of science fiction.",
      image: "https://placekitten.com/800/629",
    },
    {
      title: "Sustainable Living Communities",
      description:
        "Document sustainable living practices in communities dedicated to eco-friendly living.",
      content:
        "Visit communities that prioritize sustainability, documenting eco-friendly initiatives, green architecture, and practices that promote a harmonious relationship with the environment. This project highlights efforts to create a more sustainable and resilient future.",
      image: "https://placekitten.com/800/630",
    },
    {
      title: "Desert Adventure and Nomadic Cultures",
      description:
        "Explore the vast deserts and connect with nomadic cultures, capturing the essence of their way of life.",
      content:
        "Embark on a journey through deserts, encountering nomadic communities and experiencing their traditions. This adventure combines the harsh beauty of desolate landscapes with the resilience and rich cultural heritage of nomadic people.",
      image: "https://placekitten.com/800/631",
    },
    {
      title: "Futuristic Technology Expo",
      description:
        "Witness the cutting-edge innovations of the future at a technology expo featuring groundbreaking inventions.",
      content:
        "Explore the forefront of technological advancements at a futuristic expo. Document the latest gadgets, robotics, and inventions that are shaping the future. This expedition provides a glimpse into the exciting possibilities of tomorrow's technology.",
      image: "https://placekitten.com/800/632",
    },
    {
      title: "Enchanting Forest Retreat",
      description:
        "Escape to enchanted forests and capture the mystical beauty of ancient trees and magical landscapes.",
      content:
        "Immerse yourself in the tranquility of ancient forests, capturing the beauty of towering trees, moss-covered stones, and ethereal light. This retreat offers a peaceful escape into nature's enchanting realms.",
      image: "https://placekitten.com/800/633",
    },
    {
      title: "Vintage Automobile Expedition",
      description:
        "Embark on a journey through time as you explore the elegance and craftsmanship of vintage automobiles.",
      content:
        "Capture the allure of classic cars and vintage automobiles from different eras. This expedition takes you on a nostalgic ride, documenting the beauty, design, and engineering of timeless vehicles that have left a mark on automotive history.",
      image: "https://placekitten.com/800/634",
    },
    {
      title: "Tropical Paradise Getaway",
      description:
        "Escape to tropical paradises and document the stunning beaches, vibrant marine life, and lush landscapes.",
      content:
        "Indulge in the beauty of tropical destinations, capturing the crystal-clear waters, palm-fringed beaches, and diverse marine ecosystems. This getaway is a visual feast of sun-kissed landscapes and the vibrant colors of paradise.",
      image: "https://placekitten.com/800/635",
    },
    {
      title: "Artisanal Craftsmanship Exploration",
      description:
        "Celebrate the artistry of traditional crafts and document the skills passed down through generations.",
      content:
        "Explore communities dedicated to preserving traditional craftsmanship. Document the intricate processes and skills involved in creating handmade art, from weaving and pottery to carpentry and metalwork. This project honors the beauty of artisanal traditions.",
      image: "https://placekitten.com/800/636",
    },
    {
      title: "Aerial Photography Adventure",
      description:
        "Soar to new heights and capture breathtaking aerial views of landscapes, cities, and natural wonders.",
      content:
        "Embark on an adventure high above the ground, capturing stunning aerial perspectives. This expedition offers a unique opportunity to document the beauty of landscapes, urban environments, and natural wonders from a bird's-eye view.",
      image: "https://placekitten.com/800/637",
    },
    {
      title: "Harvest Season Farm Experience",
      description:
        "Immerse yourself in the harvest season on farms around the world, documenting the bounty of nature.",
      content:
        "Join farmers during the harvest season, capturing the vibrant colors and abundance of crops. This immersive experience allows you to document the traditions, hard work, and joy associated with bringing in the harvest from fields and orchards.",
      image: "https://placekitten.com/800/638",
    },
    {
      title: "Street Market Chronicles",
      description:
        "Explore the lively atmosphere of street markets and document the diverse products, vendors, and cultures.",
      content:
        "Navigate through bustling street markets, capturing the vibrant scenes, unique products, and cultural diversity. This documentation project showcases the dynamic and lively spirit of markets around the world.",
      image: "https://placekitten.com/800/639",
    },
    {
      title: "Mystical Mountain Monasteries",
      description:
        "Embark on a spiritual journey to mountain monasteries and capture the serene beauty of sacred sites.",
      content:
        "Experience the tranquility of mountain monasteries nestled in breathtaking landscapes. This expedition combines spiritual exploration with visual storytelling, documenting the architecture, rituals, and peaceful surroundings of these sacred places.",
      image: "https://placekitten.com/800/640",
    },
    {
      title: "Night Sky Astrophotography",
      description:
        "Capture the beauty of the night sky and celestial wonders through mesmerizing astrophotography.",
      content:
        "Embark on a nocturnal adventure to document the stars, planets, and cosmic phenomena. This expedition is a journey into the depths of the night sky, capturing the awe-inspiring beauty of the cosmos through long-exposure photography.",
      image: "https://placekitten.com/800/641",
    },
    {
      title: "Rural Traditions Documentation",
      description:
        "Celebrate the richness of rural traditions and document the customs that connect communities to their roots.",
      content:
        "Visit rural areas around the world to document traditional practices, festivals, and lifestyles. This documentation project aims to preserve and showcase the unique customs that contribute to the cultural tapestry of rural communities.",
      image: "https://placekitten.com/800/642",
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

  console.log("seeding tools...");

  const tools = [
    {
      name: "NodeJS",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    },
    {
      name: "C++",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
    },
    {
      name: "React",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/30/React_Logo_SVG.svg",
    },
    {
      name: "C#",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d2/C_Sharp_Logo_2023.svg",
    },
    {
      name: "Python",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    },
  ];

  await prisma.tool.createMany({
    data: tools.map((t) => ({
      name: t.name,
      image: t.image,
      userId: userId,
    })),
  });

  console.log("seeding projects...");

  const foundTools = await prisma.tool.findMany();

  const projects = [
    {
      title: "Network Optimization Tool",
      description:
        "A tool designed to enhance network performance and efficiency by implementing advanced algorithms for routing optimization.",
      image: "https://placekitten.com/300/200",
    },
    {
      title: "Cloud-Based Data Storage Solution",
      description:
        "A scalable and secure cloud-based data storage solution that enables seamless access and management of data from anywhere.",
      image: "https://placekitten.com/301/200",
    },
    {
      title: "Cybersecurity Awareness Platform",
      description:
        "An interactive platform focused on educating users about cybersecurity best practices, threats, and prevention measures.",
      image: "https://placekitten.com/302/200",
    },
    {
      title: "Machine Learning Chatbot",
      description:
        "A chatbot powered by machine learning algorithms to provide intelligent responses and assistance in various IT-related queries.",
      image: "https://placekitten.com/303/200",
    },
    {
      title: "Mobile App Development Framework",
      description:
        "A framework designed to streamline the development of cross-platform mobile applications, offering enhanced performance and user experience.",
      image: "https://placekitten.com/304/200",
    },
    {
      title: "Data Analytics Dashboard",
      description:
        "A comprehensive analytics dashboard that visualizes and interprets complex datasets, aiding in data-driven decision-making processes.",
      image: "https://placekitten.com/305/200",
    },
    {
      title: "Automated Testing Suite",
      description:
        "A suite of automated testing tools to ensure the reliability and quality of software applications through efficient and comprehensive testing processes.",
      image: "https://placekitten.com/306/200",
    },
    {
      title: "Blockchain-Based Authentication System",
      description:
        "An innovative authentication system leveraging blockchain technology to enhance security and eliminate unauthorized access.",
      image: "https://placekitten.com/307/200",
    },
    {
      title: "IT Project Management Platform",
      description:
        "A robust project management platform tailored for IT projects, facilitating collaboration, task tracking, and resource management.",
      image: "https://placekitten.com/308/200",
    },
    {
      title: "Augmented Reality Development Kit",
      description:
        "A kit providing tools and resources for developing augmented reality applications, offering immersive experiences on various devices.",
      image: "https://placekitten.com/309/200",
    },
  ];

  const foundArticle = await prisma.article.findFirst();

  await Promise.all(
    projects.map(async (a) => {
      const startIndex = Math.floor(Math.random() * foundTools.length);
      // Generate a random slice length between 1 and the remaining items in the array
      const remainingItems = foundTools.length - startIndex;
      const sliceLength =
        Math.floor(Math.random() * Math.min(3, remainingItems)) + 1;
      // Get the random slice
      const randomSlice = foundTools.slice(
        startIndex,
        startIndex + sliceLength,
      );

      await prisma.project.create({
        data: {
          ...a,
          url: "/",
          label: "Demo",
          articleId: foundArticle.id,
          userId: foundUsers[Math.floor(Math.random() * foundUsers.length)].id,
          tools: {
            connect: randomSlice.map((tag) => ({ id: tag.id })),
          },
        },
      });
    }),
  );

  console.log("seeding completed");
}

seed();
