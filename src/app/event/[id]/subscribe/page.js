import EventSubscriptionForm from "@/components/EventSubscriptionForm";

export default function EventPage({ params }) {
  const event = {
    id: params.id,
    title: "Workshop de Introdução à Programação",
    description: "Um workshop interativo para aprender conceitos básicos de programação.",
  };

  return (
    <main>
      <EventSubscriptionForm event={event} />
    </main>
  );
}