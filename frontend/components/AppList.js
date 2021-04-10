import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listApp } from '@slices/list-app'

class AppList extends Component {

    componentDidMount() {
        const { axiosApp } = this.props
        axiosApp()
    }

    render() {

        const { appList, isLoading } = this.props

        return (
            <div>
                {
                    !isLoading 
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
        isSuccessful: state.listApp.isSuccessful,
        isLoading: state.listApp.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        axiosApp: () => dispatch(listApp())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppList);
