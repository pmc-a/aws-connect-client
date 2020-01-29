import { fetchChatDetails, InitialMessage, ParticipantDetails } from './services/connect';

const initialize = (): string => {
    const mockParticipantDetails: ParticipantDetails = {
        DisplayName: 'Pedro',
    };
    const mockInitialMessage: InitialMessage = {
        Content: 'mock-content',
        ContentType: 'plain/text',
    };

    const chatDetails = fetchChatDetails(
        'mock-contact-flow-id',
        'mock-instanceId',
        mockParticipantDetails,
        mockInitialMessage,
    );

    return 'Successfully hitting the function within the library!';
};

export { initialize };
