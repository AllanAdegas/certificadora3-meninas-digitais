"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const UserContext = createContext();

export function getToken() {
  return Cookies.get("authToken");
}

export function setToken(token) {
  return Cookies.set("authToken", token, { secure: true });
}

export function removeToken() {
  Cookies.remove("authToken");
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setLoading(true);

      if (!currentUser) {
        setUser(null);
        removeToken();
        setLoading(false);
        router.push("/login");
      }

      // Ask the server for user data
      const userToken = await currentUser.getIdToken();
      setToken(userToken);

      const userResponse = await fetch(`/api/user/${currentUser.uid}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!userResponse.ok) {
        console.log("Could not get user info");
        setLoading(false);
        return;
      }

      const user = await userResponse.json();
      setUser(user);
      setIsAdmin(user.edAdmin);
      setLoading(false);
    });
    return unsubscribe;
  }, [router]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
