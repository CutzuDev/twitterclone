import { closeSearchModal } from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SearchModal() {
  const isOpen = useSelector((state) => state.modals.searchModalOpen);
  const dispatch = useDispatch();
  const [searchValue, setsearchValue] = useState("");
  const router = useRouter();

  function handleChange(event) {
    setsearchValue(event.target.value);
  }

  function handleKeyDown(event) {
    const keyID = event.keyCode;
    if (keyID === 13 && searchValue !== "") {
      setsearchValue("");
      router.push(`/?search=${searchValue}`);
      dispatch(closeSearchModal());
    }
  }

  function handleButtonClick() {
    if (searchValue !== "") {
      setsearchValue("");
      router.push(`/?search=${searchValue}`);
      dispatch(closeSearchModal());
    }
  }
  return (
    <div className="absolute left-0 top-0">
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSearchModal())}
        className="flex items-center justify-center"
      >
        <div className="flex w-4/5 flex-col items-center justify-center gap-4 rounded-lg border border-gray-400 border-opacity-25 bg-black p-7 text-white outline-none  md:w-[575px]">
          <input
            placeholder="Search Twitter"
            type="text"
            onChange={handleChange}
            onKeyUp={handleKeyDown}
            value={searchValue}
            maxLength={20}
            className="mb-[2px] w-full rounded-md border border-gray-400 border-opacity-0 bg-transparent p-2 px-4 outline-none transition-all duration-200 placeholder:text-gray-400 placeholder:text-opacity-50 focus:border-blue-400 focus:border-opacity-100"
          />
          <button
            onClick={handleButtonClick}
            className="w-full rounded-md bg-blue-500 p-3 text-lg font-semibold"
          >
            Search
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default SearchModal;
