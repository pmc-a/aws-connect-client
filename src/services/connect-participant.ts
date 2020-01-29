import { ConnectParticipant, Credentials } from 'aws-sdk';

const createConnectParticipantClient = (region: string, endpoint: string): ConnectParticipant => {
    const credentials = new Credentials('mock-access-key', 'mock-secret-key');
    const config = {
        region,
        endpoint,
        credentials,
    };
    return new ConnectParticipant(config);
};

export { createConnectParticipantClient };
