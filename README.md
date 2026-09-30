#Onchain Guestbook

A simple onchain guestbook built on Stacks using Scaffold Stacks and Clarity.

Users can connect an Xverse wallet, write a short message, and publish it directly to the Stacks Testnet.

🚀 Live Demo

https://onchain-guestbook-snowy.vercel.app/

🔗 Project Links

- GitHub: https://github.com/Techguy0x/onchain-guestbook
- Live App: https://onchain-guestbook-snowy.vercel.app/
- X Thread: https://x.com/techguy0x/status/2104455564432457944
- Contract Deployment: https://explorer.hiro.so/txid/896d968e65670ea52efc36177c4a827d76e01d97ed7a09b8fdc872fc5670857b?chain=testnet
- Guestbook Transaction: https://explorer.hiro.so/txid/6da1f38e5664ebd6df1e557d6d5497b5bdb9695a2d9d095daabac0558e6c58f6?chain=testnet

✨ Features

- Connect an Xverse wallet
- Write a short guestbook message
- Publish messages onchain
- Store the message sender and message on the Stacks blockchain
- Read the message count from the contract
- Read individual guestbook messages
- Stacks Testnet support

🛠️ Built With

- Stacks
- Clarity
- Scaffold Stacks
- Next.js
- TypeScript
- Xverse
- Vercel

📜 Smart Contract

The guestbook uses a Clarity smart contract with three main functions:

"sign-guestbook"

Publishes a new message to the guestbook.

"get-message"

Retrieves a guestbook message by its ID.

"get-message-count"

Returns the total number of messages stored by the contract.

Each message stores:

- The message ID
- The sender's Stacks address
- The guestbook message

🧪 Testing

The smart contract includes tests covering:

- Signing the guestbook
- Storing and retrieving messages
- Tracking the message count

The contract was tested locally before deployment to Stacks Testnet.

💻 Local Development

Clone the repository:

git clone https://github.com/Techguy0x/onchain-guestbook.git
cd onchain-guestbook

Install dependencies:

npm install

Run the frontend:

cd frontend
npm install
npm run dev

The development server will be available at:

http://localhost:3000

🧾 Contract Development

The Clarity contract is located at:

contracts/contracts/counter.clar

The contract was adapted from the Scaffold Stacks starter counter contract into an onchain guestbook.

Contract tests are located at:

contracts/tests/counter.test.ts

🌐 Deployment

The contract is deployed to Stacks Testnet.

The frontend is deployed on Vercel and configured to interact with the Stacks Testnet contract.

🧑‍💻 Scaffold Stacks Challenge

This project was built as part of the Scaffold Stacks developer challenge.

What Worked

- Scaffold Stacks made the initial contract and frontend setup straightforward.
- The Clarity contract deployed successfully.
- Xverse connected successfully.
- A real contract interaction was completed on Stacks Testnet.
- The frontend was successfully deployed to Vercel.

What Didn't

I encountered a few setup and frontend issues during development:

- The default counter tests had to be adapted for the guestbook contract.
- A duplicate wallet connection button appeared in the frontend and had to be fixed.
- Network configuration needed to be changed from Devnet to Testnet before real contract interactions worked.

Time to Ship

Approximately 2 hours.

📄 License

This project was built for the Scaffold Stacks developer challenge.
