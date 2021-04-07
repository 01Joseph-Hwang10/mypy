import { createApp } from '@slices/craete-app';
import createAppDataForm from '@form/createAppDataForm';
import { connect } from 'react-redux';

function create({ 
    createApp
 }) {

    const createAppSubmit = (e) => {
        e.preventDefault();
        const postData = createAppDataForm(e)
        createApp(postData);
    }

    return (
        <div>
            <form onSubmit={createAppSubmit}>
                <input id='name' placeholder='name' type='text' required />
                <input id='description' placeholder='description' type='textarea' />
                <input id='app' type='file' accept='.zip' required />
                <button>Create</button>
            </form>
        </div>
    )
}

export default connect(null,{ createApp })(create);