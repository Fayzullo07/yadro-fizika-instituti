import { MAP_LATITUDE, MAP_LONGITUDE, MAP_ZOOM } from '@/config/contactData';

const MapEmbed: React.FC = () => (
  <div className="relative h-80 lg:h-auto lg:min-h-100">
    <iframe
      src={`https://www.google.com/maps?q=${MAP_LATITUDE},${MAP_LONGITUDE}&z=${MAP_ZOOM}&t=h&output=embed`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="absolute inset-0"
      title="Manzil xaritasi"
    />
  </div>
);

export default MapEmbed;
