const { OPCUAClient, DataType } = require("node-opcua");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

// Server configuration
const opcuaConfig = {
  endpointUrl: "opc.tcp://localhost:4840",
  nodeId: "ns=1;s=the.node.identifier",
};

const serialPortConfig = {
  path: "/dev/ttyUSB0", // Update to match your Arduino's serial port
  baudRate: 9600, // Match this to your Arduino's configured baud rate
};

const port = new SerialPort(serialPortConfig);
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

async function writeToOPCUAServer(value) {
  const client = OPCUAClient.create({ endpointMustExist: false });

  try {
    await client.connect(opcuaConfig.endpointUrl);
    console.log("Connected to the OPC UA server.");

    const session = await client.createSession();
    console.log("OPC UA session created.");

    const statusCode = await session.writeSingleNode(opcuaConfig.nodeId, {
      dataType: DataType.Double,
      value: value,
    });

    console.log(`Write operation status code:`, statusCode.toString());

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

