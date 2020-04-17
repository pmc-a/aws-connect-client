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
    const credentials = new Credentials('', '');
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

export { createParticipantChatClient, createParticipantConnection };
