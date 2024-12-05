import { db } from "@/lib/firebase";

export async function submitFeedback({ feedback }) {
  await db.collection("feedbacks").add({
    feedback,
    submittedAt: new Date(),
  });
}
