import React, { useState } from 'react';
import { BiSolidError } from "react-icons/bi";
import { GiChessKing } from "react-icons/gi";
import TableComponent from "../../component/dashboard/TableComponent";

interface TableData {
  table: string;
  customercapture: string;
}

const Table: React.FC = () => {
  const [tables, setTables] = useState<TableData[]>([
    { table: "1", customercapture: "30" },
    { table: "2", customercapture: "30" },
    { table: "3", customercapture: "30" },
    { table: "4", customercapture: "30" },
    { table: "5", customercapture: "30" },
  ]);

  const AddTable: TableData = {
    table: (tables.length + 1).toString(),
    customercapture: "30",
  };

  const Addon = () => {
    setTables([...tables, AddTable]);
  };

  return (
    <div className="w-full h-fit relative md:mb-[80px] lg:mb-0">
      <div className="lg:w-[93%] h-fit px-[1rem] py-[1rem] flex flex-col items-center justify-center lg:ml-[7%]">
        <div className="w-full h-fit flex flex-col items-center gap-2 mt-[80px] mx-[1.5rem]">
          <div className="w-full h-fit flex items-center justify-between bg-[#D7E8FF] font-inter font-[400] text-[.9rem] text-black px-[1rem] py-[.5rem] rounded-xl">
            <div className="flex items-center gap-2">
              <BiSolidError className="size-5 text-[#004AADC9]" />
              <p>You are using a free trial! Switch to Premium for maximum utilisation</p>
            </div>
            <button className="px-[.9rem] py-[.3rem] bg-white rounded-lg">Upgrade Now</button>
          </div>

          <div className="w-full h-fit flex items-center justify-between py-1">
            <div>
              <p className="font-Roboto font-[600] text-[1.6rem] text-black">Manage Tables</p>
              <p className="font-inter font-[400] text-[1rem] text-[#7F7E7E]">
                Total Table count: <span className="font-[500] text-[#004AAD]">{tables.length} Tables</span>
              </p>
            </div>
            <div className="relative mr-[1rem]">
              <GiChessKing className="absolute text-white bg-black -right-2 -top-2 size-7 p-[.1rem] border-2 rounded-md" />
              <button onClick={Addon} className="bg-[#004AAD] text-white border border-[#000000CC] rounded-lg px-[2rem] py-[.5rem]">
                Add Table
              </button>
            </div>
          </div>
        </div>
        {tables.map((item) => (
          <div key={item.table} className="w-full">
            <TableComponent data={[item]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
