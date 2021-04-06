# /login -
Part 1
when the email is entered by the user
then the email is verified at the database
if the email is valid
then the password field is visible
else it will prompt message invalid user

# approach
- verify email from database
- return this with 3 codes
    - invalid : if the email doesn't exist return 403 status code
    - valid : if the email is valid return 200 code
    - isPasswordSet : if the password need to be set then click on Forgot Password Link

# Part 2
when the email is valid and password is correct
then send OTP on the email of the user
if the OTP entered is correct
then login else error invalid otp entered

# approach
- check the password using bcript
    - valid: generate 5 digit random number and send to the email of user
    - invalid : throw error
- check the entered otp if valid using(speakeasy)
    - matched : login success
    - not matched : login unsuccessfull

/forgotPassword
