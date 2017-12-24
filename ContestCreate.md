# Contest creation flow

Here's described how the user has to set up the contest

1. When the app is started, there are two cases: the database is already populated, or it's not. If it isn't, the server waits for a connection from `localhost` and redirects any other connection to a `HTTP 403 Forbidden` error page. Then, the system asks the user to create an admin account and, after that, disconnects the user.
2. The user logs in and the contest creation page is shown. In this page there are many fields:
    * A field to enter the contest name
    * Two datepickers to choose the date and time of start and end of the contest
    * A field to choose the number of tasks to create
3. Then, for every task to create, the administrator uploads the task statement in PDF (check if the size is <10MB because of MongoDB limitations that limit the total size of a record to 16 MB). The admin then chooses wether to use the _subtask-testcase_ or the _testcase-only_ model. Depending on the action, the page is **dinamically updated**:
    * If the admin chooses the _subtask-testcase_ model, then the admin is asked to enter the _N_ number of subtasks. _N_ sections are then created. Every section contains:
        * The full score of the subtask
        * The number of testcases
        * A section for every testcase that contains:
            * An option to cache the output of the grading algorithm
            * The input to pass to the submission
    * Otherwise, the admin is asked to enter the _N_ number of testcases and the full score of the problem (the score is equally divided between the testcases). _N_ sections are then created. Every section contains:
        * An option to cache the output of the grading algorithm
        * The input to pass to the submission
4. The admin then submits the form and the same form described in #3 is presented until he has entered all the task details.
5. The admin is then asked to enter the number of users to generate. After submitting the form, he's given the option to [export the contest](https://github.com/eutampieri/CaDo/issues/13) and to [download a PDF containing all usernames and password for the teams](https://github.com/eutampieri/CaDo/issues/2)
6. The user is redirected to the admin console.
