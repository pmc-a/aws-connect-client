import { ConnectParticipant, Credentials } from 'aws-sdk';

import { CreateParticipantConnectionResponse, SendMessageResponse } from 'aws-sdk/clients/connectparticipant';
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

class ConnectParticipantController {
    chatClient: ConnectParticipant;
    connectionToken: string;

    constructor(chatClient: ConnectParticipant, connectionToken: string) {
        this.chatClient = chatClient;
        this.connectionToken = connectionToken;
    }

    /**
     * Send a message using the chat client instance
     * @param content Content of the message to be sent
     * @param contentType Content Type of the message to be sent (usually plain/text)
     */
    sendMessage(content: string, contentType: string): Promise<SendMessageResponse> {
        const params = {
            ConnectionToken: this.connectionToken,
            Content: content,
            ContentType: contentType,
        };

        const request = this.chatClient.sendMessage(params);
        return request.promise();
    }
}

export { createParticipantChatClient, createParticipantConnection, ConnectParticipantController };
