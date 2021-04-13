import { loading, setIsSuccessful } from '@redux/slices/execute-app';
import { useRouter } from 'next/router';
import React from 'react'
import { connect } from 'react-redux';
import { executeApp } from '@slices/execute-app'
import Head from 'next/head'

function AppDetail({
    appList: AppList,
    loading: Loading,
    setIsSuccessful: SetIsSuccessful,
    result: Result
}) {
    
    const {
        query: {
            id
        }
    } = useRouter();

    const {
        app,
        created,
        description,
        exports,
        name,
        static: staticfiles
    } = AppList.filter(app => app.id == id)[0]

    
    const execute = async () => {
        Loading();
        const postData = { app }
        const { ok, data } = await executeApp(postData);
        SetIsSuccessful({ ok, data })
    }


    return (
        <>
        <div>
            <h2>{name}</h2>
            <h3>{description}</h3>
            <h3>Exports: {exports}</h3>
            <h4>Created by: {created}</h4>
            <button onClick={execute}>Run</button>
            <section>
                {Result}
            </section>
        </div>
        </>
    )
}


const mapStateToProps = state => {
    return {
        appList: state.listApp.appList,
        result: state.executeApp.result
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loading: () => dispatch(loading()),
        setIsSuccessful: (response) => dispatch(setIsSuccessful(response)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppDetail);
