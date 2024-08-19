
This is an express app for rive mailing system. Developed in Nodejs

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 18.17.0 or higher)
- npm (version 9.6.7 or higher) or yarn (version 1.22.19 or higher)

## Installation

1. Clone the repository:
    ```sh
    git clone git@github.com:er-mirzabilal/rive-mailer-node.git
    cd rive-mailer-node
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

    ```sh
    cp .env.example .env
    ```

## Configuration

The application can be configured using environment variables. Here are some key configurations:

- `PORT`: The port number on which the app will run (default is 3000)
- `NODE_ENV`: development or production
- `SMTP_USERNAME`: SMTP application username
- `SMTP_APP_PASSWORD`: SMTP application password
- `EMAIL_VERIFIER_KEY`: Email Verifier service key, using this service => https://hunter.io
- `FRONTEND_DEPLOYEMNT`: Frontend deployment url

Refer to `.env.example` for all available configuration options.

## Database Config

1. Create a DB first.

2. Create a `config.json` file in the config directory and provide username, password and database name according to your system config. Refer to `config.json.example` for the required variables.

    ```sh
    cd config
    cp config.json.example config.json
    ```

## Getting Started

1. Start the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

2. Open your browser and navigate to `http://localhost:5173`


## API Endpoints

Here are some of the main API endpoints:

- `POST /signup/` - Create user
- `DELETE /remove-record/:email` - Delete user
- `PUT /resend-email/` - Resend verification email

