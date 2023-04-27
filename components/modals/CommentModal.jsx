import { closeCommentModal } from "@/redux/modalSlice";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Modal } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

function CommentModal() {
  const isOpen = useSelector((state) => state.modals.commentModalOpen);
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        className="flex items-center justify-center"
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div className="flex w-4/5 flex-col items-center justify-center gap-4 rounded-lg border border-gray-400 border-opacity-25 bg-black p-5 text-white outline-none md:w-[575px]">
          <div className="flex w-full items-center justify-start">
            <XMarkIcon className="h-5 " />
          </div>
          <div className="flex h-[200px] w-full">
            <div className="flex flex-col items-center justify-start">
              <Image
                src={"/assets/cutzu.gif"}
                draggable="false"
                width={46}
                height={46}
                className="select-none rounded-full"
                alt=""
              />
              <div className="my-1 flex w-[2px] flex-1 flex-col bg-gray-400 bg-opacity-25"></div>
            </div>
            <div className="flex flex-1 flex-col px-3">
              <div className="flex items-center justify-start gap-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="font-semibold">Name</span>
                  <span className=" text-gray-400 text-opacity-50 ">
                    @username
                  </span>
                </div>
                <div className="h-[3px] w-[3px] rounded-full bg-neutral-500"></div>
                2 hours ago
                {/* <Moment fromNow className="text-neutral-500">
                  timestamp
                </Moment> */}
                {/*  */}
              </div>
              <span>text</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CommentModal;
