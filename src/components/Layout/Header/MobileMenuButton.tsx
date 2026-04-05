interface MobileMenuButtonProps {
  isOpen: boolean;
  isScrolled?: boolean;
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  isScrolled = true,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
        isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
      }`}
      aria-label="Menu"
    >
      {isOpen ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
};

export default MobileMenuButton;
