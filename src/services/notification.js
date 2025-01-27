import { db } from "@/lib/firebase/client";

export async function sendNotification({ message }) {
  const batch = db.batch();
  const recipients = await db.collection("users").get();

  recipients.forEach((doc) => {
    const ref = db.collection("notifications").doc();
    batch.set(ref, { userId: doc.id, message, sentAt: new Date() });
  });

  await batch.commit();
}
