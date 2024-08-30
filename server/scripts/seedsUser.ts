import mongoose from "mongoose";
import User, { IUser } from "../models/user-model";
import connectDB from "../service/mongo-start";
import { createHash } from "crypto";

const names = [
  "Max",
  "Anna",
  "Lukas",
  "Laura",
  "Tim",
  "Sophie",
  "Paul",
  "Mia",
  "Jan",
  "Emma",
];
const surnames = [
  "Schmidt",
  "Müller",
  "Schneider",
  "Fischer",
  "Weber",
  "Hoffmann",
  "Schäfer",
  "Klein",
  "Richter",
  "Wolf",
];
const cities = [
  "Berlin",
  "Hamburg",
  "Munich",
  "Cologne",
  "Frankfurt",
  "Stuttgart",
  "Dresden",
  "Hannover",
  "Leipzig",
  "Düsseldorf",
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

async function createUser(data: Partial<IUser>): Promise<IUser> {
  const user = new User(data);
  return await user.save();
}
async function run() {
  await connectDB();

  const password = "password";
  const sha256 = createHash("sha256");
  const hashPassword = sha256.update(password).digest("hex");

  const createTypeUsers = async (
    type: string,
    count: number,
    hasProfile: boolean,
    hasPassword: boolean
  ) => {
    for (let i = 1; i <= count; i++) {
      const firstname = names[Math.floor(Math.random() * names.length)];
      const lastname = surnames[Math.floor(Math.random() * surnames.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const street = streets[Math.floor(Math.random() * streets.length)];

      await createUser({
        email: `${type}${i}@example.com`,
        password: hasPassword ? hashPassword : undefined,
        hasPassword,
        isActivated: true,
        googleId: type.startsWith("g") ? `google_${i}` : undefined,
        firstname: hasProfile ? firstname : undefined,
        lastname: hasProfile ? lastname : undefined,
        username: hasProfile ? `${firstname.toLowerCase()}${i}` : undefined,
        birthdate: hasProfile ? new Date(1980 + i, 0, 1) : undefined,
        profileimage: hasProfile ? `profileImage${i}.jpg` : undefined,
        city: hasProfile ? city : undefined,
        street: hasProfile ? street : undefined,
        country: hasProfile ? "Deutschland" : undefined,
        postid: [],
      });
    }
  };

  await createTypeUsers("guser", 3, false, false); // Google, no password, no profile
  await createTypeUsers("gpuser", 3, true, false); // Google, no password, has profile
  await createTypeUsers("ghuser", 10, false, true); // Google, has password, no profile
  await createTypeUsers("gphuser", 10, true, true); // Google, has password, has profile
  await createTypeUsers("ehuser", 10, false, true); // Email has password, no profile
  await createTypeUsers("ephuser", 10, true, true); // Email has password, has profile

  console.log("Users created successfully.");
  await mongoose.disconnect();
}

run().catch(console.error);
