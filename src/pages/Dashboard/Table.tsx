import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import QRCode from 'qrcode';
import { baseUrl } from '../../main';
import { toast } from 'react-toastify';
import { userUrl } from '../../main';

//icons
import { BiSolidError } from "react-icons/bi";
import { GiChessKing } from "react-icons/gi";

//components
import TableComponent from "../../component/dashboard/TableComponent";

//redux
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
export interface TableData {
  _id: string;
  resId: string;
  tableNo: string;
  count: number;
  image: string;
  url: string;
  newCustomer: number;
  totalCustomer: number;
  __v: number;
}

const Table: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.resturantdata);
  const [tables, setTables] = useState<TableData[]>([]);
  
  const createTable = async () => {
    const resId = data?._id;
    const tableNo = tables.length + 1;
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/api/scan/${resId}/${tableNo}`,
        headers: {}
      };

      axios.request(config)
        .then((response) => {
          toast.success("Table created successfully");
          const tableNo = response.data?.scans?.tableNo;
          const id = response.data?.scans?._id;
          fileUploader(tableNo, resId, id);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handlefram = () => {
    document.getElementById("frame")!.style.display = "none";
  };

  const fileUploader = async (tableNo: string, resId: string, id: string) => {
    try {
      const resUrl = `${userUrl}/restaurant/${resId}/${tableNo}`;

      QRCode.toDataURL(resUrl)
        .then(url => {
          let data = JSON.stringify({
            "image": url,
            "url": resUrl
          });

          let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${baseUrl}/api/scan/${id}`,
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };

          axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });

        })
        .catch(err => {
          console.error(err)
        })

    } catch (error) {
      console.log(error)
    }
  }

  const fetchtableData = useCallback(async () => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${baseUrl}/api/scan/${data?._id}`,
        headers: {}
      };

      axios.request(config)
        .then((response) => {
          setTables(response.data?.scans);
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  }, [data,tables]);

  useEffect(() => {
    if (data) {
      fetchtableData();
    }
  }, [data, fetchtableData]);

  return (
    <div className="w-full h-fit relative md:mb-[80px] lg:mb-0">
      <div className="lg:w-[93%] h-fit px-[1rem] py-[1rem] flex flex-col items-center justify-center lg:ml-[7%]">
        <div onClick={handlefram} className="w-full h-fit flex flex-col items-center gap-2 mt-[80px] mx-[1.5rem]">

          <div className="w-full h-fit flex items-center justify-between bg-[#D7E8FF] font-inter font-[400] text-[.9rem] text-black px-[1rem] py-[.5rem] rounded-xl">
            <div className="flex items-center gap-2">
              <BiSolidError className="size-5 text-[#004AADC9]" />
              <p>You are using a free trial! Switch to Premium for maximum utilisation</p>
            </div>
            <button className="px-[.9rem] py-[.3rem] bg-white rounded-lg">Upgrade Now</button>
          </div>

          <div className="w-full h-fit flex items-center justify-between py-2">
            <div>
              <p className="font-Roboto font-[600] text-[1.6rem] text-black">Manage Tables</p>
              <p className="font-inter font-[400] text-[1rem] text-[#7F7E7E]">
                Total Table count: <span className="font-[500] text-[#004AAD]">{tables.length} Tables</span>
              </p>
            </div>
            <div className="relative mr-[1rem]">
              <GiChessKing className="absolute hidden text-white bg-black -right-2 -top-2 size-7 p-[.1rem] border-2 rounded-md" />
              <button onClick={createTable} className="bg-[#004AAD] text-white border border-[#000000CC] rounded-lg px-[2rem] py-[.5rem]">
                Add Table
              </button>
            </div>
          </div>

        </div>
        {tables.map((item) => (
          <div key={item?._id} className="w-full my-[.5rem]">
            <TableComponent data={item} totaltable={tables.length} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
