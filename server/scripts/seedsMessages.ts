import mongoose, { Types } from "mongoose";
import User, { IUser } from "../models/user-model";
import Message, { IMessage } from "../models/Message";
import connectDB from "../service/mongo-start";

const startDate = new Date("2023-01-01");
const endDate = new Date("2024-01-01");

function getRandomDate(startDate: Date, endDate: Date): Date {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  const randomTimestamp =
    Math.random() * (endTimestamp - startTimestamp) + startTimestamp;
  return new Date(randomTimestamp);
}

async function createMessage(data: Partial<IMessage>): Promise<IMessage> {
  const message = new Message(data);
  return await message.save();
}

async function updateUsersWithMessageId(
  senderId: Types.ObjectId,
  recipientsId: Types.ObjectId[],
  messageId: Types.ObjectId
): Promise<void> {
  await User.findByIdAndUpdate(senderId, { $push: { sent: messageId } });
  await Promise.all(
    recipientsId.map((recipientId) =>
      User.findByIdAndUpdate(recipientId, { $push: { inbox: messageId } })
    )
  );
}

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function run() {
  await connectDB();
  const users = await User.find();
  const messages: IMessage[] = [];

  for (const sender of users) {
    const sentMessagesCount = getRandomInt(0, 30);

    for (let i = 0; i < sentMessagesCount; i++) {
      const isGroupMessage = Math.random() < 0.2;
      const recipientCount = isGroupMessage
        ? getRandomInt(2, users.length - 1)
        : 1;

      let recipients: Types.ObjectId[] = [];
      while (recipients.length < recipientCount) {
        const randomUser = users[getRandomInt(0, users.length - 1)];
        if (
          randomUser._id.toString() !== sender._id.toString() &&
          !recipients.includes(randomUser._id)
        ) {
          recipients.push(randomUser._id);
        }
      }

      const messageData: Partial<IMessage> = {
        message: `Message content from ${sender.username}`,
        subject: `Test message ${i + 1}`,
        attachments: [],
        createdAt: getRandomDate(startDate, endDate),
        isRead: Math.random() < 0.3,
        sender: sender._id,
        recipient: recipients,
      };

      const createdMessage = await createMessage(messageData);
      await updateUsersWithMessageId(
        sender._id,
        recipients,
        createdMessage._id
      );
      messages.push(createdMessage);
    }
  }

  console.log("Messages created successfully.");
  await mongoose.disconnect();
}

run().catch(console.error);
