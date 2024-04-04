# Nx Meta Cloud Web-App

## Introduction

This project is a web application developed using Next.js that interacts with the Nx Meta Cloud API. It allows users to log in, check and create event rules, and connect to the alert stream provided by the Nx Meta Cloud.

This Project is developed using Next.js@14

## Installation

1.  Clone the repository:
     
    
2.  Navigate to the project directory:
            
3.  Install dependencies:
    
    
    `npm install` 
    

## Usage

1.  Start the development server:
        
    `npm run dev` 
    
2.  Open your browser and navigate to http://localhost:3000.
    
3.  Click on the "Log in" button to authenticate with Nx Meta Cloud using OAuth.
    
4.  Once authenticated, you can use the other buttons to interact with the API as described below:
    
    -   **Check the Rule:** Sends a GET request to `/ec2/getEventRules` to check if a specific event rule exists.
    -   **Create the Rule:** Sends a POST request to `/ec2/saveEventRule` to create a new event rule if it does not already exist.
    -   **Connect to the alert stream:** Establishes a WebSocket connection to `/ec2/websocket/transactionBus` to start receiving system events.
5.  Events received from the alert stream will be displayed dynamically on the webpage.
    

## Functionality

-   **Log in:**
    
    -   Implements OAuth login over the Nx Meta Cloud.
    -   Stores login tokens you can check console to see the fetched token .
    -   Disables other buttons until successful login.
-   **Check the Rule:**
    
    -   Sends a GET request to `/ec2/getEventRules` to check if a specific event rule exists.
    -   Enables "Create the Rule" button if the rule does not exist.
-   **Create the Rule:**
    
    -   Sends a POST request to `/ec2/saveEventRule` to create a new event rule if it does not already exist.
    -   Disables "Create the Rule" button and enables "Connect to the alert stream" button upon successful creation.
-   **Connect to the alert stream:**
    
    -   Establishes a WebSocket connection to `/ec2/websocket/transactionBus` to receive system events.
    -   Parses and displays specific events dynamically on the webpage.

## Technologies Used

-   React
-   Next.js
-   WebSocket API
