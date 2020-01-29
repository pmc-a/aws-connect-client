import { ConnectParticipant, Credentials } from 'aws-sdk';

import { CreateParticipantConnectionResponse } from 'aws-sdk/clients/connectparticipant';
import { StartChatContactResponse } from 'aws-sdk/clients/connect';

export interface ConnectionDetails {
    Websocket: {
        Url: string;
        ConnectionExpiry: string;
    };
    ConnectionCredentials: {
        ConnectionToken: string;
        Expiry: string;
    };
}

export interface MessageResponse {
    Id: string;
    AbsoluteTime: string;
}

/**
 * Creates the new chat client object
 * @param region Region the Connect service is running in
 * @param endpoint The endpoint URI to send requests to
 */
const createParticipantChatClient = (region: string, endpoint: string): ConnectParticipant => {
    const credentials = new Credentials('mock-access-key', 'mock-secret-key');
    const config = {
        region,
        endpoint,
        credentials,
    };
    return new ConnectParticipant(config);
};

/**
 * Creates a new connection with AWS ConnectParticipant to retrieve the necessary tokens required for communication
 * @param chatClient ConnectParticipant chat client instance
 * @param chatDetails ChatDetails object containing the connection token and indentifier
 */
const createParticipantConnection = (
    chatClient: ConnectParticipant,
    chatDetails: StartChatContactResponse,
): Promise<CreateParticipantConnectionResponse> => {
    const params = {
        ParticipantToken: chatDetails.ParticipantToken || '',
        Type: ['CONNECTION_CREDENTIALS'],
    };

    const request = chatClient.createParticipantConnection(params);
    return request.promise();
};

/**
 * Send a message using the chat client instance
 * @param chatClient ConnectParticipant chat client instance
 * @param connectionToken Token used to communicate with Connect - created by establishing a connection
 * @param content Content of the message to be sent
 * @param contentType Content Type of the message to be sent (usually plain/text)
 */
const sendMessage = (
    chatClient: ConnectParticipant,
    connectionToken: string,
    content: string,
    contentType: string,
): MessageResponse | null => {
    let messageResponse = null;
    const params = {
        ConnectionToken: connectionToken,
        Content: content,
        ContentType: contentType,
    };

    chatClient.sendMessage(params, (err, data) => {
        if (err) throw new Error(err.stack);

        messageResponse = data;
    });

    return messageResponse;
};

export { createParticipantChatClient, createParticipantConnection, sendMessage };
