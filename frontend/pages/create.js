import doCreateApp from '@actions/doCreateApp';

export default function create() {
    return (
        <div>
            <form onSubmit={doCreateApp}>
                <input id='name' type='text' />
                <input id='description' type='textarea' />
                <input id='app' type='file' accept='.zip' />
                <button>Create</button>
            </form>            
        </div>
    )
}
