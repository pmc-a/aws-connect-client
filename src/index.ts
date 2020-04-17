import { ConnectParticipant } from 'aws-sdk';
import Axios from 'axios';

import { fetchChatDetails, InitialMessage, InitUserDetails } from './services/connect';
import {
    createParticipantChatClient,
    createParticipantConnection,
    ConnectParticipantController,
} from './services/connect-participant';

interface ConnectClient {
    client: ConnectParticipant;
    connectionDetails: ConnectParticipant.CreateParticipantConnectionResponse;
}
interface StartChatResult {
    ContactId: string;
    ParticipantId: string;
    ParticipantToken: string;
}

interface Response {
    data: {
        username: string;
        instanceId: string;
        previousContactId: string;
        startChatResult: StartChatResult;
    };
}

const initialize = async (
    apiGatewayUrl: string,
    initUserDetails: InitUserDetails,
): Promise<StartChatResult | string> => {
    console.log('Initialising the client...');

    try {
        const { Username, Attributes, ParticipantDetails } = initUserDetails;

        // Make POST request to API Gateway Endpoint to interact with the Connect service (fetching credentials)
        const participantCredentials: Response = await Axios.post(
            apiGatewayUrl,
            {
                Username,
                Attributes,
                ParticipantDetails,
            },
            { headers: { 'Content-Type': 'application/json' } },
        );

        // We now want to replicate the connect.ChatSession.create() functionality here

        // ----------------- //

        // TODO: Take these details and pump them into creating the ctrl/session
        // Return the ctrl/session with various methods:
        // - connect
        // - sendMessage

        console.log(participantCredentials.data);
        return participantCredentials.data.startChatResult;
    } catch (error) {
        console.error(error);
        return 'Someting went wrong fetching the credentials';
    }

    // const participantDetails: ParticipantDetails = {
    //     DisplayName: displayName,
    // };
    // const initialMessage: InitialMessage = {
    //     Content: initialMessageContent,
    //     ContentType: 'text/plain',
    // };

    // try {
    //     // Chat details containing ParticipantToken
    //     const chatDetails = await fetchChatDetails(
    //         'mock-contact-flow-id',
    //         'mock-instanceId',
    //         participantDetails,
    //         initialMessage,
    //     );

    //     // Connection detials containing connection token required with each message
    //     const connectionDetails = await createParticipantConnection(participantChatClient, chatDetails);

    //     return {
    //         client: participantChatClient,
    //         connectionDetails,
    //     };
    // } catch (err) {
    //     return err.message;
    // }
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
