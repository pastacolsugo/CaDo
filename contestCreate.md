# Contest creation flow

Here's described how the user has to set up the contest.

When the app is started, there are two cases:

1. The DB already contains admin credentials
2. The DB is empty

## 1. The DB already has admin credentials
Each receives a page with minimal info and a login form. The admin can login using the stored credentials and setup the contest.

### 1.1 _What to do if the admin forgets the password?_

1. Have a "hardcoded" master password. The code will have the **master-password HASH** hardcoded and it will check the `hash(password)` against this hash.

2. Reset password form, but everyone in the room will be able to change the password.

## 2. The DB is empty
Each connection but `localhost` will be redirected to an information page.
The admin can connect to the server via `localhost` and create it's admin credentials (username and password).
Once he has the credentials he can either proceed to setup the contest from the VM, or close the connection and login from any other LAN-connected computer and setup the contest from there.

## 3. Contest Setup
The admin can connect to `cado-URL/contestSetup` and will receive a login form.

Once the admin has entered the it's previously created credentials, he will be shown the setup page.

### 3.1 Setup Page
This page is divided into sections, that gets **dynamically displayed** upon completion of the previous, or with a button.

#### 3.1.1 Config file
At the top of the page there will be a button allowing the admin to upload a contest configuration file (JSON). Once it has been uploaded the pages directly shows every section, pre-filled with the data from the configuration file.

#### 3.1.2 New configuration
To create a new configuration, fill in each field.

* Contest Name
* Duration
	* (I believe date pickers are not the right choice, once the contest has been set up, in the admin page we can have a START button or the possibility to set a time) 
* Number of problems [ _Np_ ]

### 3.2 Problem Statement Page
The page gets updated and _Np_ identical problem upload section will be shown.

#### 3.2.1 Problem Upload Section
Each section will have:

* Text input field for the problem ID (E.g. _noccioline_, _magneti_, ...)
* File upload button
* Disclaimer --> Each PDF file must be **less than 10MB**
=======
### 3.2 Problem Statement Page

The optimal solution is to just have the working code for the problem, load it along and generating each **correct output** automatically, executing the code inside **Isolate**.
While this will happen, in an earlier stage could be easier to just have the pre-calculated output in the DB.
Because a configuration file could be used for multiple contests, the problem-set should not.
Having both the contest information and the problem-set data in the same file could be impractical. I think every problem should have it's own file with inputs and outputs. So that even changing a problem on-the-fly or last moment is more plug-and-play.

-

The page gets updated and _Np_ identical problem upload section will be shown.

#### 3.2.1 Problem Statement Upload Section
The _Problem Data_ file is a JSON that contains all the info that will be specified in sections `3.2.1, 3.2.2, 3.2.3`. 

Each section will have:

* Text input field for the problem ID (E.g. _noccioline_, _magneti_, ...)
* Problem Statement upload button
* Disclaimer --> Each PDF file must be **less than 10MB**
* Problem Data upload button [ optional ]
>>>>>>> contestSetup
* Radio button:
	* Testcase mode
	* Subtask mode

<<<<<<< HEAD
#### 3.2.2 Testcase mode
=======
####3.2.2 Testcase mode
>>>>>>> contestSetup

* Number of testcase [ _Nt_ ]
* _Nt_ sections with:
	* Memory limit
	* Time limit
	* Input data
	* Output data
	* Points for AC
	* Tag _(E.g. set1, N<10e3, pierpaolo, ...)_ [ optional ]
	* AC Solution Source [ optional ]

<<<<<<< HEAD
#### 3.2.3 Subtask mode
=======
####3.2.3 Subtask mode
>>>>>>> contestSetup
**Note: when enabling-disabling** `Subtask mode` **the content of the testcase section MUST remain in the form.**

Will be the same of **Testcase mode** but will add a selection for:

* Number of subtasks [ _Ns_ ]
* _Ns_ sections with:
	* Points
	* Testcase Selection:
		* First included testcase [index]
		* Last included testcase [index]
		* **^^^ OR vvv**
		* Tag group
	* Color [optional]

The color, if present, will be used to color-code the testcase section in the contest management page.

---

<<<<<<< HEAD
### 3.3 Team Setup
=======
###3.3 Team Setup
>>>>>>> contestSetup
This section can be automatically filled. Each team could set his own team name and component list once has logged in. Login usernames will be randomly picked from a lookup table of names, password could be generated similarly, maybe by truncating and concatenating multiple words.

* Number of teams [ _Nt_ ]
* _Nt_ sections with:
	* Team Name
	* Login credentials:
		* username
		* password
	* Component list (contestants) [ optional ] :
		* First name
		* Last name
		* Class

<<<<<<< HEAD



If it isn't, the server waits for a connection from `localhost` and redirects any other connection to a `HTTP 403 Forbidden` error page. Then, the system asks the user to create an admin account and, after that, disconnects the user.
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
=======
###3.4 Export to config file

All of these data can be exported to a configuration file, which is just a JSON, containing all the necessary information for the contest. This approach allows the tutor to setup the contest ahead of time, on it's machine, test it and just plug it in the contest VM.
This allows for a faster and hassle-free contest preparation, while also saving time, because the configuration can be loaded in the page and edited. A configuration file can be used as a template for other contests.

The admin user will have a section `Export to file` containing, as checkbox:

* Contest setup file
* Problem statement
	* All
	* Single statement
* Problem configuration file
	* All
	* Single file
* Everything

Followed by a `Download` button, which will start the download of a `.zip` archive (not sure of that).




---
---
---

When every information has been entered, the admin will use the `SEND` button.
This button will:

* retrieve all fields value
* check for completeness
	* if needed abort the send, display some info and print more details in the developer console.
* pack the data into a JSON file
* send it to `CaDo-Server`

If the operation is successful, the admin will be redirected to the admin console.
If the operation is unsuccessful, an error message will be displayed and more detailed info will be printed into the developer console.






>>>>>>> contestSetup
