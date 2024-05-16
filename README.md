# Chronicler (ALPHA)

This project is a web application for making personal diary entries. The diary entries can be added/deleted/edited (CRUD) on the website. Futhermore it utilizes AI(Claude by Antrophic) to give a Summary of the last week.

## Tech Stack

- Project Structure: Monolith/ MVC
- Programming Language: Typescript
- Frontend Library: React(w/ Type Script)
- Backend Framework: Node.js (w/ Typescript)
- Database: MongoDB
- Styling: CSS
- Build Tools: Vite

## Alpha Features

- BE
  -CREATE user
  -User Verification (COMMING SOON)
  -READ DIARIES ENTRY
  -REQUEST AI Summary
  -EDIT DIARIES
  -POST NEW ENTRY
  -DELETE ENTRY
  -
- FE
  - READ Entries
  - READ/REQUEST AI Summary
  - DELETE ENTRY
  - EDIT ENTRIES (COMMING SOON)
  - LOGOUT (COMMING OUT)
  - POST NEW ENTRY 
  - User Verification/Login (COMMING SOON)
  - Create Account (COMMING SOON)

## Installation

- Prerequisites:
  - Anthropic Account (https://console.anthropic.com/workbench/)
  - Create a MonogoDB database: (https://www.mongodb.com/ja-jp)
- Install dependencies
  - Server: `npm isntall`
  - Client: `npm install`
- Change `env.example` to `.env` and replace the placeholders

- Running Development:
  - Server: `npm run dev`
  - Client: `npm run dev`

## Documentation

The backend utilizes the MVC (Model-View-Controller) structure.

Middlewares used:

- express.json: parsing incoming requests and responses
- cors: managing cross-origin requests and responses

Model:

- each Model is conenction to the DB via the db.ts file
- User uniq "key" are their emails
- Directly connecting to MongoDB via env.CONNECTION_STRING

View:

- CRUD Endpoints for DIARY ENTRIES
- POST ENDPOINT for USER CREATION

Controller:

- Handling verification of requests via USER ID/EMAIL and ENTRY ID
- AI REPONSE/PROMPT can be adjusted via the @getSummariesController

Testing:

- The endpoints and funtioncality were manually tested via POSTMAN

Front-end:

- Web bundler Vite: Typescript + React
- The application structure is the following:

```
+------------------+
|      App.tsx     |
+------------------+
       |
       |
    +------------------+
    |   Content.tsx    |
    +------------------+
       |    
       |
    +------------------+
    |     Card.tsx     |
    +------------------+

```
- App.tsx component is the parent, and the Content.tsx and Card.tsx components are its children.

Styling:

- Standard CSS
- prestyled Buttons from : https://getcssscan.com/css-buttons-examples

Additional Information:

- The backend follows the Model-View-Controller (MVC) architectural pattern:
- Model: Handles the direct connection to the MongoDB database using the env.CONNECTION_STRING environment variable.
- View: Defines the CRUD (Create, Read, Update, Delete) endpoints for the diary entries.
- Controller: Responsible for handling user verification, request validation, and the AI summary generation process.
- Middleware functions used:
    - express.json: Parses incoming requests and responses in JSON format.
    - cors: Manages cross-origin requests and responses.
- The frontend is built using React.js and follows a standard React application structure.
- The project demonstrates the use of TypeScript, React, and the MVC architectural pattern, with integration of Anthropic's AI capabilities for generating summaries.

## Acknowledgments

Special thanks to everybody at Code Chrysalis and

- **[Manu] (https://github.com/lmanul)**
- **[Chad](https://github.com/chadgrover)**
- **[Michael] (https://github.com/vyridian17)**

### Contributors

- **[Dominik](https://github.com/dmnkvn)**

### Libraries and Packages

This project wouldn't be possible without the following open-source libraries and packages:

- **[@anthropic-ai-sdk](https://www.npmjs.com/package/@anthropic-ai/sdk)** - Anthropic's AI SDK for integrating AI capabilities into your application.
- **[cors](https://www.npmjs.com/package/cors)** - Middleware that can be used to enable CORS with various options.
- **[date-fns](https://www.npmjs.com/package/date-fns)** - Modern JavaScript date utility library.
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Loads environment variables from a .env file into process.env.
- **[express](https://www.npmjs.com/package/express)** - Fast, unopinionated, minimalist web framework for Node.js.
- **[mongodb](https://www.npmjs.com/package/mongodb)** - The official MongoDB driver for Node.js.

Dev Dependencies

- **[@types-cors](https://www.npmjs.com/package/@types/cors)** - TypeScript definitions for the cors package.
- **[@types-express](https://www.npmjs.com/package/@types/express)** - TypeScript definitions for the express package.
- **[@types-mongodb](https://www.npmjs.com/package/@types/mongodb)** - TypeScript definitions for the mongodb package.
- **[@types-node](https://www.npmjs.com/package/@types/node)** - TypeScript definitions for Node.js.
- **[nodemon](https://www.npmjs.com/package/nodemon)** - A utility that automatically restarts the node application when file changes in the directory are detected.
- **[ts-node](https://www.npmjs.com/package/ts-node)** - Typescript execution environment and REPL for node.js, with source map support.
- **[typescript](https://www.npmjs.com/package/typescript)** - TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
- **[@types-react](https://www.npmjs.com/package/@types/react)** - TypeScript definitions for React.
- **[@types-react-dom](https://www.npmjs.com/package/@types/react-dom)** - TypeScript definitions for React DOM.
- **[@typescript-eslint-eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)** - ESLint plugin for TypeScript.
- **[@typescript-eslint-parser](https://www.npmjs.com/package/@typescript-eslint/parser)** - Eslint parser which leverages TypeScript ESTree to allow for ESLint to lint TypeScript code.
- **[@vitejs-plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react)** - Vite plugin for React.
- **[eslint](https://www.npmjs.com/package/eslint)** - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- **[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)** - ESLint plugin to enforce React Hooks rules.
- **[eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh)** - ESLint plugin for the React Refresh Babel transform.
- **[typescript](https://www.npmjs.com/package/typescript)** - TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
- **[vite](https://www.npmjs.com/package/vite)** - Next generation frontend tooling.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
