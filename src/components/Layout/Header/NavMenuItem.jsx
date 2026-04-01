import DropdownMenu from "./DropdownMenu";

const NavMenuItem = ({ item, openDropdown, setOpenDropdown }) => {
  const isOpen = openDropdown === item.id;

  return (
    <li className="relative">
      <button
        type="button"
        onClick={() => setOpenDropdown(isOpen ? null : item.id)}
        className={`
          flex items-center gap-1.5 uppercase text-xs xl:text-sm font-semibold tracking-wide
          px-4 !py-2.5 rounded-lg transition-all duration-200
          ${isOpen
            ? " "
            : ""
          }
        `}
      >
        {item.label}
        <svg
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed left-0 right-0 bottom-0 top-[170px] z-10"
            onClick={() => setOpenDropdown(null)}
            aria-hidden
          />
          <DropdownMenu
            links={item.links}
            onClose={() => setOpenDropdown(null)}
          />
        </>
      )}
    </li>
  );
};

export default NavMenuItem;
