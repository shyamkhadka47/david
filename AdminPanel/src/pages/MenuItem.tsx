import { Link } from 'react-router-dom';
import CustomTable from '../components/Tables/CustomTable';
import { useCheckLocalColor } from '../hooks/useCheckLocalColor';

const Faq = () => {
  const { color } = useCheckLocalColor();

  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'image', title: 'Image' },
    { key: 'description', title: 'Description' },
    { key: 'price', title: 'Price' },
  ];

  const data = [
    {
      name: 'fish taco',
      description: 'John Doe',
      price: 100,
      image: '/no-photo.png',
    },
    {
      name: 'fish taco',
      description: 'John Doe',
      price: 100,
      image: '/no-photo.png',
    },
    {
      name: 'fish taco',
      description: 'John Doe',
      price: 100,
      image: '/no-photo.png',
    },
    {
      name: 'fish taco',
      description: 'John Doe',
      price: 100,
      image: '/no-photo.png',
    },
    {
      name: 'fish taco',
      description: 'John Doe',
      price: 100,
      image: '/no-photo.png',
    },
  ];

  return (
    <div>
      <div className="mt-[-25px]">
        <div className="flex flex-col gap-5 relative">
          <div className=" bg-transparent text-white w-[200px] font-bold py-4 hover:bg-transparent "></div>
          <Link to="/add-new-menu-item">
            <button
              className={`${
                color == 'dark' && 'hover:bg-white hover:text-black'
              } bg-green-900 text-white w-[200px] font-bold py-4 hover:bg-transparent hover:border-[2px] hover:border-green-600 hover:text-black  absolute right-[0] top-5 `}
            >
              Add new Menu Items
            </button>
          </Link>
          <div className="mt-[20px]">
            <CustomTable
              heading={`View All Menu item's`}
              column={columns}
              data={data}
              editbutton="Edit"
              deletebutton="Delete"
            />
            {/* <TableTwo
            heading={`View All FAQ's`}
           
            title1={'Question '}
           
            title3="Answers"
            editbutton='Edit'
            deletebutton='Delete'
          /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
