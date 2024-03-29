import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await auth?.login(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box
        padding={0}
        px={12}
        mt={0}
        display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        padding={0}
        px={2}
        ml={"auto"}
        mr={"auto"}
        mt={0}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput name="email" type="email" label="Email" />
            <CustomizedInput name="password" type="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                color: "black",
                ":hover": { bgcolor: "white", color: "black" },
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
