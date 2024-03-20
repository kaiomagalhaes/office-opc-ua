const int pinoLDR = A0; // pin where the LDR is connected
int readValue = 0;      // variable to store the ADC read value
float voltage = 0.0;    // variable to store the voltage
float lux = 0.0;        // variable to store the estimated lux value

void setup()
{
  // Starts and configures Serial
  Serial.begin(9600); // 9600bps

  // configures the pin with LDR as input
  pinMode(pinoLDR, INPUT); // pin A0
}

void loop()
{
  // reads the voltage value on the LDR pin
  readValue = analogRead(pinoLDR);

  // converts and prints the value in electrical voltage
  voltage = readValue * 5.0 / 1024.0;

  // Simple approximation to convert voltage to lux
  // This formula needs to be calibrated for your specific LDR and setup!
  // Here we use a placeholder formula that assumes linear relation, which is not accurate.
  lux = voltage * 100; // Example conversion, adjust this formula based on your LDR's characteristics

  Serial.print("Voltage: ");
  Serial.print(voltage);
  Serial.print("V\t");

  // prints the estimated lux value
  Serial.print("Lux: ");
  Serial.print(lux);

  Serial.println(); // new line

  delay(1000); // waits 1 second for a new reading
}
