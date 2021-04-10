import { createApp } from '@slices/craete-app';
import createAppDataForm from '@form/createAppDataForm';
import { connect } from 'react-redux';

function create({ 
    loading: Loading,
    setIsSuccessful: SetIsSuccessful
 }) {

    const createAppSubmit = async (e) => {
        e.preventDefault();
        Loading();
        const postData = createAppDataForm(e);
        const status = await createApp(postData);
        if (status) {
            SetIsSuccessful(true);
        } else {
            SetIsSuccessful(false);
        }
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

const mapDispatchToProps = (dispatch) => {
    return {
        loading: () => dispatch(loading()),
        setIsSuccessful: (bool) => dispatch(setIsSuccessful(bool)),
    }
}

export default connect(null,mapDispatchToProps)(create);