# Quail Valley Event Logger for Workers

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project was created for Ewing Poultry, and allows their workers to log and record maitenance issues or events in the sheds during production.  It is accessible via a web browser for the staff, and hosted by Firebase.  Each staff memebr can create their own account, is able to click on a shed to log an issue and write some notes about what is going on. 

A notfication is then send to support staff to enable them to monitor and fix the issue. These can the be marked as fixed. 

In the current faults section, the current shed maintenace status is able to be viewed, as different colours for the different statuses of the sheds, and a shed status can be updated once fixed. 

This project can be modified for your workplace! More information, let me know. 

This project is based off this repo: [Workout Tracker](https://github.com/sanderdebr/workout-tracker)

## How to run

In the project directory, you can run:

### `npm start`

Before running, you will need to add your custom map (in this case quailvalley) into node modules -> @svg-maps

Sometimes this will delete when npm updates, or when you npm install. 

Then npm start to run.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Currently this app is hosted by firebase at (https://quail-logger.web.app/)

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.



### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
