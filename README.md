# OPC UA Arduino Client

The OPC UA Arduino Client is a Node.js application designed to bridge communication between an Arduino device and an OPC UA server. This project enables real-time monitoring of sensor data from an Arduino, such as light intensity measured in lux, and transmits this data to an OPC UA server for further processing, analysis, or visualization in industrial, home automation, or IoT applications.

This project is part of the blogpost [Building a minimal OPC UA integration to collect office data with Arduino and Raspberry PI 3](https://kaiomagalhaes.com)

## Features

- **Serial Communication**: Reads data from an Arduino via serial port communication.
- **Data Parsing**: Utilizes regular expressions to extract sensor readings (e.g., lux values) from the Arduino's output.
- **OPC UA Integration**: Writes parsed sensor data to a specified node on an OPC UA server, allowing for interoperability within industrial systems.
- **Asynchronous Operations**: Employs async/await for non-blocking OPC UA server communication.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: The project is developed using Node.js. Ensure you have Node.js installed on your system.
- **Serialport and OPC UA Libraries**: Dependencies are managed via npm (Node Package Manager). The `serialport` library is used for serial communication, while `node-opcua-client` is used for OPC UA server communication.

## Installation

1. **Clone the Repository**:
   Clone this repository to your local machine using:

```bash
 git clone https://github.com/kaiomagalhaes/office-opc-ua-client
```

2. **Install Dependencies**:
   Navigate to the project directory and install the required dependencies:

```bash
   cd office-opc-ua-client
   npm install
```

3. **Configure Serial Port and OPC UA Server**:
   Update the `serialPortConfig` and `opcuaConfig` objects in `index.js` to match your environment. Specifically, set the `path` to your Arduino's serial port and configure the `endpointUrl` and `nodeId` for your OPC UA server.

## Usage

To start the OPC UA Arduino Client, run the following command in the project directory:

```
npm start
```

This command initializes the client, establishes a connection to the Arduino via the specified serial port, and starts listening for data. When sensor data is received, it's parsed and sent to the configured OPC UA server node.

## Contributing

Contributions to the OPC UA Arduino Client are welcome. To contribute:

1. Fork the repository.
2. Create a new branch for your feature (git checkout -b feature/AmazingFeature).
3. Commit your changes (git commit -am 'Add some AmazingFeature').
4. Push to the branch (git push origin feature/AmazingFeature).
5. Open a pull request.

## Contact

If you have any questions or comments about the OPC UA Arduino Client, please feel free to contact me@kaiomagalhaes.com
