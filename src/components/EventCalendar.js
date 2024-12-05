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
        backgroundColor: "#772B8C", 
        color: "white",
        borderRadius: "5px",
        border: "none",
        padding: "5px",
        textAlign: "center"
      },
    };
  };

  const customMessages = {
    next: "Próximo",
    previous: "Anterior",
    today: "Hoje",
    month: "Mês",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
    showMore: (total) => `+${total} mais`,
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
      messages={customMessages}
      components={{
        toolbar: (props) => (
          <div className="rbc-toolbar">
            <button
              className="rbc-btn rbc-btn-today"
              style={{ backgroundColor: "#C67F23", color: "white", borderRadius: "4px", padding: "6px 12px", margin: "0 5px" }}
              onClick={() => props.onNavigate("TODAY")}
            >
              {customMessages.today}
            </button>
            <button
              className="rbc-btn rbc-btn-previous"
              style={{ backgroundColor: "#C67F23", color: "white", borderRadius: "4px", padding: "6px 12px", margin: "0 5px" }}
              onClick={() => props.onNavigate("PREV")}
            >
              {customMessages.previous}
            </button>
            <button
              className="rbc-btn rbc-btn-next"
              style={{ backgroundColor: "#C67F23", color: "white", borderRadius: "4px", padding: "6px 12px", margin: "0 5px" }}
              onClick={() => props.onNavigate("NEXT")}
            >
              {customMessages.next}
            </button>
            <div className="rbc-toolbar-label">{props.label}</div>
            <div>
              <button
                className="rbc-btn rbc-btn-month"
                style={{ backgroundColor: "#C67F23", color: "white", borderRadius: "4px", margin: "0 5px" }}
                onClick={() => props.onView("month")}
              >
                {customMessages.month}
              </button>
              <button
                className="rbc-btn rbc-btn-week"
                style={{ backgroundColor: "#C67F23", color: "white", borderRadius: "4px", margin: "0 5px" }}
                onClick={() => props.onView("week")}
              >
                {customMessages.week}
              </button>
              <button
                className="rbc-btn rbc-btn-day"
                style={{ backgroundColor: "#C67F23", color: "white", borderRadius: "4px", margin: "0 5px" }}
                onClick={() => props.onView("day")}
              >
                {customMessages.day}
              </button>
              <button
                className="rbc-btn rbc-btn-agenda"
                style={{ backgroundColor: "#c67f23", color: "white", borderRadius: "4px", margin: "0 5px" }}
                onClick={() => props.onView("agenda")}
              >
                {customMessages.agenda}
              </button>
            </div>
          </div>
        ),
      }}
    />
  );
};

export default EventCalendar;
