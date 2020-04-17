import { createChatController } from '../controllers/chat-controller';

import { ChatDetails } from '../services/connect';
import { createParticipantChatClient } from '../services/connect-participant';

const createChatSession: Function = (chatDetails: ChatDetails, websocketManager: any) => {
    console.log('Creating the chat controller...');

    const region = 'us-east-1';
    const endpoint = 'https://participant.connect.us-east-1.amazonaws.com';

    const chatClient = createParticipantChatClient(region, endpoint);
    const connectionToken = chatClient;

    const args = {
        sessionType: 'CUSTOMER',
        chatDetails,
        websocketManager,
    };
    // return new ChatController(args);

    // const chatController = createChatController(chatDetails, options, websocketManager);
    // return new CustomerChatSession(chatController);
};

export { createChatSession };
