import { Connect } from 'aws-sdk';

interface ChatDetails {
    ContactId: string;
    ParticipantId: string;
    ParticipantToken: string;
}

const initializeConnect = (): Connect => {
    // TODO: Most likely need to pass some form of AWS credentials, region etc. into the constructor here
    return new Connect();
};

const fetchChatDetails = (): ChatDetails => {
    // TODO: Utilise Connect instance to invoke .startChatConnect() in order to fetch ChatDetails
    const connectInstance = initializeConnect();

    // const params = {
    //     ContactFlowId: 'STRING_VALUE' /* required */,
    //     InstanceId: 'STRING_VALUE' /* required */,
    //     ParticipantDetails: {
    //         /* required */
    //         DisplayName: 'STRING_VALUE' /* required */,
    //     },
    //     InitialMessage: {
    //         Content: 'STRING_VALUE' /* required */,
    //         ContentType: 'STRING_VALUE' /* required */,
    //     },
    // };
    return {
        ContactId: 'mock-contact-id',
        ParticipantId: 'mock-participant-id',
        ParticipantToken: 'mock-participant-token',
    };
};

export { fetchChatDetails };
