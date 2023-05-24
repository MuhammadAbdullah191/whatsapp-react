import { createConsumer } from '@rails/actioncable';

const consumer = createConsumer('ws://localhost:3000/cable');

export default consumer;

// const channel = cable.subscriptions.create('ChatChannel', {
// 	connected: () => {
// 		console.log('Connected to Action Cable');
// 	},
// 	disconnected: () => {
// 		console.log('Disconnected from Action Cable');
// 	},
// 	received: (data) => {
// 		console.log('Received data from Action Cable:', data);
// 		// Handle the received data here
// 	},
// });

// channel.send({ message: 'Hello from React' });