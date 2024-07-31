import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../main";
import { toast } from "react-toastify";

// icons
import { LuAsterisk } from "react-icons/lu";
import { BiEditAlt } from "react-icons/bi";
import { IoMdCloseCircle } from "react-icons/io";

// redux
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  AppThunkDispatch,
  fetchRestaurantDetails,
} from "../../redux/restaurantData";

interface FormData {
  companyName: string;
  address: string;
  gstNumber: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  notRegisteredWithGST: boolean;
}

const Billing = () => {
  const [model, setModel] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [billingDetails, setBillingDetails] = useState<FormData>();
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch: AppThunkDispatch = useDispatch();
  const resData = useSelector((state: RootState) => state.resturantdata);

  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    address: "",
    gstNumber: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    notRegisteredWithGST: false,
  });

  const toggleModel = () => {
    console.log(formData);
    setModel(!model);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      toggleModel();
    }, 500);
  };

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "notRegisteredWithGST") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
        gstNumber: checked ? "" : formData.gstNumber,
      });
    } else if (name === "gstNumber") {
      setFormData({
        ...formData,
        [name]: value,
        notRegisteredWithGST: value ? false : formData.notRegisteredWithGST,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    setBillingDetails(resData.data.billingDetails);
    setFormData({
      companyName: resData?.data.billingDetails?.companyName,
      address: resData?.data.billingDetails?.address,
      gstNumber: resData?.data.billingDetails?.gstNumber,
      country: resData?.data.billingDetails?.country,
      state: resData?.data.billingDetails?.state,
      city: resData?.data.billingDetails?.city,
      pincode: resData?.data.billingDetails?.pincode,
      notRegisteredWithGST: false,
    });
  }, [resData]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/updateBillingDetails/${resData.data._id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        dispatch(fetchRestaurantDetails({ id: resData.data._id }));
        setLoading(false);
        handleCloseModal();
        toast.success("Billing Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="w-full h-fit relative">
        <div className="lg:w-[93%] h-fit px-[2rem] py-[1rem] flex flex-col items-center justify-center gap-10 lg:ml-[7%]">
          <div className="w-full flex flex-col gap-4 rounded-xl px-8 py-4 h-fit bg-[#F1F7FF]">
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-row gap-4">
                <div className="flex flex-col">
                  <h1 className="text-[1.25rem] font-semibold">
                    Billing Details
                  </h1>
                  <p className="text-[1.1rem] font-[400] text-[#616161]">
                    Your billing will be under this information
                  </p>
                </div>
              </div>
              <div className="w-fit flex flex-col justify-center">
                <button
                  className="w-fit h-fit flex flex-row justify-center items-center gap-2 text-black text-[1.2rem] font-[500] rounded-[0.5rem]"
                  onClick={toggleModel}
                >
                  <BiEditAlt className="" />
                  Edit Details
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl flex flex-row flex-wrap sm:gap-x-[3.5rem] gap-x-[2.5rem] gap-y-[1.37rem] w-fit h-fit p-[1.25rem]">
              <div className="w-[12.4rem] flex flex-col">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  Company Name
                </p>
                <h1 className="text-lg font-semibold">
                  {billingDetails?.companyName}
                </h1>
              </div>
              <div className="w-[12.4rem] flex flex-col">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  Country
                </p>
                <h1 className="text-lg font-semibold">
                  {billingDetails?.country}
                </h1>
              </div>
              <div className="w-[12.4rem] flex flex-col">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  State
                </p>
                <h1 className="text-lg font-semibold">
                  {billingDetails?.state}
                </h1>
              </div>
              <div className="w-[12.4rem] flex flex-col ">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  City
                </p>
                <h1 className="text-lg font-semibold">
                  {billingDetails?.city}
                </h1>
              </div>
              <div className="w-[12.4rem] flex flex-col ">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  Pincode
                </p>
                <h1 className="text-lg font-semibold">
                  {billingDetails?.pincode}
                </h1>
              </div>
              <div className="w-[12.4rem] flex flex-col">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  GST number
                </p>
                <h1 className="text-lg font-semibold">
                  {billingDetails?.gstNumber}
                </h1>
              </div>
              <div className="w-[12.4rem] flex flex-col">
                <p className="text-[1.125rem] text-[#616161] font-[400]">
                  Address
                </p>
                <h1 className="text-lg font-semibold">
                  {billingDetails?.address}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {model && (
          <div
            id="default-modal"
            aria-hidden="true"
            className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-50 p-2`}
          >
            <div
              className={`bg-white w-[31.25rem] shadow-lg rounded-lg overflow-y-auto ${
                isClosing ? "slide-out-right" : "slide-in-right"
              }`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="w-full relative  bg-white rounded-lg shadow h-fit">
                <div className="px-6  sticky bg-white top-0 flex flex-row justify-between py-3 border-b border-b-gray-400">
                  <div className="flex flex-col">
                    <h1 className="text-[1.5rem] font-bold">
                      Edit Billing Details
                    </h1>
                    <p className="text-[1rem] font-medium">
                      Edit your billing details at convenience
                    </p>
                  </div>
                  <IoMdCloseCircle
                    onClick={handleCloseModal}
                    className="text-[2.5rem] hover:cursor-pointer"
                  />
                </div>
                <div className="px-6 py-4 flex flex-col mt-2 h-[88%] justify-evenly">
                  <form
                    onSubmit={submitHandler}
                    className="flex flex-col gap-2 justify-evenly h-full"
                  >
                    <div className="flex flex-col gap-3 justify-between">
                      <div className="flex flex-col gap-1">
                        <label className="flex flex-row items-center text-[0.875rem] font-[500]">
                          Company Name
                          <LuAsterisk className="text-sm text-[#C62828]" />
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full p-2 border-2 border-[#00000033] rounded-[0.5rem] text-[1.125rem]"
                          placeholder="Enter Name"
                          name="companyName"
                          value={formData.companyName}
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="flex flex-row items-center text-[0.875rem] font-[500]">
                          Address
                          <LuAsterisk className="text-sm text-[#C62828]" />
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full p-2 border-2 border-[#00000033] rounded-[0.5rem] text-[1.125rem]"
                          placeholder="Enter Address"
                          name="address"
                          value={formData.address}
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="flex flex-row items-center text-[0.875rem] font-[500]">
                          GST Number
                          <LuAsterisk className="text-sm text-[#C62828]" />
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border-2 border-[#00000033] rounded-[0.5rem] text-[1.125rem]"
                          placeholder="Enter GST Number"
                          name="gstNumber"
                          value={formData.gstNumber}
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="flex justify-between mt-1 items-center">
                        <label className="text-sm font-semibold text-center flex items-center">
                          <input
                            type="checkbox"
                            className="size-[1.25rem] mr-2"
                            name="notRegisteredWithGST"
                            checked={formData.notRegisteredWithGST}
                            onChange={changeHandler}
                          />
                          I am not registered with GST
                        </label>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="flex flex-row items-center text-[0.875rem] font-[500]">
                          Country
                          <LuAsterisk className="text-sm text-[#C62828]" />
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border-2 border-[#00000033] rounded-[0.5rem] text-[1.125rem]"
                          placeholder="Enter Country"
                          name="country"
                          value={formData.country}
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="flex flex-row items-center text-[0.875rem] font-[500]">
                          State
                          <LuAsterisk className="text-sm text-[#C62828]" />
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border-2 border-[#00000033] rounded-[0.5rem] text-[1.125rem]"
                          placeholder="Enter State"
                          name="state"
                          value={formData.state}
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="flex flex-row items-center text-[0.875rem] font-[500]">
                          City
                          <LuAsterisk className="text-sm text-[#C62828]" />
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full p-2 border-2 border-[#00000033] rounded-[0.5rem] text-[1.125rem]"
                          placeholder="Enter City"
                          name="city"
                          value={formData.city}
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="flex flex-row items-center text-[0.875rem] font-[500]">
                          Pincode
                          <LuAsterisk className="text-sm text-[#C62828]" />
                        </label>
                        <input
                          required
                          type="text"
                          className="w-full p-2 border-2 border-[#00000033] rounded-[0.5rem] text-[1.125rem]"
                          placeholder="Enter pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={changeHandler}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row gap-5 mt-3">
                      <span
                        className="w-[50%] text-[1.1rem] text-center rounded-[0.5rem] border-2 font-bold text-richblack-900 px-[12px] py-2 hover:cursor-pointer"
                        onClick={() => handleCloseModal()}
                      >
                        Cancel
                      </span>
                      <button className="w-[50%] bg-[#004AAD] text-[1.1rem] rounded-[0.5rem] text-white font-bold text-richblack-900 px-[12px] py-2">
                        {loading ? (
                          <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                        ) : (
                          <span className="text-[1.2rem] font-Roboto">
                            Save
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Billing;
