import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import moment from "moment-timezone";

// Obter contagem de eventos ativos
export const getActiveEventsCount = async () => {
  try {
    const eventsRef = collection(db, "eventos");
    const q = query(eventsRef, where("status", "==", "ativo"));
    const querySnapshot = await getDocs(q);

    // Retorna a contagem de eventos ativos
    return querySnapshot.size;
  } catch (error) {
    console.error("Erro ao buscar contagem de eventos ativos:", error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    await deleteDoc(doc(db, "eventos", id));
  } catch (error) {
    console.error("Erro ao excluir Evento:", error);
    throw error;
  }
};

// Obter eventos ativos com detalhes
export const getActiveEvents = async () => {
  try {
    const eventsRef = collection(db, "eventos");
    const q = query(eventsRef, where("status", "==", "ativo"));
    const querySnapshot = await getDocs(q);
    // Retorna a lista de eventos ativos
    return querySnapshot.docs.map((doc) => {
      const eventData = doc.data();
      console.log(eventData);
      // Converte as datas do Firebase para objetos Date ajustados ao fuso horário
      let startDate = moment(
        eventData.data?.toDate ? eventData.data.toDate() : eventData.data
      )
        .tz("America/Sao_Paulo")
        .toDate();
      let endDate = moment(
        eventData.data_final?.toDate
          ? eventData.data_final.toDate()
          : eventData.data_final
      )
        .tz("America/Sao_Paulo")
        .toDate();

      // Extrai horas e minutos
      const [startHour, startMinute] = eventData.horaInicio
        .split(":")
        .map(Number);
      const [endHour, endMinute] = eventData.horaFinal.split(":").map(Number);

      // Ajusta horários nas datas ajustadas ao fuso
      startDate.setHours(startHour, startMinute, 0, 0);
      endDate.setHours(endHour, endMinute, 0, 0);
      console.log(eventData);

      //Corrindo datas
      startDate = new Date(startDate);
      startDate = startDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      endDate = new Date(endDate);
      endDate = endDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      console.log(`${startDate} e ${endDate}`);

      return {
        id: doc.id,
        title: eventData.titulo,
        start: startDate, // Combina data e horaInicio
        end: endDate, // Combina data_final e horaFinal
        descricao: eventData.descricao,
      };
    });
  } catch (error) {
    console.error("Erro ao buscar eventos ativos:", error);
    throw error;
  }
};

// Obter eventos futuros
export const getUpcomingEvents = async () => {
  try {
    const eventsRef = collection(db, "eventos");
    const q = query(eventsRef, where("data", ">=", new Date())); // Filtra pela data futura
    const querySnapshot = await getDocs(q);

    // Retorna a contagem de eventos futuros
    return querySnapshot.size;
  } catch (error) {
    console.error("Erro ao buscar eventos futuros:", error);
    throw error;
  }
};

// Obter eventos passados
export const getPastEvents = async () => {
  try {
    const eventsRef = collection(db, "eventos");
    const q = query(eventsRef, where("data", "<", new Date())); // Filtra pela data passada
    const querySnapshot = await getDocs(q);

    // Retorna a contagem de eventos passados
    return querySnapshot.size;
  } catch (error) {
    console.error("Erro ao buscar eventos passados:", error);
    throw error;
  }
};

// Obter evento por ID
export const getEventById = async (id) => {
  try {
    const eventDoc = await getDoc(doc(db, "eventos", id));
    if (eventDoc.exists()) {
      return { id: eventDoc.id, ...eventDoc.data() };
    } else {
      throw new Error("Evento não encontrado.");
    }
  } catch (error) {
    console.error("Erro ao buscar evento:", error);
    throw error;
  }
};

// Atualizar dados de um evento pelo ID
export const updateEventById = async (id, updatedData) => {
  try {
    await updateDoc(doc(db, "eventos", id), updatedData);
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    throw error;
  }
};

// Buscar eventos cadastrados
export const calendarEvents = async () => {
  const eventsCollection = collection(db, "eventos");
  const q = query(eventsCollection, where("status", "==", "ativo"));
  const eventsSnapshot = await getDocs(q);

  return eventsSnapshot.docs.map((doc) => {
    const eventData = doc.data();

    // Converte as datas do Firebase para objetos Date ajustados ao fuso horário
    const startDate = moment(
      eventData.data?.toDate ? eventData.data.toDate() : eventData.data
    )
      .tz("America/Sao_Paulo")
      .toDate();
    const endDate = moment(
      eventData.data_final?.toDate
        ? eventData.data_final.toDate()
        : eventData.data_final
    )
      .tz("America/Sao_Paulo")
      .toDate();

    // Extrai horas e minutos
    const [startHour, startMinute] = eventData.horaInicio
      .split(":")
      .map(Number);
    const [endHour, endMinute] = eventData.horaFinal.split(":").map(Number);

    // Ajusta horários nas datas ajustadas ao fuso
    startDate.setHours(startHour, startMinute, 0, 0);
    endDate.setHours(endHour, endMinute, 0, 0);

    return {
      id: doc.id,
      title: eventData.titulo,
      start: startDate, // Combina data e horaInicio
      end: endDate, // Combina data_final e horaFinal
      descricao: eventData.descricao,
    };
  });
};

// Inscrever usuário em um evento
export const enrollUserInEvent = async (eventId, userEmail) => {
  try {
    const eventRef = doc(db, "eventos", eventId);
    const eventDoc = await getDoc(eventRef);

    if (eventDoc.exists()) {
      const eventData = eventDoc.data();

      if (!eventData.inscritos) {
        // Cria a lista de inscritos caso não exista
        await updateDoc(eventRef, {
          inscritos: [userEmail],
        });
      } else {
        // Adiciona o e-mail à lista existente
        await updateDoc(eventRef, {
          inscritos: arrayUnion(userEmail),
        });
      }
    } else {
      throw new Error("Evento não encontrado.");
    }
  } catch (error) {
    console.error("Erro ao inscrever usuário no evento:", error);
    throw error;
  }
};
