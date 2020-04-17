// class AWSChatClient {
//     constructor(args) {
//         const creds = new AWS.Credentials('', '');
//         const config = new AWS.Config({
//             region: args.region,
//             endpoint: args.endpoint,
//             credentials: creds,
//         });
//         this.chatClient = new AWS.ConnectParticipant(config);
//         this.invokeUrl = args.endpoint;
//         this.logger = LogManager.getLogger({ prefix: 'ChatClient' });
//     }

//     createParticipantConnection(participantToken, type) {
//         const self = this;
//         const params = {
//             Type: type,
//             ParticipantToken: participantToken,
//         };
//         const createParticipantConnectionRequest = self.chatClient.createParticipantConnection(params);
//         return self
//             ._sendRequest(createParticipantConnectionRequest)
//             .then(res => {
//                 self.logger.info('successfully create connection request');
//                 return res;
//             })
//             .catch(err => {
//                 self.logger.error('error when creating connection request');
//                 return Promise.reject(err);
//             });
//     }

//     disconnectParticipant(connectionToken) {
//         const self = this;
//         const params = {
//             ConnectionToken: connectionToken,
//         };

//         const disconnectParticipantRequest = self.chatClient.disconnectParticipant(params);
//         return self
//             ._sendRequest(disconnectParticipantRequest)
//             .then(res => {
//                 self.logger.info('successfully disconnect participant');
//                 return res;
//             })
//             .catch(err => {
//                 self.logger.error('error when disconnecting participant');
//                 return Promise.reject(err);
//             });
//     }

//     getTranscript(connectionToken, args) {
//         const self = this;
//         const params = {
//             MaxResults: args.maxResults,
//             NextToken: args.nextToken,
//             ScanDirection: args.scanDirection,
//             SortOrder: args.sortOrder,
//             StartPosition: {
//                 Id: args.startPosition.id,
//                 AbsoluteTime: args.startPosition.absoluteTime,
//                 MostRecent: args.startPosition.mostRecent,
//             },
//             ConnectionToken: connectionToken,
//         };
//         if (args.contactId) {
//             params.ContactId = args.contactId;
//         }
//         const getTranscriptRequest = self.chatClient.getTranscript(params);
//         return self
//             ._sendRequest(getTranscriptRequest)
//             .then(res => {
//                 self.logger.info('successfully get transcript');
//                 return res;
//             })
//             .catch(err => {
//                 self.logger.error('error when getting transcript');
//                 return Promise.reject(err);
//             });
//     }

//     sendMessage(connectionToken, content, contentType) {
//         const self = this;
//         const params = {
//             Content: content,
//             ContentType: contentType,
//             ConnectionToken: connectionToken,
//         };
//         const sendMessageRequest = self.chatClient.sendMessage(params);
//         return self
//             ._sendRequest(sendMessageRequest)
//             .then(res => {
//                 self.logger.info('successfully send message');
//                 return res;
//             })
//             .catch(err => {
//                 self.logger.error('error when sending message');
//                 return Promise.reject(err);
//             });
//     }

//     sendEvent(connectionToken, contentType, content) {
//         const self = this;
//         const params = {
//             ConnectionToken: connectionToken,
//             ContentType: contentType,
//             Content: content,
//         };
//         const sendEventRequest = self.chatClient.sendEvent(params);
//         return self
//             ._sendRequest(sendEventRequest)
//             .then(res => {
//                 self.logger.info('successfully send event');
//                 return res;
//             })
//             .catch(err => {
//                 self.logger.error('error when sending event');
//                 return Promise.reject(err);
//             });
//     }

//     _sendRequest(request) {
//         return new Promise((resolve, reject) => {
//             request
//                 .on('success', function(res) {
//                     resolve(res);
//                 })
//                 .on('error', function(err) {
//                     const errObj = {
//                         type: err.code,
//                         message: err.message,
//                         stack: err.stack ? err.stack.split('\n') : [],
//                     };
//                     reject(errObj);
//                 })
//                 .send();
//         });
//     }
// }
