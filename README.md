# IoT-Fullstack-Pomodoro 🍅 
A fullstack app created for the IoT course at college

💡This is how I imagined the Pomodoro technique in the IoT context:
Users should be able to create accounts in the app, communicate with eachother via the built-in chat and when the timer starts in the app it starts
for all the other users synchronously. This way they have a virtual study room in which they can do their homework by themselves or with other people,
something like a youtube "Study with me" type of video. This situation is benefic for a student because it helds him/her accountable on actually finishing
the task.

🎥 The app is running but it's still in the prototype stage as I didn't have the time to finish it.

💻 This is what I have working for now:
Only one board can connect via the serial port because I did not have a wi-fi module so after the user creates an account and is presented to the Study Room,
once he/she presses the start button, a json object containing the information about the timer is publushed to a localhost MQTT broker on which the Arduino
is subscribed via a Node-Red instance. Once the information is retrieved by Node-Red, it is sent via the serial port to the Arduino and displayed on the
LCD display. When is time for a short break the buzzer makes a sound and also when the break is over. The user can also pause or stop the timer from the
web app.

The web app was created using Meteor.js and React as front-end. I also used tailwind.css and Daisy Ui for the components.

Some screenshots from within the app:
LogIn screen:
![1](https://user-images.githubusercontent.com/70197124/214061257-117c5271-dce7-4433-990b-f535549de0c5.jpg)

Study Room:
![2](https://user-images.githubusercontent.com/70197124/214061397-0250bee7-4b2b-4250-9c74-1b8664e0ef6c.jpg)

Node-Red MQTT broker and subscriber:
![3](https://user-images.githubusercontent.com/70197124/214061712-7ae46214-ba29-4bac-88fc-24989dfb19bd.jpg)
