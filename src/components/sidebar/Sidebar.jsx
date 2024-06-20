import { CustomLink } from "./Link";
import { Home, MessagesSquare, Hash, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("currentUser")
        
        navigate("/login");
    }

    return (
        <div className="sidebar-container">
            <ul className="sidebar_main">
                <div className="top">
                    <CustomLink to="/home">
                        <Home className="sidebar_icons"/><br/>Home
                    </CustomLink>

                    <CustomLink to="/sidechannels">
                        <Hash className="sidebar_icons"/><br/>Channels
                    </CustomLink>

                    <CustomLink to="/sidedm">
                        <MessagesSquare className="sidebar_icons"/><br/>DM's
                    </CustomLink>
                </div>
                
                <div className="bottom">
                    <CustomLink to="/profile">
                        <img className="sidebar-icons" id="profile-icon" src="src/assets/images/profile.jpg" alt="pp"/>
                    </CustomLink>

                    <a className="logout-button" onClick={handleLogout}>
                        <LogOut className="logout-icon" />
                    </a>
                </div>
            </ul>
        </div>
    );
}