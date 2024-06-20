export const getHeadersFromLocalStorage = () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return currentUser;
}

export const extractHourAndMinutes = (dateString) => {
    const dateObj = new Date(dateString);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    // const day = dateObj.getDay();
    // const month = dateObj.getMonth();

    // Format the hours and minutes with leading zeros if needed
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${day}/${month} ${formattedHours}:${formattedMinutes}`;
}

const currentUser = getHeadersFromLocalStorage();

//onclick to ilalagay
export const getUserDmsSender = () => {
    const get = {
        method: 'GET', 
        mode: 'cors',
        headers: {
            'access-token' : currentUser.accessToken,  
            'client' : currentUser.client, 
            'expiry' : currentUser.expiry, 
            'uid' : currentUser.uid
        }
    }

    //target id yung ibang tao
    const url = `http://206.189.91.54/api/v1/messages?receiver_id=${4561}&receiver_class=User`;
    
    fetch(url, get)
    .then(response => {
        response.json().then(json => {
            console.log(json);
        })
    });
}

export const sendDms = (message, receiverId) => {
    const payload = {
        receiver_id: receiverId,
        receiver_class: "User",
        body: message
    }

    const post  = {
        method: 'POST', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'access-token' : currentUser.accessToken,  
            'client' : currentUser.client, 
            'expiry' : currentUser.expiry, 
            'uid' : currentUser.uid
        },
        body: JSON.stringify(payload)
    }

    const url = `http://206.189.91.54/api/v1/messages`;
    
    fetch(url, post)
    .then(res=>res.json())
    .then(data=> console.log(data))
    .catch(err=> console.log(err))
}

export const sendDmsToChannel = (message, receiverId) => {
    const payload = {
        receiver_id: receiverId,
        receiver_class: "User",
        body: message
    }

    const post  = {
        method: 'POST', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'access-token' : currentUser.accessToken,  
            'client' : currentUser.client, 
            'expiry' : currentUser.expiry, 
            'uid' : currentUser.uid
        },
        body: JSON.stringify(payload)
    }

    const url = `http://206.189.91.54/api/v1/messages`;
    
    fetch(url, post)
    .then(res=>res.json())
    .then(data=> console.log(data))
    .catch(err=> console.log(err))
}



