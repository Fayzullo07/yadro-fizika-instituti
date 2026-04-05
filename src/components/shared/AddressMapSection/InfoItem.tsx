interface InfoItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, title, children }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
      {children}
    </div>
  </div>
);

export default InfoItem;
