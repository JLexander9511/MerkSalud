"use client";

import NavBar from "./components/NavBar";
import AsideMenu from "./components/AsideMenu";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { goIdle } from "@/store/app";

 function AdminDashboard() {

  const {errorMessage, status} = useSelector((state) => state.auth)
  const router = useRouter();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    (status != 'authenticated') && router.push('/admin')
    dispatch( goIdle() )
  }, [])

  
  return (
    <section 
      className="bg-white rounded-md p-2">
      Vision general
    </section>
  )
}

export default AdminDashboard
