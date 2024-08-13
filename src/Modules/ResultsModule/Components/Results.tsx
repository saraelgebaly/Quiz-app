import { ChevronsRight } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Results() {
  const location = useLocation();
  
  const crumbs = location.pathname.split('/').filter(crumb => crumb !== '');

  const crumbPath = (index:any) => `/${crumbs.slice(0, index + 1).join('/')}`;
  return (
    <>
    <nav className="mb-4">
      <ul className="flex text-gray-600 space-x-2">
        {crumbs.map((crumb, index) => (
          <li key={index} 
          className="flex items-center bg-yellow-20"
          >
            <Link to={crumbPath(index)} 
            className="hover:underline capitalize font-semibold"
            >
              {crumb}
            </Link>
            
            {index < crumbs.length - 1 && <span> <ChevronsRight className='ms-2 text-[#C5D86D]' /> </span>}

          </li>
        ))}
      </ul>
    </nav>
    <div className='mt-6'>
      <Outlet />

    </div>
  </>  )
}

export default Results