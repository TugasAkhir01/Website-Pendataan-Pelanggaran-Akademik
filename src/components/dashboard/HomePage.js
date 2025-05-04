import React from "react";
import { Box, Typography, AppBar, Toolbar, IconButton, InputBase, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, } from "@mui/material";
import { Person, Logout } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, } from "@mui/material";


const HomePage = () => {
    const navigate = useNavigate();
    const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user?.nama || "User";

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        localStorage.clear();
        navigate("/");
    };


    return (
        <Box>
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box display="flex" alignItems="center">
                        <IconButton>
                            <img src="/logo192.png" alt="Logo" width={30} />
                        </IconButton>
                        <Typography variant="h6" sx={{ ml: 1 }}>
                            Website Pendataan Pelanggaran Akademik
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Box
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                "&:hover": {
                                    backgroundColor: "action.hover",
                                },
                            }}
                        >
                            <Avatar
                                alt={userName}
                                src={user?.foto || "/default-avatar.png"}
                                sx={{ width: 36, height: 36, mr: 1 }}
                            />
                            <Typography variant="h6" fontSize={16}>
                                {userName}
                            </Typography>
                        </Box>

                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 3,
                                sx: {
                                    mt: 1.5,
                                    minWidth: 150,
                                },
                            }}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <Person fontSize="small" />
                                </ListItemIcon>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={() => setLogoutDialogOpen(true)}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Sign out
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box display="flex">
                <IconButton sx={{ mt: 1, ml: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Box flex={1} p={3}>
                    <Typography variant="h6" fontWeight="bold">
                        Selamat datang, {userName}!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lorem ipsum sit amet consectetur elit
                    </Typography>
                    <Box display="flex" alignItems="center" mt={3} gap={2}>
                        <Paper
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                p: "2px 8px",
                                width: 240,
                            }}
                            variant="outlined"
                        >
                            <SearchIcon sx={{ mr: 1 }} />
                            <InputBase placeholder="Lorem ..." fullWidth />
                        </Paper>
                        <Select size="small" defaultValue="Lorem">
                            <MenuItem value="Lorem">Lorem</MenuItem>
                            <MenuItem value="Ipsum">Ipsum</MenuItem>
                        </Select>
                    </Box>
                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {[
                                        "No.",
                                        "Nama",
                                        "NIM",
                                        "Jurusan",
                                        "ID Kasus",
                                        "Jenis Kasus",
                                        "Status",
                                        "Hasil Sidang",
                                        "Notulensi",
                                    ].map((head, i) => (
                                        <TableCell key={i}>{head}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[1, 2, 3].map((row) => (
                                    <TableRow key={row}>
                                        <TableCell>{row}</TableCell>
                                        <TableCell>Lorem</TableCell>
                                        <TableCell>00000000</TableCell>
                                        <TableCell>Lorem</TableCell>
                                        <TableCell>XX-00-XX</TableCell>
                                        <TableCell>Lorem</TableCell>
                                        <TableCell>
                                            <Button size="small" variant="outlined">
                                                Lorem
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button size="small" variant="contained">
                                                View
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button size="small" variant="contained">
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={4}
                    >
                        <Typography variant="caption">Lorem Ipsum 00 et 00 dolor</Typography>
                        <Box display="flex" gap={1}>
                            <Box width={16} height={16} bgcolor="grey.300" borderRadius={4} />
                            <Box width={16} height={16} bgcolor="grey.300" borderRadius={4} />
                            <Box width={16} height={16} bgcolor="grey.300" borderRadius={4} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Dialog
                open={logoutDialogOpen}
                onClose={() => setLogoutDialogOpen(false)}
                sx={{
                    '& .MuiDialog-paper': { borderRadius: '16px', width: 330, minHeight: 300 },
                }}
            >
                <DialogTitle sx={{ textAlign: "center", paddingBottom: 0 }}>
                    <Box sx={{ mb: 1, mt: 2 }}>
                        <Logout sx={{ color: "error.main", fontSize: "60px" }} />
                    </Box>
                    <Typography variant="h6" component="span" fontWeight="bold">
                        Konfirmasi Logout
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="body2">
                        Apakah Anda yakin ingin keluar dari akun ini?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ mr: 2, mb: 2, gap: 1 }}>
                    <Button onClick={() => setLogoutDialogOpen(false)} color="primary" variant="outlined">
                        Batal
                    </Button>
                    <Button
                        onClick={handleSignOut}
                        color="error"
                        variant="contained"
                    >
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default HomePage;
