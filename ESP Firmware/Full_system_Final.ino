#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>



MAX30105 particleSensor;

const byte RATE_SIZE = 4;
byte rates[RATE_SIZE];
byte rateSpot = 0;
long lastBeat = 0;
float beatsPerMinute;
int beatAvg;

// TO BE SENT
int average_heart_rate = 0;

// Array to store heart rate values
const int MAX_HEART_RATES = 1000; // Adjust this size as needed
int heartRates[MAX_HEART_RATES];
int heartRateCount = 0;

// Beat detection variables
const int THRESHOLD = 1000;  // Adjust this value based on your IR signal variation
float lastIRValue = 0;
bool isPeak = false;
const unsigned long MIN_BEAT_INTERVAL = 300; // Minimum ms between beats (200 BPM max)

// Setup for wifi

// Credentials
const char *ssid = "PeterJrIPhone15";
const char *password = "laverreblanc";

WiFiServer server(8080);

void setup() {
  // START SERIAL-----------
  Serial.begin(115200);
  //---------------------------

  // Configure pins --------------------------
    // Set pin D5 (GPIO 14) as input
    pinMode(D5, INPUT);
  // ----------------------------------


  Serial.println("MAX30102 Heart Rate Monitor");

  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30102 was not found. Please check wiring/power.");
    while (1);
  }

  // Adjust LED brightness and other settings
  byte ledBrightness = 60; // 0=Off to 255=50mA
  byte sampleAverage = 4;  // 1, 2, 4, 8, 16, 32
  byte ledMode = 2;        // 1=Red only, 2=Red+IR, 3=Red+IR+Green
  int sampleRate = 200;    // 50, 100, 200, 400, 800, 1000, 1600, 3200
  int pulseWidth = 411;    // 69, 118, 215, 411
  int adcRange = 4096;     // 2048, 4096, 8192, 16384

  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange);
  particleSensor.setPulseAmplitudeRed(0x0A);
  particleSensor.setPulseAmplitudeIR(0x2F); // Increased IR LED power


  //WIFI SETUP
  //------------------------------------------
  WiFi.begin(ssid, password);
  int wifiTimeout = 1000; // 20 attempts (5 seconds)
  while (WiFi.status() != WL_CONNECTED && wifiTimeout > 0) {
  delay(250);
  Serial.print(".");
  wifiTimeout--;
}
if (WiFi.status() != WL_CONNECTED) {
  Serial.println("Failed to connect to Wi-Fi. Please check credentials.");
  return;
}
  Serial.println("");
  Serial.println("WiFi connected");
  //------------------------------------------


  //SERVER SETUP
  //---------------------------------------------
  // server.on("/", HTTP_GET, handle_root);
  server.begin();
  Serial.println("Server started");
  Serial.println(WiFi.localIP());
  //--------------------------------------------

}



void loop() {

  // IF TOGGLE TRIGGERED HIGH
  if (digitalRead(D5)) {
      toggle_triggered();
  }


  // SERVER CLIENT HANDLING CODE ------------------------------------------------------

  // Check if a client has connected
  WiFiClient client = server.available();
  if (!client) {
    return;
  }

  // Wait until the client sends some data
  Serial.println("New client");
  while (!client.available()) {
    Serial.print("client not available");
    delay(1);
  }

  // Read the first line of the request
  String request = client.readStringUntil('\r');
  Serial.println(request);
  client.flush();

  // Match the request
  int value = average_heart_rate;
  if (request.indexOf("/GET_HEART_RATES") != -1) {
    // Return the response with all heart rate values in CSV format
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/plain"); // Use plain text for CSV
    client.println(""); // End of headers

    // Send heart rate values as a comma-separated string
    for (int i = 0; i < heartRateCount; i++) {
      client.print(heartRates[i]);
      if (i < heartRateCount - 1) {
        client.print(","); // Add comma between values
      }
    }
    client.println(); // End the line
  }

  // // Return the response
  // client.println("HTTP/1.1 200 OK");
  // client.println("Content-Type: text/html");
  // client.println(""); //  do not forget this one
  // client.println("<!DOCTYPE HTML>");
  // client.println("<html>");
  // client.println("<head><title>ESP8266 Server</title></head>");
  // client.println("<body>");
  // client.println("<h1>ESP8266 Server</h1>");
  // client.print("<p>Received number: ");
  // client.print(value);
  // client.println("</p>");
  // client.println("</body>");
  // client.println("</html>");

  delay(1);
  Serial.println("Client disconnected");
  Serial.println("");

  // ---------------------------------------------------------------------------------------



  //delay(50);
}

// On triggering of the toggle pin.
void toggle_triggered() {
  
  // Gets the start time.
  unsigned long startTime = millis();
  unsigned long duration = 5000; // 5 seconds
  int totalBeats = 0;
  int validBeats = 0;
  float totalBPM = 0;

  // loops for duration amount of time.
  while (millis() - startTime < duration) {
    long irValue = particleSensor.getIR();

    if (irValue < 50000) {
      // No finger detected, skip this reading
      continue;
    }

    // Custom beat detection
    float delta = irValue - lastIRValue;

    // Check for a beat
    unsigned long currentTime = millis();
    if (!isPeak && delta < -THRESHOLD && (currentTime - lastBeat) > MIN_BEAT_INTERVAL) {
      isPeak = true;
      long beatDelta = currentTime - lastBeat;
      lastBeat = currentTime;

      beatsPerMinute = 60000.0 / beatDelta; // Convert ms to BPM

      if (beatsPerMinute > 20 && beatsPerMinute < 255) {
        rates[rateSpot++] = (byte)beatsPerMinute;
        rateSpot %= RATE_SIZE;

        beatAvg = 0;
        for (byte x = 0; x < RATE_SIZE; x++)
          beatAvg += rates[x];
        beatAvg /= RATE_SIZE;

        totalBPM += beatAvg;
        validBeats++;
      }

      Serial.print(" Beat detected! BPM=");
      Serial.print(beatsPerMinute);
      Serial.print(" Avg BPM=");
      Serial.println(beatAvg);
    } else if (isPeak && delta > 0) {
      // Reset peak detection when signal starts rising again
      isPeak = false;
    }

    lastIRValue = irValue;
    delay(10); // Small delay to avoid overloading the sensor
  }

  // Calculate the average BPM over the 5-second period
  if (validBeats > 0) {
    average_heart_rate = totalBPM / validBeats;

    // Add the average BPM to the heartRates array
    if (heartRateCount < MAX_HEART_RATES) {
      heartRates[heartRateCount++] = average_heart_rate;
    }

    Serial.print("Average BPM over 5 seconds: ");
    Serial.println(average_heart_rate);
  } else {
    Serial.println("No valid beats detected in the last 5 seconds.");
  }

}