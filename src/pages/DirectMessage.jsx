import { useState } from "react";
import { useEffect } from "react";
import { Paperclip, Camera, Mic, SendHorizontal, Smile, AtSign } from "lucide-react";
import {sendDms} from "../components/CommonUtils"
import { getHeadersFromLocalStorage } from "../components/CommonUtils";
import { extractHourAndMinutes } from "../components/CommonUtils";

export const DirectMessage = (props) => {
    const receiverId = props.userTargetId;
    const renderUserDms = props.renderUserDms;
    const userInfo = props.userInfo;

    const [ targetId, setTargetId ] = useState(receiverId);
    const [ user, setUser ] = useState(userInfo);

    const [message, setMessage] = useState("");
    const [dms, setDms] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUser = getHeadersFromLocalStorage();

    const fetchDms = async (targetId) => {
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
            const response = await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${targetId}&receiver_class=User`,get);
            const data = await response.json();

            setDms(data.data);
        } catch (error) {
            console.error(`Error fetching users:`, error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setTargetId(receiverId);
        setUser(userInfo);

        if (renderUserDms){
            const interval = setInterval(() => {
                fetchDms(receiverId);
              }, 1000);

            return () => clearInterval(interval);
        }
    }, [receiverId]);

    const handleSend = (e) =>{
        setMessage("");
        sendDms(message, targetId);
        fetchDms(targetId);
    }

    const handleChange = (e) =>{
        setMessage(e.target.value);
    } 

    if(loading) {
        return  (
            <section className="blank-page"></section>
        );
    }
    else {
        return (
            <section>
                <div className="chat-container">
                    <div className="chat-header">
                        <div className="chat-profile">
                            <img className="pp" src="src/assets/images/profile.jpg" alt="pp"/>
                            <h2>{user.email}</h2>
                        </div>
                    </div>

                    <div className="chat-box">
                        {dms.map(dm => {
                            return (<>
                                <Message response = {dm}/>
                            </>)}
                        )}
                    </div>
        
                    <div className="chat-footer">
                        <textarea value={message} placeholder="Say something..." onChange={handleChange}></textarea>
                        <div className="shortcut-icons">
                            <div className="attachment-icons">
                                <Paperclip className="icons"/>
                                <Smile className="icons"/>
                                <AtSign className="icons"/>
                                <span>|</span>
                                <Camera className="icons"/>
                                <Mic className="icons"/>
                            </div>
        
                            <div className="send-icon">
                                <SendHorizontal onClick={handleSend} className="icons"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const Message = (props) => {
    const response = props.response;

    return (   
        <ul>
            <li className="chat-list">
                <div className="sender">
                    <img className="pp" src="src/assets/images/profile.jpg" alt="pp"/>
                    <div className="chat-message">
                        <h2 className="name">
                            {response.sender.email} 
                            <span className="date-time">{extractHourAndMinutes(response.created_at)}</span>
                        </h2>
                        <span className="message">{response.body}</span>
                    </div>
                </div>
            </li>
        </ul>
    )
}