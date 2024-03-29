// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const LogoutButton = () => {
//   const { dispatch } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
 
//     await axios.post("/api/auth/logout");
//     dispatch({ type: "LOGOUT" });
//     navigate("/")   
//   };

//   return (
//     <button onClick={handleLogout}>
//       Logout
//     </button>
//   );
// };

// export default LogoutButton;
