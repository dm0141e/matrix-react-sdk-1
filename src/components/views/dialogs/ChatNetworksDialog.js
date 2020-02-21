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
import { User } from "matrix-js-sdk";
import { MatrixClientPeg } from "../../../MatrixClientPeg";

export default class UserSettingsDialog extends React.Component {
    static propTypes = {
        onFinished: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        const client = MatrixClientPeg.get();

        // userId is string like as '@username:matrix.org'
        const userId = client.getUserId();
        const username = userId.split(':')[0].slice(1);

        this.state = {
            username,
        };
        this.onPostMessage = this.onPostMessage.bind(this);
    }

    componentDidMount() {
        window.addEventListener('message', this.onPostMessage);
        console.log(this.username);
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.onPostMessage, false);
    }

    onPostMessage(event) {
        // console.log(event);
    }

    render() {
        const { username } = this.state;
        const BaseDialog = sdk.getComponent('views.dialogs.BaseDialog');

        return (
            <BaseDialog
                className='mx_UserSettingsDialog'
                hasCancel={true}
                onFinished={this.props.onFinished}
                title={_t("Set Up Chat Networks")}
            >
                <div className='ms_SettingsDialog_content'>
                    <iframe
                        src={`https://${username}.nova.chat/manager/`}
                        style={{ width: '100%', minHeight: '600px', border: 'none' }}
                    />
                </div>
            </BaseDialog>
        );
    }
}
