# json-server Admin Dashboard

![json-server Admin Dashboard](https://github.com/razaahmad333/json-server-admin-dashboard/assets/50910798/2addba9b-69a6-41ee-808a-083ce0d9912a)

**json-server Admin Dashboard** is a simple and intuitive admin dashboard designed to work seamlessly with [json-server](https://github.com/typicode/json-server) and [lowdb](https://github.com/typicode/lowdb). This project empowers you to effortlessly manage and visualize your json-server or lowdb data, making it easier than ever to interact with your API data.

## Getting Started

Follow these steps to set up and start using the json-server Admin Dashboard:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/razaahmad333/json-server-admin-dashboard
   ```

2. **Install Node.js**:

   Ensure you have Node.js installed on your system. You can check if it's installed by running:

   ```bash
   node -v
   ```

   If Node.js is not installed, you can download and install it from the official [Node.js website](https://nodejs.org/).

3. **Install Dependencies**:

   Navigate to the cloned repository:

   ```bash
   cd json-server-admin-dashboard
   ```

   Install project dependencies using npm:

   ```bash
   npm install
   ```

4. **Configure Your Database**:

    In the `.env` file, provide the absolute path to your `db.json` file, which is used by your JSON server or lowdb. The format for the absolute path is as follows:

    **Linux and macOS**:

    ```bash
    /absolute/path/to/your/db.json
    ```

    **Windows**:

    ```bash
    C:\absolute\path\to\your\db.json
    ```

    Make sure the path is correctly specified.

    **Note:** If you don't have a `db.json` file, you can create one following the json-server or lowdb documentation.

5. **Start the Admin Dashboard**:

   After completing the above steps, you're ready to start the json-server Admin Dashboard:

   ```bash
   npm start
   ```

6. **Access the Admin Dashboard**:

   Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the JSON Server Admin Dashboard.

7. **Enjoy!**

## About the Author

json-server Admin Dashboard is brought to you with love by **Ahmad Raza**. You can connect with Ahmad on [GitHub](https://github.com/razaahmad333).

This project is open source, and we welcome contributions and feedback. If you encounter any issues or have suggestions for improvements, please feel free to create an issue on the GitHub repository.

Thank you for choosing json-server Admin Dashboard. We hope it enhances your experience with json-server and lowdb. Enjoy exploring and managing your data!
