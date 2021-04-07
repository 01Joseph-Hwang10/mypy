import { createApp } from "@redux/slices/craete-app";


const doCreateApp = (e) => {
    e.preventDefault();
    const appName = document.getElementById('name');
    const description = document.getElementById('description');
    const app = document.getElementById('app');
    const userId = 1 // temporarily set
    const postData = {
        user_id: userId,
        name: appName,
        app,
        description,
        
    }
    createApp(postData);
}

export default doCreateApp;