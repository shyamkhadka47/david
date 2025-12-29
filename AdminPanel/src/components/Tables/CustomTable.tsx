import React from 'react';
import { useCheckLocalColor } from '../../hooks/useCheckLocalColor';

interface props {
  heading: string;
  column: { key: string; title: string }[];
  data: any;
  editbutton?: string;
  deletebutton?: string;
  replybutton?: string;
}

const CustomTable = ({
  heading,
  column,
  data,
  editbutton,
  deletebutton,
  replybutton,
}: props) => {

  const{color}= useCheckLocalColor()
  
  return (
    <>
      <div className="max-w-[1020px] mx-auto">
        <div className="w-full flex justify-between items-center mb-5 mt-1 pl-3">
          <div>
            <h3 className={`${color == "dark" &&  "text-white"} "text-[25px] font-semibold text-black"`}>{heading}</h3>
          </div>
        </div>

        <div className="relative flex flex-col w-full h-full overflow-hidden text-black-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead className="py-4">
              <tr>
                {column?.map((el, i) => (
                  <th
                    className="p-4  border-b border-slate-200 bg-green-900 border-r"
                    key={i}
                  >
                    <p className="text-sm font-normal leading-none text-white">
                      {el.title}
                    </p>
                  </th>
                ))}
                <th className="p-4 border-b border-slate-200 bg-green-900 border-r">
                  <p className="text-sm font-normal leading-none text-white text-center">
                    Actions
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map(
                (
                  el: {
                    [x: string]:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  },
                  ind: React.Key | null | undefined,
                ) => (
                  <tr
                    className="hover:bg-slate-50 border-b border-slate-200"
                    key={ind}
                  >
                    {column.map((col, i) => (
                      <td
                        className="p-4 py-5 border border-r max-w-[450px]"
                        key={i}
                      >
                        {col.key == 'image' && el[col.key] ? (
                          <div className="w-[50px] h-[50px] mx-auto">
                            <img
                              src={`${el[col.key]}`}
                              className="w-[100%] h-[100%] object-cover"
                            />
                          </div>
                        ) : (
                          ''
                        )}

                        <p className="block font-semibold text-sm text-black">
                          {col.key == 'image' ? '' : el[col.key]}
                        </p>
                      </td>
                    ))}
                    <td className="p-4 py-5 border border-r">
                      <p className=" font-semibold text-sm text-black flex items-center justify-center gap-4">
                        {editbutton && (
                          <button
                            className="px-4 py-1 text-sm font-medium text-white bg-green-900 rounded"
                            // onClick={() => handleEdit(product)}
                          >
                            {editbutton}
                          </button>
                        )}
                        {deletebutton && (
                          <button
                            className="px-2 py-1 text-sm font-medium text-white bg-deleteButton rounded"
                            // onClick={() => handleDelete(product)}
                          >
                            {deletebutton}
                          </button>
                        )}

                        {replybutton && (
                          <button
                            className="px-2 py-1 text-sm font-medium text-white bg-green-900 rounded"
                            // onClick={() => handleDelete(product)}
                          >
                            {replybutton}
                          </button>
                        )}
                      </p>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center px-4 py-3">
            <div className="text-sm text-black">
              Showing <b>1-5</b> of 45
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-black bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Prev
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                1
              </button>
              {/* <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-black bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                2
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-black bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                3
              </button> */}
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-black bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomTable;
