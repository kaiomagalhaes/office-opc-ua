// Importing the necessary modules
const { OPCUAClient, DataType } = require("node-opcua-client");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

// OPC UA server configuration
const opcuaConfig = {
  endpointUrl: "opc.tcp://localhost:4840", // Adjust as necessary
  nodeId: "ns=1;s=the.node.identifier", // Adjust to match your OPC UA server's node ID
};

// Serial port configuration for Arduino communication
const serialPortConfig = {
  path: "/dev/ttyUSB0", // Update to match your Arduino's serial port
  baudRate: 9600, // Match this to your Arduino's configured baud rate
};

// Setup the serial port for reading Arduino data
const port = new SerialPort(serialPortConfig);
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

// Function to write a value to the OPC UA server
async function writeToOPCUAServer(value) {
  const client = OPCUAClient.create({ endpointMustExist: false });

  try {
    // Connect to the OPC UA server
    await client.connect(opcuaConfig.endpointUrl);
    console.log("Connected to the OPC UA server.");

    const session = await client.createSession();
    console.log("OPC UA session created.");

    // Write the value to the specified node
    const statusCode = await session.writeSingleNode(opcuaConfig.nodeId, {
      dataType: DataType.Double,
      value: value,
    });

    console.log(`Write operation status code:`, statusCode.toString());

    // Close the session and disconnect from the server
    await session.close();
    await client.disconnect();
    console.log("Disconnected from the OPC UA server.");
  } catch (error) {
    console.error("Failed to write to OPC UA server:", error);
  }
}

// Event listener for data received from the Arduino through the serial port
parser.on('data', data => {
    console.log(`Data received from Arduino: ${data}`);

    // Regular expression to extract the Lux value
    const luxPattern = /Lux: (\d+(\.\d+)?)/;
    const matches = data.match(luxPattern);

    if (matches && matches.length > 1) {
        // Convert the extracted string to a floating-point number
        const luxValue = parseFloat(matches[1]);

        // Send the parsed Lux value to the OPC UA server
        if (!isNaN(luxValue)) {
            console.log(`Parsed Lux Value: ${luxValue}`);
            writeToOPCUAServer(luxValue).catch(console.error);
        }
    } else {
        console.error('Failed to parse Lux value from data.');
    }
});


console.log("OPC UA Arduino client initialized and running.");

