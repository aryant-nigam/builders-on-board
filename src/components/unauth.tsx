import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";
function UnAuth() {
  const [cookie] = useCookies(["user"]);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    console.log("pathanme: ", pathname);
    if (!cookie.user && pathname != "/") router.replace("/unauthorised");
  }, [cookie]);

  return <></>;
}

export default UnAuth;
