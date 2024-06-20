import React, { useEffect} from "react";
import { useState } from "react";
import { Hash } from "lucide-react";
import { getHeadersFromLocalStorage } from "./CommonUtils";
import _debounce from 'lodash/debounce';
import { Channels } from "../pages/Channels";
import { DirectMessage } from "../pages/DirectMessage";

export const HomeSidebar = () => {
    const [recentDms, setRecentDms] = useState([]);
    const [recentChannels, setRecentChannels] = useState([]);
    const currentUser = getHeadersFromLocalStorage();

    const[channelData, setChannelData] = useState([]);
    const[channelTargetId, setChannelTargetId] = useState(0);
    const[renderChannelDms, setRenderChannelDms] = useState(false);

    const[userData, setUserData] = useState([]);
    const[userTargetId, setUserTargetId] = useState(0);
    const[renderUserDms, setRenderUserDms] = useState(false);

    const[showChannels, setShowChannels] = useState(true);

    useEffect(() => {
        const dmsFromStorage = localStorage.getItem("recentDms");

        if (dmsFromStorage !== null){
            setRecentDms(JSON.parse(dmsFromStorage));
        }

    }, []);

    useEffect(() => {
        const channelFromStorage = localStorage.getItem("recentChannels");

        if (channelFromStorage !== null){
            setRecentChannels(JSON.parse(channelFromStorage));
        }

    }, []);

    const showDms = (userData) => {
        setUserData(userData);
        setUserTargetId(userData.id);
        setRenderUserDms(true);
        setShowChannels(false);
    }

    const selectCard = (channelData) => {
        setChannelData(channelData);
        setChannelTargetId(channelData.id);
        setRenderChannelDms(true);
        setShowChannels(true);
    }

    const deleteFromStorage =(id, fromChannel) => {
        const testArr = [];

        if (fromChannel){
            recentChannels.map(channel=>{
                if (channel.id != id){
                    testArr.push(channel);
                }
            })
    
            setRecentChannels(testArr);
            localStorage.setItem('recentChannels', JSON.stringify(testArr));
        } else {
            recentDms.map(dm=>{
                if (dm.id != id){
                    testArr.push(dm);
                }
            })
    
            setRecentDms(testArr);
            localStorage.setItem('recentDms', JSON.stringify(testArr));
        }
    }


    return (
        <div className="home-container">
            <section>
                <div className="homeSidebar-container">
                    <div className="homeSidebar-header">
                        <h2>{currentUser.uid}</h2>
                    </div>

                    <div className="channelSidebar-container">
                        <div className="channelSidebar-header">
                            <h2>Channels</h2>
                        </div>
                        <div className="home-list-container">
                            {
                                recentChannels.map(channelData => {
                                    return (<>
                                        <ChannelCard deleteFromStorage={deleteFromStorage} selectCard={selectCard} channelData={channelData}/>
                                    </>)
                                })
                            }
                        </div>
                    </div>

                    <div className="dmSidebar-container">
                        <div className="dmSidebar-header">
                            <h2>Direct messages</h2>
                        </div>
                        <div className="home-list-container">
                            {
                                recentDms.map(user => {
                                    return(<>
                                        <DMSideLi deleteFromStorage={deleteFromStorage} showDms={showDms} userData={user}/>
                                    </>)
                                })
                            } 
                        </div>
                    </div>
                </div>
            </section>
            <section className="blank-page">
                {/* <Channels />
                <DirectMessage/> */}
                {showChannels? <Channels channelData={channelData} channelTargetId = {channelTargetId} renderChannelDms = {renderChannelDms} />:
                    <DirectMessage userInfo={userData} userTargetId={userTargetId} renderUserDms={renderUserDms} />}
            </section>
        </div>
    )
}

const ChannelCard = ({deleteFromStorage ,selectCard, channelData}) => {
    const handleClick = () => {
        selectCard(channelData);
    }

    const deleteOne = () => {
        deleteFromStorage(channelData.id, true);
    }

    return (
        <ul>
            <li onClick={handleClick} className="channel-item">
                <div className="channel-list">
                    <div className="list">
                        <Hash className="icons"/>
                        <h5>{channelData.name}</h5>
                    </div>
                    <span onClick={deleteOne} className="close">
                        &times;
                    </span>
                </div>
            </li>
        </ul>
    )
}

const DMSideLi = ({deleteFromStorage ,showDms, userData}) => {
    const handleClick = () => {
        showDms(userData)
    }

    const deleteOne = () => {
        deleteFromStorage(userData.id, false);
    }

    return (
        <ul>
            <li onClick={handleClick} className="dm-item">
                <div className="dms-list">
                    <div className="list">
                        <img className="pp" src="src/assets/images/profile.jpg" alt="pp"/>
                        <h5>{userData.email}</h5>
                    </div>
                    <span onClick={deleteOne} className="close">
                        &times;
                    </span>
                </div>
            </li>
        </ul>
    )
}


