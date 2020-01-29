import { ConnectParticipant } from 'aws-sdk';

import { fetchChatDetails, InitialMessage, ParticipantDetails } from './services/connect';
import { createParticipantChatClient, createParticipantConnection } from './services/connect-participant';

interface ConnectClient {
    client: ConnectParticipant;
    connectionDetails: ConnectParticipant.CreateParticipantConnectionResponse;
}

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

export { initialize };
