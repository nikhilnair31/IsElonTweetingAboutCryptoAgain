# IsElonTweetingAboutCryptoAgain?
## To-Do
* General
    - [ ] Show tweets as Dots overlayed onto the Area chart.
    - [ ] Before final deploy change date format to DD MMM, YY
        - [x] Check why in mobile mode the X Axis values change from dates to days i.e 1-365
        - [x] Show tweet on hover
* Tooltip
    - [ ] Limit the width for longer tweets
    - [ ] Format tweet better
* Lambda
    - [ ] Fix the Twint Lambda. AWS Lambda Docker image works but doesn't have Git and base Python images have git but don't work. Alternative is using layers but firebase_admin + twint + numpy is more than the max 250 MB size limit.
* Database
    - [ ] Apply proper rules in Firebase RTDB to not get spammed again
* Other
    - [ ] Improvements?