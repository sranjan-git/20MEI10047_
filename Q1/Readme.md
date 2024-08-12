Here's a sample README file for your Average Calculator HTTP microservice:

---

# Average Calculator HTTP Microservice

## Overview

This project is an Average Calculator microservice that exposes a REST API endpoint `numbers/{numberid}`. The microservice fetches numbers from a third-party server based on the provided `numberid`, calculates their average, and maintains a window of the last 10 unique numbers. The microservice is built using TypeScript and Express.js.

### Features
- Fetches numbers from a third-party API based on the `numberid`.
- Supports number IDs for:
  - `p`: Prime numbers
  - `f`: Fibonacci numbers
  - `e`: Even numbers
  - `r`: Random numbers
- Maintains a window of the last 10 unique numbers.
- Calculates and returns the average of the numbers in the window.
- Handles API timeouts and errors gracefully.
- Quick response time, ensuring responses within 500ms.

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- TypeScript (v4.x or later)
- dotenv (for environment variables)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/average-calculator-microservice.git
    cd average-calculator-microservice
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your access token:

    ```bash
    ACCESS_TOKEN=your_actual_access_token
    ```

4. Compile TypeScript:

    ```bash
    npm run build
    ```

5. Start the server:

    ```bash
    npm start
    ```

The server should now be running on `http://localhost:3000`.

### API Usage

The microservice provides a single endpoint:

**GET** `/numbers/:numberid`

- **Parameters:**
  - `numberid`: The type of numbers to fetch. Valid values are:
    - `p`: Prime numbers
    - `f`: Fibonacci numbers
    - `e`: Even numbers
    - `r`: Random numbers

- **Response:**

    ```json
    {
      "windowPrevState": [/* previous window state */],
      "windowCurrState": [/* current window state */],
      "numbers": [/* numbers fetched from third-party API */],
      "avg": 0
    }
    ```

- **Example Request:**
    ```bash
    curl http://localhost:3000/numbers/e
    ```

- **Example Response:**
    ```json
    {
      "windowPrevState": [2, 4, 6],
      "windowCurrState": [2, 4, 6, 8],
      "numbers": [8],
      "avg": 5.00
    }
    ```

### Running Tests

The project doesn't currently have automated tests. However, you can manually test the functionality by sending requests to the `/numbers/:numberid` endpoint.

### Error Handling

- If the request to the third-party API takes longer than 500ms or fails, an empty array is returned for `numbers`, and the current window state remains unchanged.

### Environment Variables

- `ACCESS_TOKEN`: Your access token for authenticating with the third-party API.

## Troubleshooting

- **Timeouts:** If you receive a "timeout of 500ms exceeded" error, ensure the third-party API is responsive or increase the timeout if necessary.
- **Invalid number ID:** Ensure you are passing one of the valid `numberid` values (`p`, `f`, `e`, `r`).

## Built With

- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser and Node.js

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The third-party API used for fetching numbers.
- All open-source contributors.

---

This README file provides clear instructions and covers all the essential aspects of your project, making it easy for others to understand and use your microservice.
