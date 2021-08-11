import React, {Component} from 'react';

import Aux from './ReactAux';
import Modal from '../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return (
        class extends Component{
            state = {
                error: null
            }

            componentWillMount(){
                this.reqInterceptor = axios.interceptors.request.use(requestConfig => {
                    this.setState({error: null});
                    return requestConfig;
                }, error => {
                    this.setState({error: error});
                });

                this.resInterceptor = axios.interceptors.response.use(responseConfig => {
                    return responseConfig;
                }, error => {
                    this.setState({error: error});
                    return Promise.reject(error);
                });
            }

            componentWillUnmount(){
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
            }

            disableModal = () => {
                this.setState({error: null});
            }

            render(){
                return (
                    <Aux>
                        <Modal show = {this.state.error} purchasBackDropHandler = {this.disableModal}>
                            {this.state.error ?  this.state.error.message : null}
                        </Modal>
                        <WrappedComponent {...this.props}></WrappedComponent>
                    </Aux>
                );
            }
        }
    );
};

export default withErrorHandler;