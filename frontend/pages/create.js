import { createApp } from '@slices/craete-app';
import doCreateApp from '@actions/doCreateApp';
import { connect } from 'react-redux';

function create({ 
    createApp
 }) {
     console.log(createApp)
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                doCreateApp(createApp);
            }}>
                <input id='name' placeholder='name' type='text' required />
                <input id='description' placeholder='description' type='textarea' />
                <input id='app' type='file' accept='.zip' required />
                <button>Create</button>
            </form>            
        </div>
    )
}

export default connect(null,{ createApp })(create);