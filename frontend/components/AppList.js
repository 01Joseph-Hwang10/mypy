import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listApp } from '@slices/list-app'

class AppList extends Component {

    componentDidMount() {
        const { listApp } = this.props
        listApp()
    }

    render() {

        const { appList } = this.props
        const isLoaded = appList.length > 0

        return (
            <div>
                {
                    isLoaded 
                    ? 
                    <div>
                        {
                            appList.map(app => {
                                return (
                                    <AppList>
                                        {app.name}
                                    </AppList>
                                )
                            })
                        }
                    </div> 
                    : 
                    <div>Loading...</div>
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        appList: state.listApp.appList,
        isSuccessful: state.listApp.isSuccessful
    }
}

const mapDispatchToProps = {
    listApp,
}


export default connect(mapStateToProps, mapDispatchToProps)(AppList);
