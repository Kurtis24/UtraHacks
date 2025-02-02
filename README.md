# Background
The Global Goals, also known as the Sustainable Development Goals (SDGs), are a set of 17 objectives adopted by the United Nations to create a better and more sustainable future by 2030. Goal #3, "Good Health and Well-Being," focuses on ensuring healthy lives and promoting well-being for people of all ages. This includes reducing maternal and child mortality, combating infectious diseases, ensuring universal access to healthcare, and promoting mental health.
Robotics and technology play a transformative role in advancing Goal #3. Through automation, enhanced monitoring, and AI-driven decision-making, robotics can improve healthcare access, efficiency, and quality, particularly in underserved regions. This project embodies that vision by addressing critical healthcare gaps using robotics.

# Project Overview
Our solution is an Autonomous Vital Monitoring Robot designed to navigate hospital settings, read patient vitals (such as heart rate), and store this data on a website for real-time access by doctors. Its primary goal is to reduce the workload of overburdened healthcare professionals in impoverished countries, ensuring timely and consistent patient monitoring, which is crucial for improving health outcomes.
Alignment with SDG #3
The robot directly supports SDG #3: Good Health and Well-being by:
Target 3.8 (Universal Health Coverage): Enhancing access to continuous health monitoring, even in resource-constrained environments.
Target 3.C (Health Workforce Support): Assisting overworked medical staff, enabling them to focus on critical, high-impact tasks.
Target 3.4 (Reduce Premature Mortality): Providing early detection of health deterioration, reducing preventable deaths.
Target 3.D (Health Emergency Preparedness): Strengthening hospital capacity during health crises by ensuring no patient is left unmonitored.

# Core Robotics Aspects
Perception (Sensing the World):
Uses an MH-ET Live heart rate sensor to detect and record patient vitals.
Employs a colour sensor to autonomously identify patient locations within the area
Uses a proximity sensor to determine proximity to patient’s hand

# Actuation (Interacting with the Environment):
Navigates hospital environments autonomously utilizing lines on the ground
Lowers arm with heart rate sensor attached to the end onto patient’s hand to collect readings

# Impact and Justification
This robot addresses the global healthcare workforce shortage, especially in low-income countries, where doctor-to-patient ratios are critically low. By automating vital monitoring, it ensures no patient is overlooked, reduces the risk of medical errors due to staff fatigue, and improves response times during emergencies. This solution is scalable, cost-effective, and adaptable to various healthcare settings, making it a powerful tool for advancing SDG #3.

# Implementation
Prototype Development: Using ESP32 microcontrollers, sensors, and autonomous navigation algorithms.
Field Testing: Initial trials in controlled environments, followed by deployment in resource-limited clinics.
Scalability: Modular design allows for easy upgrades and adaptations to different healthcare needs.

# Conclusion
Our autonomous robot embodies the spirit of SDG #3 by using robotics to improve health outcomes, reduce the burden on healthcare workers, and ensure equitable access to vital health monitoring services worldwide.
