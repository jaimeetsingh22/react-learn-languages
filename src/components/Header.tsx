import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{cursor:'pointer'}} variant="h5" mr={"auto"} textTransform={'uppercase'}>Learn languages</Typography>
        <Link to={"/"} style={{ margin: "0.5rem",color:'white', textDecoration: "none" }}>
          Home
        </Link>
        <Link style={{ margin: "0.5rem",color:'white', textDecoration: "none" }} to={"/login"}>Login</Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
