# <span style="color: #FF5733;">Weekday</span>

## <span style="color: #FF5733;">Description</span>
A candidate application platform that allows users to view job listings, filter jobs based on various criteria, and includes infinite scroll for a seamless browsing experience. The platform provides a user-friendly interface for viewing and applying to jobs.

## <span style="color: #FF5733;">Installation</span>

To get started with this project, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/ZeusAbhi/weekday.git
    ```
2. Navigate to the project directory:
    ```sh
    cd weekday
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## <span style="color: #FF5733;">Usage</span>

To run the development server locally, follow these steps:

1. Navigate to the `src` directory:
    ```sh
    cd src
    ```
2. Run JSON Server to simulate the backend API:
    ```sh
    npx json-server db.json
    ```
3. Navigate back to the project directory:
    ```sh
    cd ..
    ```
4. Start the development server:
    ```sh
    npm run start
    ```

## <span style="color: #FF5733;">Project Structure</span>

The project structure is as follows:

- `src/`: Main source code directory.
  - `components/`: Contains React components.
  - `assets/`: Contains static assets.
  - `Redux/`: Contains Redux-related files.

## <span style="color: #FF5733;">Tech Stack</span>

The project is built using the following technologies:

- ReactJS
- Redux
- CSS
- Material UI
- JSON Server

## <span style="color: #FF5733;">Features</span>

Each job listing is displayed as a card containing the following information:

- **Job Title**
- **Company Name**
- **Location**
- **Job Description** (Limited with an option to expand)
- **Experience Required**
- **Apply Button/Link**

## <span style="color: #FF5733;">Filters</span>

Refine job listings based on the following criteria:

- **Minimum Experience**
- **Company Name**
- **Location**
- **Remote/On-site**
- **Role**
- **Minimum Base Pay**

## <span style="color: #FF5733;">Infinite Scroll</span>

Implemented infinite scroll to load additional job listings automatically as the user scrolls down the page.

## <span style="color: #FF5733;">License</span>

This project is licensed under the [License Name] License - see the [LICENSE.md](LICENSE.md) file for details.
