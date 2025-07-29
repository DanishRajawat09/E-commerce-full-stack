import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isOpen } from "../features/stateSlice";


const useAutoCloseSidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sideBarState.open);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isSidebarOpen) {
        dispatch(isOpen({ open: false })); 
      }
    };

   
    handleResize();


    window.addEventListener("resize", handleResize);


    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, isSidebarOpen]);
};

export default useAutoCloseSidebar;
