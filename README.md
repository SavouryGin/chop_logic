# Chop Logic

Pet project for developing a React interface, which will allow to construct logical proofs and calculate other logical stuff.

### Name templates

1. _Branch name_

   > ts-15_header-component<br>
   > bug-21_incorrect-filename

2. _Commit message_

   > ts-15: add styles for the header<br>
   > bug-21: fix the file extension

3. _PR title_

   > Ts-15: Header component<br>
   > Bug-21: Incorrect filename

### Scripts

#### `npm run dev`

This command will use the webpack-dev-server to create a dev server and will watch for your code changes and be recompiled every time you make a change. Open [localhost](http://localhost:9000) to view it in the browser.

#### `npm run build`

This command will build your code and generate a single bundle file and insert it into the html file generated.

#### `npm run start`

This command will run the serve package which will use the dist folder to create a static page.

#### `npm run lint`

This command will run ESLint through all the .js, .ts, and .tsx (used with React) files. Any ESLint errors that can be automatically fixed will be fixed with this command, but any other errors will be printed out in the command line.

#### `npm run test`

This command will run all test suites using the Jest framework.
