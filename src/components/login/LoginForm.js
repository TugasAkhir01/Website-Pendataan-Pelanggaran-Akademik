import React, { useState } from "react";
import { Button, TextField, Typography, Paper, Box, Alert, } from "@mui/material";
import { IconButton, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Visibility, VisibilityOff, CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ForgotPasswordDialog from "./ForgotPassword";

const LoginForm = () => {
  const navigate = useNavigate();

  const [openForgot, setOpenForgot] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setOpenSuccessDialog(true);
    } catch (err) {
      setError("Terjadi kesalahan saat login");
    }
  };

  const handleDialogClose = () => {
    setOpenSuccessDialog(false);
    navigate("/home");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.default",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 8,
          textAlign: "center",
          backgroundColor: "background.paper",
          width: 400,
          borderRadius: 2,
        }}
      >
        <Box mb={2}>
          <Box
            sx={{
              width: 60,
              height: 60,
              backgroundColor: "grey.100",
              borderRadius: "50%",
              margin: "0 auto",
            }}
          />
        </Box>
        <Typography variant="h6" color="text.primary" gutterBottom>
          LOGIN
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email / NIM / NIP"
          variant="outlined"
          fullWidth
          margin="dense"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, height: 48, fontWeight: "bold" }}
          onClick={handleLogin}
        >
          LOGIN
        </Button>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, cursor: "pointer" }}
          onClick={() => setOpenForgot(true)}
        >
          Lupa Password ?
        </Typography>

        {openForgot && (
          <ForgotPasswordDialog onClose={() => setOpenForgot(false)} />
        )}
        <Dialog open={openSuccessDialog} onClose={handleDialogClose}
          sx={{
            '& .MuiDialog-paper': { borderRadius: '16px', width: 330, minHeight: 300 },
          }}
        >
          <DialogTitle sx={{ textAlign: "center", paddingBottom: 0 }}>
            <Box sx={{ mb: 1, mt: 2 }}>
              <CheckCircleIcon sx={{ color: "success.main", fontSize: "80px" }} />
            </Box>
            <Typography variant="h6" component="span" fontWeight="bold">
              Login Berhasil
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="body2">
              Anda berhasil login. Selamat datang!
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mr: 2, mb: 2 }}>
            <Button onClick={handleDialogClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default LoginForm;
