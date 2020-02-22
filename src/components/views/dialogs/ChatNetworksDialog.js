/*
Copyright 2020 Dmitry Tyvaniuk <dm0141e@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { _t } from "../../../languageHandler";
import * as sdk from "../../../index";
import { MatrixClientPeg } from "../../../MatrixClientPeg";

export default class UserSettingsDialog extends React.Component {
    static propTypes = {
        onFinished: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        const client = MatrixClientPeg.get();
        // userId is string like as '@username:matrix.org'
        const userId = client.getUserId();
        const username = userId.split(':')[0].slice(1);

        this.state = {
            iframeUrl: `https://${username}.nova.chat/manager/`,
        };

        this.matixClient = client;
        this.iframeRef = React.createRef();
    }

    handleIframeLoad = async () => {
        const { iframeUrl } = this.state;
        const token = await this.matixClient.getOpenIdToken();

        this.iframeRef.current.contentWindow.postMessage({
            type: 'login',
            token,
        }, iframeUrl);
    };

    render() {
        const BaseDialog = sdk.getComponent('views.dialogs.BaseDialog');

        return (
            <BaseDialog
                className='mx_UserSettingsDialog'
                hasCancel={true}
                onFinished={this.props.onFinished}
                title={_t("Set Up Chat Networks")}
            >
                <div className='ms_SettingsDialog_content' style={{ display: 'flex' }}>
                    <iframe
                        ref={this.iframeRef}
                        onLoad={this.handleIframeLoad}
                        src={this.state.iframeUrl}
                        style={{ width: '408px', minHeight: '400px', border: 'none', margin: '0 auto' }}
                    />
                </div>
            </BaseDialog>
        );
    }
}
