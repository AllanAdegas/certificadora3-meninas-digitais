"use client";

import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const router = useRouter();
  const { user, isAdmin } = useUser();

  useEffect(() => {
    setTimeout(() => {
      console.log("User: ", user);

      if (!user) {
        router.push("/login");
      }
      console.log("User: ", user);
      if (isAdmin) {
        router.push("/dashboard");
      } else if (user && !isAdmin) {
        router.push("/client");
      }
    }, 2000);
  }, [user]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        position: "fixed", // Fixed position to stay in place during scrolling
        top: 0,
        left: 0,
      }}
    >
      <CircularProgress size={64} color="primary" />
    </Box>
  );
}
