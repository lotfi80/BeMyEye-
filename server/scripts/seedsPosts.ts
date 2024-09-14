import mongoose, { Types } from "mongoose";
import User, { IUser } from "../models/user-model";
import { Post, IPost } from "../models/Post";
import { Category, ICategory } from "../models/Categories";
import { PostImage, IPostImage } from "../models/PostImages";
import connectDB from "../service/mongo-start";

const API_KEY = "AIzaSyCq1RQazyFqWGNL-iwnAfZrEZbkUTJ-pqg";
const getCoordinatesByCity = async (address: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
  );
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  }
  throw new Error("Error fetching coordinates");
};

async function getCategoriesIds() {
  const categoryNames = [
    "Haushalt",
    "Heimwerker-Garten",
    "Möbel-Wohnen",
    "Jobs-Karriere",
    "Lebensmitteln",
    "Klamotten",
    "Shuhen",
    "Sport & Freizeit",
    "Kunst & Handwerk",
  ];

  const categoryPromises = categoryNames.map((name) =>
    Category.findOne({ name })
  );

  const categoriesIds = await Promise.all(categoryPromises);
  console.log(categoriesIds);
  return categoriesIds
    .filter((categoryId) => categoryId !== null)
    .map((categoryId) => categoryId!._id as Types.ObjectId);
}

const postImages = [
  "Designer1.jpeg",
  "Designer2.jpeg",
  "Designer3.jpeg",
  "Designer4.jpeg",
  "Designer5.jpeg",
  "Designer6.jpeg",
  "Designer7.jpeg",
  "Designer8.jpeg",
  "Designer9.jpeg",
  "Designer10.jpeg",
  "Designer11.jpeg",
  "Designer12.jpeg",
  "Designer13.jpeg",
  "generate_image.png",
  "post1.png",
  "post2.png",
  "post3.png",
  "post4.png",
  "post5.png",
  "post6.png",
  "post7.png",
  "post8.png",
];

const streets = [
  "Kaiserstraße",
  "Münchener Straße",
  "Bahnhofstraße",
  "Friedrichstraße",
  "Kaiser-Wilhelm-Straße",
  "Unter den Linden",
  "Kurfürstendamm",
  "Potsdamer Platz",
  "Alexanderplatz",
  "Hauptstraße",
  "Lindenstraße",
  "Gendarmenmarkt",
  "Grünstraße",
  "Schloßstraße",
  "Wilhelmstraße",
];
const loremIpsumTexts = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec viverra ligula.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet.",
  "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.",
  "Donec sollicitudin molestie malesuada.",
  "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
  "Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla porttitor accumsan tincidunt.",
  "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
  "Nulla quis lorem ut libero malesuada feugiat.",
  "Pellentesque in ipsum id orci porta dapibus. Curabitur aliquet quam id dui posuere blandit.",
  "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
  "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
];
const startDate = new Date("2023-01-01");
const endDate = new Date("2024-01-01");

// async function createUser(data: Partial<IUser>): Promise<IUser> {
//   const user = new User(data);
//   return await user.save();
// }

function getRandomDate(startDate: Date, endDate: Date): Date {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  const randomTimestamp =
    Math.random() * (endTimestamp - startTimestamp) + startTimestamp;
  return new Date(randomTimestamp);
}

async function createPost(data: Partial<IPost>): Promise<IPost> {
  const post = new Post(data);
  return await post.save();
}

async function createPostImage(imageUrl: string): Promise<IPostImage> {
  const postimage = new PostImage({ image: imageUrl });
  return await postimage.save();
}

async function updatePostImageWithPostId(
  postImageId: Types.ObjectId,
  postId: Types.ObjectId,
  createAt: Date
): Promise<void> {
  await PostImage.findByIdAndUpdate(postImageId, {
    $set: { postid: postId, createAt: createAt },
  });
}

async function updateUserWithPostId(
  userId: Types.ObjectId,
  postId: Types.ObjectId
): Promise<void> {
  await User.findByIdAndUpdate(userId, { $set: { postid: postId } });
}

async function run() {
  await connectDB();
  const users = await User.find();
  const categoriesIds = await getCategoriesIds();

  for (const user of users) {
    if (user.username)
      for (let i = 1; i <= 10; i++) {
        const imageUrl =
          postImages[Math.floor(Math.random() * postImages.length)];
        const city = user.city || "";
        const street = streets[Math.floor(Math.random() * streets.length)];
        const category = categoriesIds[Math.floor(Math.random() * 9)];
        const description =
          loremIpsumTexts[Math.floor(Math.random() * loremIpsumTexts.length)];
        const postimage = `postImages/${imageUrl}`;
        const createdPostImage: IPostImage = await createPostImage(postimage);

        const postimageid: Types.ObjectId =
          createdPostImage._id as Types.ObjectId;
        const postDate = getRandomDate(startDate, endDate);
        const { lat, lng } = await getCoordinatesByCity(city);
        const data = {
          userid: user._id,
          title: `Post ${user.username}-${i}`,
          description: description,
          city: city,
          street: street,
          country: "Deutschland",
          postimage: [postimageid],
          postDate: postDate,
          category: category,
          createdAt: postDate,
          address: city,
          location: {
            type: "Point" as "Point",
            coordinates: [lng, lat],
          },
        };
        const createdPost = await createPost(data);
        await updatePostImageWithPostId(
          postimageid,
          createdPost._id as Types.ObjectId,
          postDate
        );
        await updateUserWithPostId(user._id, createdPost._id as Types.ObjectId);
      }
  }

  console.log("Posts created successfully.");
  await mongoose.disconnect();
}

run().catch(console.error);
