import { ConnectParticipant } from 'aws-sdk';

import { fetchChatDetails, InitialMessage, ParticipantDetails } from './services/connect';
import {
    createParticipantChatClient,
    createParticipantConnection,
    ConnectParticipantController,
} from './services/connect-participant';

interface ConnectClient {
    client: ConnectParticipant;
    connectionDetails: ConnectParticipant.CreateParticipantConnectionResponse;
}

// TODO: Actually pass variables in here to control various details
// I.E: DisplayName, InitialMessage, Region and Endpoint
const initialize = async (): Promise<ConnectClient> => {
    const mockParticipantDetails: ParticipantDetails = {
        DisplayName: 'Pedro',
    };
    const mockInitialMessage: InitialMessage = {
        Content: 'mock-content',
        ContentType: 'plain/text',
    };

    try {
        // Chat details containing ParticipantToken
        const chatDetails = await fetchChatDetails(
            'mock-contact-flow-id',
            'mock-instanceId',
            mockParticipantDetails,
            mockInitialMessage,
        );

        // Client used to actually send messages etc.
        const participantChatClient = createParticipantChatClient('us-east-1', 'https://mock-endpoint.com');

        // Connection detials containing connection token required with each message
        const connectionDetails = await createParticipantConnection(participantChatClient, chatDetails);

        return {
            client: participantChatClient,
            connectionDetails,
        };
    } catch (err) {
        return err.message;
    }
};

/**
 * Creates an instance of the controller in order to interact with the Amazon Connect service
 * @param participantChatClient Amazon ConnectParticipant client instance
 * @param connectionDetails Connection details, including the connection token required to authorise messages being sent
 */
const createController = (
    participantChatClient: ConnectParticipant,
    connectionDetails: ConnectParticipant.CreateParticipantConnectionResponse,
): ConnectParticipantController | null => {
    if (connectionDetails.ConnectionCredentials?.ConnectionToken) {
        return new ConnectParticipantController(
            participantChatClient,
            connectionDetails.ConnectionCredentials.ConnectionToken,
        );
    }

    return null;
};

export { createController, initialize };
