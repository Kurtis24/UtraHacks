// Define motor control pins
#include <Servo.h>

#define MOTOR1_IN1 10  // Motor A - Direction Pin 1
#define MOTOR1_IN2 11  // Motor A - Direction Pin 2
#define MOTOR2_IN1 12  // Motor B - Direction Pin 1
#define MOTOR2_IN2 13  // Motor B - Direction Pin 2
#define BUTTON_PIN 8
int trigPin = A0;
int echoPin = A1;
#define S0 A2
#define S1 A3
#define S2 A4
#define S3 A5
#define sensorOut 2
#define OE 4  // Output Enable Pin

Servo servo1;
Servo servo2;

int pulseWidth = 1500;

void setup() {
    // Set motor pins as OUTPUT
    pinMode(MOTOR1_IN1, OUTPUT);
    pinMode(MOTOR1_IN2, OUTPUT);
    pinMode(MOTOR2_IN1, OUTPUT);
    pinMode(MOTOR2_IN2, OUTPUT);
    pinMode(BUTTON_PIN, INPUT_PULLUP);

    Serial.begin(9600);  // Start Serial Monitor
    
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);

    pinMode(S0, OUTPUT);
    pinMode(S1, OUTPUT);
    pinMode(S2, OUTPUT);
    pinMode(S3, OUTPUT);
    pinMode(sensorOut, INPUT);

    digitalWrite(S0, HIGH);
    digitalWrite(S1, HIGH);

    servo1.attach(3);
    servo2.attach(5);
    servo1.writeMicroseconds(pulseWidth);
    servo2.writeMicroseconds(2000 - pulseWidth);
    

}

void goStraight(int time) {
  // Motor A: Forward
  digitalWrite(MOTOR1_IN1, HIGH);
  digitalWrite(MOTOR1_IN2, LOW);

  // Motor B: Forward
  digitalWrite(MOTOR2_IN1, HIGH);
  digitalWrite(MOTOR2_IN2, LOW);

  delay(time); 
  stopMotors();
}

void stopMotors() {
  // Motor A: Stop
  digitalWrite(MOTOR1_IN1, LOW);
  digitalWrite(MOTOR1_IN2, LOW);

  // Motor B: Stop
  digitalWrite(MOTOR2_IN1, LOW);
  digitalWrite(MOTOR2_IN2, LOW);
}

// Function to make the motors turn left
void turnLeft() {
  // Motor A: Stop (or reverse for sharper turn)  digitalWrite(MOTOR1_IN1, LOW);
  digitalWrite(MOTOR1_IN2, HIGH);

  // Motor B: Forward
  digitalWrite(MOTOR2_IN1, HIGH);
  digitalWrite(MOTOR2_IN2, LOW);
  delay(600); 
  stopMotors(); 
  delay(500);
}

// Function to make the motors turn right
void turnRight() {
  // Motor A: Forward
  digitalWrite(MOTOR1_IN1, HIGH);
  digitalWrite(MOTOR1_IN2, LOW);

  // Motor B: Stop (or reverse for sharper turn)
  digitalWrite(MOTOR2_IN1, LOW);
  digitalWrite(MOTOR2_IN2, HIGH);
  delay(600);
  stopMotors(); 
  delay(500); 
}

void armUp () {
  for (pulseWidth = 1200; pulseWidth >= 600; pulseWidth -= 1) {
    servo1.writeMicroseconds(pulseWidth);
    servo2.writeMicroseconds(2000 - pulseWidth);
    delay(3); // Adjust for smoothness
  }

    digitalWrite(7, HIGH); // Turn D4 ON 
}


void armDown (){
  digitalWrite(7, LOW);
    // Smoothly decelerate to stop
  for (pulseWidth = 600; pulseWidth <= 1200; pulseWidth += 1) {
    servo1.writeMicroseconds(pulseWidth);
    servo2.writeMicroseconds(2000 - pulseWidth);
    delay(3);
  }
}


void loop() {
    while (digitalRead(BUTTON_PIN) == HIGH){
      int buttonState = digitalRead(BUTTON_PIN);
      if (buttonState == LOW) break; 
    }

    goStraight(4000);  // Move forward
  // delay(2000);   // Move forward for 2 seconds

  turnRight();    // Turn left
  goStraight(4000);
  armUp();
  delay(7000);
  armDown();

  delay(3000); 

  turnRight(); 
  turnRight(); 

  goStraight(4000); 
  turnRight(); 

  // delay(1000);   // Turn left for 1 second

  // stopMotors();  // Stop
  // delay(1000);   // Stop for 1 second

  // turnRight();   // Turn right
  // delay(1000);   // Turn right for 1 second

  // stopMotors();  // Stop
  // delay(1000); 
    // Serial.println("Program Start"); 

  // digitalWrite(trigPin, LOW);
  // delayMicroseconds(2);

  // // Send a 10µs HIGH pulse to the trig pin
  // digitalWrite(trigPin, HIGH);
  // delayMicroseconds(10);
  // digitalWrite(trigPin, LOW);

  // // Read the duration of the HIGH pulse on the echo pin
  // long duration = pulseIn(echoPin, HIGH);

  // // Calculate the distance in centimeters
  // // Speed of sound = 343 m/s = 0.0343 cm/µs
  // // Distance = (duration * speed of sound) / 2 (round trip)
  // float distance = duration * 0.0343 / 2;

  // // Print the distance to the Serial Monitor
  // Serial.print("Distance: ");
  // Serial.print(distance);
  // Serial.println(" cm");

  // // Add a small delay for readability
  // delay(100);



    // // Run both motors forward
    // digitalWrite(MOTOR1_IN1, HIGH);
    // digitalWrite(MOTOR1_IN2, LOW);
    // digitalWrite(MOTOR2_IN1, HIGH);
    // digitalWrite(MOTOR2_IN2, LOW);
    
    // delay(5000);  // Run for 5 seconds

    // // Stop both motors
    // digitalWrite(MOTOR1_IN1, LOW);
    // digitalWrite(MOTOR1_IN2, LOW);
    // digitalWrite(MOTOR2_IN1, LOW);
    // digitalWrite(MOTOR2_IN2, LOW);
    
    // delay(5000);  // Stop for 5 seconds
}
