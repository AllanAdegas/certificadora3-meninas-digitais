import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase"; 

const fixDates = async () => {
  const eventsCollection = collection(db, "eventos");
  const snapshot = await getDocs(eventsCollection);

  snapshot.forEach(async (docSnapshot) => {
    const data = docSnapshot.data();
    const ref = doc(db, "eventos", docSnapshot.id);

    if (typeof data.data === "string") {
      await updateDoc(ref, {
        data: Timestamp.fromDate(new Date(data.data)),
        data_final: Timestamp.fromDate(new Date(data.data_final)),
      });
    }
  });
};

fixDates()
  .then(() => console.log("Datas corrigidas com sucesso!"))
  .catch((error) => console.error("Erro ao corrigir datas:", error));
