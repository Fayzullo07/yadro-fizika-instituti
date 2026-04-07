const LATITUDE = '41.364664';
const LONGITUDE = '69.287714';
const MAP_ZOOM = '16';

const MapEmbed: React.FC = () => (
  <div className="relative h-80 lg:h-auto lg:min-h-100">
    <iframe
      src={`https://yandex.com/map-widget/v1/?ll=${LONGITUDE},${LATITUDE}&z=${MAP_ZOOM}&pt=${LONGITUDE},${LATITUDE},pm2rdm`}
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
