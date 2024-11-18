"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUser({ id: currentUser.uid, ...userDoc.data() });
          } else {
            console.error("Usuário não encontrado no Firestore.");
            setUser(null);
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      } else {
        setUser(null);
        router.push("/login");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
