import { useEvents } from '@/hooks/useEvents';
import type { EventApiItem } from '@/types';
import EventHero from './EventHero';

/** Landing events section: the nearest event as a hero, the following ones as quick switches. */
const EventsTimeline: React.FC = () => {
  const { data, loading } = useEvents({ per_page: 4 });
  const items: EventApiItem[] = Array.isArray(data?.data) ? data.data.slice(0, 4) : [];

  if (loading || !items.length) return null;
  return <EventHero items={items} />;
};

export default EventsTimeline;
