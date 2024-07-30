import axios from "axios";
import { baseUrl } from "../../main";
import { useState } from "react";
import { toast } from "react-toastify";

// assets
import deleted from "../../assets/deleted.png";

// redux
import {
  AppThunkDispatch,
  fetchRestaurantDetails,
} from "../../redux/restaurantData";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface DeleteProps {
  setModal: (isOpen: boolean) => void;
  categoryID: string | null;
  restaurantID: string | null;
}

const CategoryDelete: React.FC<DeleteProps> = ({
  setModal,
  categoryID,
  restaurantID,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch: AppThunkDispatch = useDispatch();
  const resData = useSelector((state: RootState) => state.resturantdata);

  const handleDelete = () => {
    setLoading(true);
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/deletecategory/${restaurantID}/${categoryID}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        dispatch(fetchRestaurantDetails({ id: resData.data._id }));
        setModal(false);
        toast.success("Category Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      id="default-modal"
      // tabIndex="-1"
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50`}
    >
      <div className={`p-4 w-full sm:w-fit h-fit`}>
        <div className="w-[350px] relative bg-white rounded-lg shadow">
          <div className="flex flex-col items-center gap-2 px-10 py-4">
            <img src={deleted} className="w-[200px] h-auto" />
            <p className="text-[#0F172A] text-center text-[20px] font-[400]">
              Are you sure you want to delete ?
            </p>
          </div>
          <div className="flex flex-col mt-2 px-8 pb-5">
            <div className="flex flex-row gap-5 mt-4">
              <button
                className="w-[50%]  text-[1.1rem] rounded-[8px] border-2 font-bold text-richblack-900 px-[12px] py-2"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button
                className="w-[50%] bg-[#004AAD]  text-[1.1rem] rounded-[8px] text-white font-bold text-richblack-900 px-[12px] py-2"
                onClick={handleDelete}
              >
                {loading ? (
                  <div className="inline-block  h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDelete;
