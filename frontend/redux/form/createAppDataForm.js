
const createAppDataForm = (e) => {
    const form = e.target
    const appName = form.querySelector('#name').value;
    const description = form.querySelector('#description').value || '';
    console.log(description)
    const app = form.querySelector('#app').files[0];
    console.log(app)
    const userId = 1 // temporarily set
    const postData = {
        user_id: userId,
        name: appName,
        app,
        description,
    }
    return postData
}


export default createAppDataForm;
