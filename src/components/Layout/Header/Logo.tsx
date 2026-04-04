import { Link } from "react-router-dom";
import { HOME_PATH } from "@/routes/path";
import { useGeneral } from "@/hooks/useGeneral";
import { stripHtmlRegex } from "@/utils/htmlUtils";

const Logo = () => {
  const { data: generalData, loading } = useGeneral();

  const organizationName = generalData?.organization_short_name
    ? stripHtmlRegex(generalData.organization_short_name)
    : "Logo";

  return (
    <Link to={HOME_PATH} className="flex items-center gap-2 md:gap-3 flex-shrink-0">
      {loading ? (
        <>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
          <div className="h-5 md:h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-24 md:w-32"></div>
        </>
      ) : (
        <>
          {generalData?.organization_logo && (
            <img
              src={generalData.organization_logo}
              alt={organizationName}
              className="h-8 md:h-10 w-auto object-contain"
            />
          )}
          <span className="text-lg md:text-2xl font-bold truncate max-w-[150px] md:max-w-none">
            {organizationName}
          </span>
        </>
      )}
    </Link>
  );
};

export default Logo;
