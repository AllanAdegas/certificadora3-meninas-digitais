import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import moment from "moment-timezone";
import { db } from "@/lib/firebase";

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

// Obter eventos ativos com detalhes
export const getActiveEvents = async () => {
  try {
    const eventsRef = collection(db, "eventos");
    const q = query(eventsRef, where("status", "==", "ativo"));
    const querySnapshot = await getDocs(q); 

    // Retorna a lista de eventos ativos
    return querySnapshot.docs.map((doc) => {
      const eventData = doc.data();

      // Converte as datas do Firebase para objetos Date ajustados ao fuso horário
      const startDate = moment(eventData.data?.toDate ? eventData.data.toDate() : eventData.data)
        .tz("America/Sao_Paulo")
        .toDate();
      const endDate = moment(eventData.data_final?.toDate ? eventData.data_final.toDate() : eventData.data_final)
        .tz("America/Sao_Paulo")
        .toDate();

      // Extrai horas e minutos
      const [startHour, startMinute] = eventData.horaInicio.split(":").map(Number);
      const [endHour, endMinute] = eventData.horaFinal.split(":").map(Number);

      // Ajusta horários nas datas ajustadas ao fuso
      startDate.setHours(startHour, startMinute, 0, 0);
      endDate.setHours(endHour, endMinute, 0, 0);

      return {
        id: doc.id,
        title: eventData.titulo,
        start: startDate,   // Combina data e horaInicio
        end: endDate,       // Combina data_final e horaFinal
        descricao: eventData.descricao
      }
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
    const startDate = moment(eventData.data?.toDate ? eventData.data.toDate() : eventData.data)
      .tz("America/Sao_Paulo")
      .toDate();
    const endDate = moment(eventData.data_final?.toDate ? eventData.data_final.toDate() : eventData.data_final)
      .tz("America/Sao_Paulo")
      .toDate();

    // Extrai horas e minutos
    const [startHour, startMinute] = eventData.horaInicio.split(":").map(Number);
    const [endHour, endMinute] = eventData.horaFinal.split(":").map(Number);

    // Ajusta horários nas datas ajustadas ao fuso
    startDate.setHours(startHour, startMinute, 0, 0);
    endDate.setHours(endHour, endMinute, 0, 0);

    return {
      id: doc.id,
      title: eventData.titulo,
      start: startDate,   // Combina data e horaInicio
      end: endDate,       // Combina data_final e horaFinal
      descricao: eventData.descricao
    };
  });
};
