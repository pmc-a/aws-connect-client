import { Connect } from 'aws-sdk';

export interface ParticipantDetails {
    DisplayName: string;
}

export interface InitialMessage {
    Content: string;
    ContentType: string;
}

interface ChatDetails {
    ContactId: string;
    ParticipantId: string;
    ParticipantToken: string;
}

const initializeConnect = (): Connect => {
    // TODO: Most likely need to pass some form of AWS credentials, region etc. into the constructor here
    return new Connect();
};

/**
 * Establish a connection, fetch the details required to send messages
 * @param contactFlowId The identifier of the contact flow for the chat
 * @param instanceId The identifier of the Amazon Connect instance
 * @param participantDetails Information identifying the participant
 * @param initialMessage The initial message to be sent to the newly created chat
 */
const fetchChatDetails = (
    contactFlowId: string,
    instanceId: string,
    participantDetails: ParticipantDetails,
    initialMessage: InitialMessage,
): ChatDetails | null => {
    let chatDetails = null;
    const connectInstance = initializeConnect();

    const params = {
        ContactFlowId: contactFlowId,
        InstanceId: instanceId,
        ParticipantDetails: participantDetails,
        InitialMessage: initialMessage,
    };

    connectInstance.startChatContact(params, (err, data) => {
        if (err) throw new Error(err.stack);

        chatDetails = data;
    });

    return chatDetails;
};

export { fetchChatDetails };
