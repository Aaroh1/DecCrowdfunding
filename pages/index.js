import { Inter } from "@next/font/google";
import { useEffect } from "react";
import instance from "../ethereum/factory";

export default function Home() {
  useEffect(() => {
    console.log('object')
  }, []);
  return <>Hey There</>;
}
