import { Product } from '../../types/product';
import ProductOne from '../../images/product/product-01.png';
import ProductTwo from '../../images/product/product-02.png';
import ProductThree from '../../images/product/product-03.png';
import ProductFour from '../../images/product/product-04.png';

const productData: Product[] = [
  {
    image: ProductOne,
    name: 'Apple Watch Series 7',
    category: 'Electronics',
    price: 296,
    sold: 22,
    profit: 45,
  },
  {
    image: ProductTwo,
    name: 'Macbook Pro M1',
    category: 'Electronics',
    price: 546,
    sold: 12,
    profit: 125,
  },
  {
    image: ProductThree,
    name: 'Dell Inspiron 15',
    category: 'Electronics',
    price: 443,
    sold: 64,
    profit: 247,
  },
  {
    image: ProductFour,
    name: 'HP Probook 450',
    category: 'Electronics',
    price: 499,
    sold: 72,
    profit: 103,
  },
];

interface props{
  heading?:string
  image?:string
  title1?:string
  title2?:string
  title3?:string
  editbutton?:string
  deletebutton?:string
  replybutton?:string
}

const TableTwo = ({heading, image, title1, title2, title3, deletebutton, editbutton, replybutton}:props) => {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {heading}
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
         {image &&  <div className="col-span-1 flex items-center">
            <p className="font-medium">{image}</p>
          </div>}
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">{title1}</p>
          </div>
          {title2 && <div className={`${title2? "col-span-2" : " col-span-0"} "flex items-center"`}>
            <p className="font-medium">{title2}</p>
          </div>}
          <div className={`${title2 ? "col-span-2" : "col-span-4"} flex items-center`}>
            <p className="font-medium">{title3}</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {productData.map((product, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
           {image &&  <div className="col-span-1 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <img src={product.image} alt="Product" />
                </div>
                {/* <p className="text-sm text-black dark:text-white">
                {product.name}
              </p> */}
              </div>
            </div>}
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {product.category}
              </p>
            </div>
            {title2 && <div className={`${title2 ? "col-span-2" : "col-span-0" } flex items-center`}>
              <p className="text-sm text-black dark:text-white">
                ${product.price}
              </p>
            </div>}
            <div className={`${title2  ? "col-span-2" : "col-span-4"} flex items-center`}>
              <p className="text-sm text-black dark:text-white">
                {product.sold} and this is testing and few more testing of something which i dont have any idea.
              </p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <div className="col-span-1 flex items-center gap-3">
                {editbutton && <button
                  className="px-4 py-1 text-sm font-medium text-white bg-green-900 rounded"
                  // onClick={() => handleEdit(product)}
                >
                  Edit
                </button>}
                {deletebutton &&  <button
                  className="px-2 py-1 text-sm font-medium text-white bg-deleteButton rounded"
                  // onClick={() => handleDelete(product)}
                >
                  Delete
                </button>}

                {replybutton && <button
                  className="px-2 py-1 text-sm font-medium text-white bg-green-900 rounded"
                  // onClick={() => handleDelete(product)}
                >
                  Reply
                </button>}
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-end gap-3 py-2">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 dark:text-gray-400 pr-10">
              Showing{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                1
              </span>{' '}
              to{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                10
              </span>{' '}
              of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                100
              </span>{' '}
              Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0 gap-3">
              {/* Buttons */}
              <button className="flex items-center rounded-md justify-center px-4 h-10 text-base font-medium text-white bg-green-900 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Prev
              </button>
              <button className="flex items-center rounded-md justify-center px-4 h-10 text-base font-medium text-white bg-green-900 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableTwo;
