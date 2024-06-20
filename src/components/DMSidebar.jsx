import React, { useEffect} from "react";
import { useState } from "react";
import { Search, PenSquare, UserCircle2 } from "lucide-react";
import { getHeadersFromLocalStorage } from "./CommonUtils";
import { Spinner } from "./Spinner";
import _debounce from 'lodash/debounce';
import { DirectMessage } from "../pages/DirectMessage";

export const DMSidebar = () => {
    const [users, setUsers] = useState([]);
    const [originalUsers, setOriginalUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = getHeadersFromLocalStorage();

    const [userTargetId, setUserTargetId] = useState(0);
    const [renderUserDms, setRenderUserDms] = useState(false);

    const [userInfo, setUserInfo] = useState({});

    const [inputValue, setInputValue] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [recentDms, setRecentDms] = useState([]);
  
    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    
        // Show the modal when there is input
        if (e.target.value.trim() !== '') {
          handleOpenModal();
        } else {
          handleCloseModal();
        }
    };
  
    const fetchUsers = async () => {
        const get  = {
            method: 'GET', 
            mode: 'cors',
            headers: {
                'access-token' : currentUser.accessToken,  
                'client' : currentUser.client, 
                'expiry' : currentUser.expiry, 
                'uid' : currentUser.uid
            }
        }
        try{
            const response = await fetch(`http://206.189.91.54/api/v1/users`,get);
            const data = await response.json();

            setUsers(data.data);
            setOriginalUsers(data.data);
        } catch (error) {
            console.error(`Error fetching users:`, error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        fetchUsers();
        const dmsFromStorage = localStorage.getItem("recentDms");

        if (dmsFromStorage !== null){
            console.log(JSON.parse(dmsFromStorage));
            setRecentDms(JSON.parse(dmsFromStorage));
        }

    }, []);

    const selectUser = (userData) => {

        setUserTargetId(userData.id);
        setUserInfo(userData);
        setRenderUserDms(true);
        setShowModal(false);

        recentDms.push(userData);
        setRecentDms(recentDms);
        localStorage.setItem('recentDms', JSON.stringify(recentDms));

        setInputValue("");
    }



    const showDms = (userData) => {
        setUserTargetId(userData.id);
        setUserInfo(userData);

        console.log(userTargetId);
        setRenderUserDms(true);
    }

    if(loading) {
        return (
            <div className="dm-container">
                <section>
                    <div className="dmSidebar-container">
                        <div className="dmSidebar-header">
                            <h2>Direct messages</h2>
                            <PenSquare className="icons"/>
                        </div>

                        <div className="dm-search">
                            <div className="dm-searchBar">
                                <Search className="icons"/>
                                <input id="search-dm" type="text" placeholder="Find a DM"/>
                            </div>
                        </div>

                        <div className="dms-list-container">
                            <Spinner />
                        </div>
                    </div>
                </section>
                <section className="blank-page"></section>
            </div>
        )
    }
    else {
        const searchUsers = (search,userArr) => {
            const regex = new RegExp(search, 'i');
        
            const filteredResults = userArr.filter(
                (user) => regex.test(user.email)
              );
        
            setUsers(filteredResults);
        }

        const handleSearch = (value) => {
            searchUsers(value,originalUsers);
        };

        const debouncedSearch = _debounce(handleSearch, 2000);

        const handleChange = (e) => {
            const { value } = e.target;

            setSearchTerm(value);
            handleInputChange(e);
            debouncedSearch(value);
        };

        return (
            <div className="dm-container">
                <section>
                    <div className="dmSidebar-container">
                        <div className="dmSidebar-header">
                            <h2>Direct messages</h2>
                            <PenSquare className="icons"/>
                        </div>

                        <div className="dm-search">
                            <div className="dm-searchBar">
                                <Search className="icons"/>
                                <input onChange={handleChange} value={inputValue} id="search-dm" type="text" placeholder="Find a DM"/>
                                <Modal selectUser={selectUser} showModal={showModal} users={users} handleClose={handleCloseModal} /> 
                            </div>
                        </div>

                        <div className="dms-list-container">
                            {
                                recentDms != undefined?
                                recentDms.map(user => {
                                    return(<>
                                        <RecentMessages showDms={showDms} userData={user}/>
                                    </>)
                                }):<div>Recent Messages Here</div>
                            }
                        </div>
                    </div>
                </section>
                <DirectMessage userInfo={userInfo} userTargetId={userTargetId} renderUserDms={renderUserDms} />
            </div>
        )
    }
}

const RecentMessages = ({showDms ,userData}) => {
    const handleClick = () => {
        showDms(userData);
    }

    return (
        <ul>
            <li onClick={handleClick} className="dm-item">
                <div className="dms-list">
                    <img className="pp" src="src/assets/images/profile.jpg" alt="pp"/>
                    <h5>{userData.email}</h5>
                </div>
            </li>
        </ul>
    )
}

const Modal = ({ selectUser, showModal, handleClose, users }) => {
    if (!showModal) {
      return null;
    }
  
    return (
        <div className="dm-modal">
            <div className="dm-modal-content">
                <div className="dm-modal-header">
                    <span className="close" onClick={handleClose}>
                        &times;
                    </span>
                </div>
                
                <div className="modal-list-container">
                    {users.map(userData => {
                        return (<>
                            <DMSideLi selectUser={selectUser} userData = {userData}/>
                        </>)}
                    )}
                </div>
            </div>
        </div>
    );
  };


const DMSideLi = ({selectUser, userData}) => {
    const handleClick = () => {
        selectUser(userData)
    }

    return (
        <ul>
            <li onClick={handleClick} className="dm-item">
                <div className="dms-list">
                    <img className="pp" src="src/assets/images/profile.jpg" alt="pp"/>
                    <h5>{userData.email}</h5>
                </div>
            </li>
        </ul>
    )
}


