"use client";

import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }

    if (user.isAdmin) {
      router.push("/dashboard");
    } else {
      router.push("/client");
    }
  }, [router]);

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
