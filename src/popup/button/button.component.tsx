import React, { useState } from 'react';
import {
    sendChromeMessage,
    sendMessageToContentScript,
    sendMessageToContentScriptWithResponse,
} from '../utils/chrome.message';

interface List {
    title: string;
}

function ButtonComponent(): JSX.Element {
    const [state, setState] = useState('');

    const [response, setResponse] = useState('');

    const [list, setList] = useState<List[]>([]);

    function sendMessage() {
        sendMessageToContentScript({ name: state });
    }

    async function sendMessageWithResponse() {
        const resp = await sendMessageToContentScriptWithResponse<unknown, string>({ name: state });
        setResponse(resp);
    }

    async function getDataFromBackgroundScript(): Promise<void> {
        const listResp = await sendChromeMessage<unknown, List[]>({ type: 'http' });
        setList(listResp);
    }

    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
}

export default ButtonComponent;
