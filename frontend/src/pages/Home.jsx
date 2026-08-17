import { signInWithPopup } from "firebase/auth";
import React from "react";
import api from "../../utils/axios";
import { auth, googleProvider } from "../../utils/firebase";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "../redux/userSlice";
import SideBar from "../components/SideBar";
import ChatArea from "../components/ChatArea";
import Artifact from "../components/Artifact";

function Home() {
  const { userData } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      dispatch(setUserdata(data))
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    const token = await data.user.getIdToken();
    console.log(token);
    await handleLogin(token);
    console.log(data);
  };
  return (
    <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">


<SideBar/>
<ChatArea/>
<Artifact/>
      
      
      
      
      
      
      
      
      
      
      {!userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
          <div className="w-85 bg-[#13151c] border border-white/8 rounded-2xl p-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight">
                Welcome to AstraAI
              </h2>
              <p className="text-[13px] text-slate-500">
                Please login to continue using the app.
              </p>
            </div>

            <button
              className="w-full flex items-center justify-center gap-3 py-2.75 rounded-xl text-sm font-medium text-black/90  bg-white hover:bg-gray-200 shadow-lg transition-all duration-150 cursor-pointer"
              onClick={googleLogin}
            >
              <FcGoogle size={18} />
              Continue With Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
