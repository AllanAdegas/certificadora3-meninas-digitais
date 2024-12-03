import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("pt-br");
moment.tz.setDefault("America/Sao_Paulo");
const localizer = momentLocalizer(moment);

const EventCalendar = ({ events, onSelectEvent }) => {
  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: "#c67f23", 
        color: "white",
        borderRadius: "5px",
        border: "none",
        padding: "5px",
      },
    };
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500, margin: "50px" }}
      onSelectEvent={onSelectEvent}
      eventPropGetter={eventStyleGetter}
      messages={{
        next: "Próximo",
        previous: "Anterior",
        today: "Hoje",
        month: "Mês",
        week: "Semana",
        day: "Dia",
        agenda: "Agenda",
        showMore: (total) => `+${total} mais`,
      }}
    />
  );
};

export default EventCalendar;
