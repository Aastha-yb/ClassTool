import { set } from "mongoose";

export const getUser = () =>{
    const userStr = sessionStorage.getItem("user");
    if(userStr) return JSON.parse(userStr);
    else  return null;
}

export const getToken = () =>{
    return sessionStorage.getItem("token") || null;
}

export const setUserSession = (token,user) =>{
    sessionStorage.setItem("token", token)
    sessionStorage.setItem("user", JSON.stringify(user))
}

export const removeUserSession = () =>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
}

export const getGroup = () =>{
    const grp = sessionStorage.getItem("group");
    if(grp) return JSON.parse(grp);
    else  return null;
};

export const setGroup = (group) =>{
    sessionStorage.setItem("group", JSON.stringify(group));
};

export const getAssignments = () =>{
    const ques = sessionStorage.getItem("assignment");
    if(ques) return JSON.parse(ques);
    else  return null;
};

export const setAssignments= (ques) =>{
    sessionStorage.setItem("assignment", JSON.stringify(ques));
};

export const getSubmission= () =>{
    const ques = sessionStorage.getItem("submission");
    if(ques) return JSON.parse(ques);
    else  return null;
};

export const setSubmission= (sub) =>{
    sessionStorage.setItem("submission", JSON.stringify(sub));
};

export const formDate = (dates) =>{
    const d = new Date(dates);
    return d.toDateString();
}