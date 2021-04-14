import { loading as executeLoading, setIsSuccessful as executeSuccessful } from '@redux/slices/execute-app';
import { loading as retrieveLoading, loadAppSuccessful, loadAppError } from '@redux/slices/retrieve-app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { executeApp } from '@slices/execute-app';
import { retrieveApp } from '@slices/retrieve-app';

function AppDetail({
    executeLoading: ExecuteLoading,
    executeSuccessful: ExecuteSuccessful,
    result: Result,
    inputs: Inputs,
    appSpec : AppSpec,
    retrieveLoading : RetrieveLoading,
    loadAppError : LoadAppError,
    loadAppSuccessful: LoadAppSuccessful,
    retrieveIsLoading: RetrieveIsLoading,
}) {
    
    const {
        query: {
            id
        }
    } = useRouter();

    const axiosApp = async () => {
        RetrieveLoading();
        const { ok, data } = await retrieveApp(id);
        if (ok) {
            LoadAppSuccessful(data)
        } else {
            LoadAppError(data)
        }
    }

    useEffect(()=>{
        axiosApp();
    },[])

    
    const execute = async () => {
        ExecuteLoading();
        const postData = { app }
        const { ok, data } = await executeApp(postData);
        ExecuteSuccessful({ ok, data })
    }


    return (
        <>
            {
                RetrieveIsLoading ? (
                    <div>Loading...</div>
                ) : (
                <div>
                    <h2>{AppSpec.name}</h2>
                    <h3>{AppSpec.description}</h3>
                    <h3>Exports: {AppSpec.exports}</h3>
                    <h4>Created by: {AppSpec.created}</h4>
                    {
                        Inputs.map(input => {
                            console.log(input)
                        })
                    }
                    <button onClick={execute}>Run</button>
                    <section>
                        {Result}
                    </section>
                </div>
                )
            }
        </>
    )
}


const mapStateToProps = state => {
    return {
        result: state.executeApp.result,
        inputs: state.retrieveApp.inputs,
        appSpec: state.retrieveApp.appSpec,
        retrieveIsLoading: state.retrieveApp.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        executeLoading: () => dispatch(executeLoading()),
        executeSuccessful: (response) => dispatch(executeSuccessful(response)),
        retrieveLoading: () => dispatch(retrieveLoading()),
        loadAppSuccessful: (response) => dispatch(loadAppSuccessful(response)),
        loadAppError: (response) => dispatch(loadAppError( response ))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppDetail);
