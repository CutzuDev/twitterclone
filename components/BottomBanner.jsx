import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";

function BottomBanner() {
  return (
    <div className="fixed bottom-0 left-0 flex  w-full items-center justify-center bg-blue-400 ">
      <div className="flex h-full w-full max-w-4xl items-center justify-center px-3 py-3 lg:justify-between">
        <div className=" hidden flex-col lg:flex">
          <span className="text-2xl font-bold">
            Don't miss what's happening
          </span>
          <span className="">People on Twitter are the first to know.</span>
        </div>
        <div className="flex gap-3">
          <LoginModal />
          <SignupModal />
        </div>
      </div>
    </div>
  );
}

export default BottomBanner;
