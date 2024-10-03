import { useLocation, Link, useParams } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";

const BreadCrumbs = () => {
  const location = useLocation();
  const { patient_id, id } = useParams(); // Capture all dynamic segments

  const pathSegments = location.pathname.split('/').filter(Boolean);

  const getBreadcrumbItems = () => {
    let accumulatedPath = ''; // To store the dynamically built path
    const breadcrumbItems = pathSegments.map((segment, index) => {
      // Construct the 'to' path dynamically
      accumulatedPath += `/${segment}`; // Use segment, not '$'

      const label = segment.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); 
      return { to: accumulatedPath, label };
    });

    return [
      { 
        to: '/', 
        label: (
          <Link to="/" className="flex items-center text-blue-500 hover:underline">
            <IoHomeOutline size="15" /> 
            <span className="pl-1 text-xs font-serif">Home</span>
          </Link>
        )
      },
      ...breadcrumbItems
    ]; 
  };

  return (
    <nav className="flex px-4 py-2 rounded-md h-[80%]">
      <ol className="flex items-center space-x-2">
        {getBreadcrumbItems().map((item, index) => (
          <li key={item.to} className="flex items-center"> 
            {index > 0 && <span className="text-gray-500">/</span>} 
            <Link to={item.to} className="text-blue-500 pl-1 text-xs  font-serif hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;