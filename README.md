# Amazon Connect Client

This is an attempt at simplifying the interface between the Amazon Connect & Amazon ConnectParticipant services so that consumer applications can be fairly straightforward.

## Problem

-   Amazon Connect requires different authentication tokens to be passed around in order to actually communicate with the service. To grab these authentication credentials, it requires interacting with two AWS services: Amazon Connect & Amazon ConnectParticipant.
-   Amazon have a client they have developed themselves (ChatJS) which seemingly doesn't handle the initial call required to be made with Amazon Connect in order to fetch the `ParticipantToken`.
-   ChatJS also has an extremely large bundle size (~1.7MB).

## How to use

Initial setup of controller:

```ts
import { initialize, createController, ConnectParticipantController } from 'aws-connect-client';

const controller = async (): ConnectParticipantController => {
    const { client, connectionDetails } = await initialize();

    return createController(client, connectionDetails);
};
```

Usage (some form of callback for sending a message):

```ts
const handleSendMessage = async (): string => {
    try {
        const controller = controller(); // Store this in state to avoid re-creating the controller instance

        const response = await controller.sendMessage('Hello world!', 'text/plain');
        return response.AbsoluteTime;
    } catch (error) {
        console.error(error.message);
    }
};
```
