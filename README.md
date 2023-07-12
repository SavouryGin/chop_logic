# Chop Logic

Pet project for developing a React interface, which will allow to construct logical proofs and calculate other logical stuff.

## Name templates

1. _Branch name_

   > ts-15_header-component<br>
   > bug-21_incorrect-filename

2. _Commit message_

   > ts-15: add styles for the header<br>
   > bug-21: fix the file extension

3. _PR title_

   > Ts-15: Header component<br>
   > Bug-21: Incorrect filename

## Scripts

```sh
npm run dev
```

This command will use the webpack-dev-server to create a dev server and will watch for your code changes and be recompiled every time you make a change. Open [localhost](http://localhost:9000) to view it in the browser.

```sh
npm run build
```

This command will build your code and generate a single bundle file and insert it into the html file generated.

```sh
npm run lint
```

This command will run ESLint through all the .js, .ts, and .tsx (used with React) files. Any ESLint errors that can be automatically fixed will be fixed with this command, but any other errors will be printed out in the command line.

```sh
npm run test
```

This command will run all test suites using the Jest framework.

## Code Style

#### Basic Rules

- Only include one React component per file.
- Prefer functional components over class components.
- Always use JSX syntax.
- Remove all `console.log()` before pushing your code into the repository.
- No unneeded comments.
- Methods and functions that are longer than the screen should be refactored into smaller units.
- Commented out code should be deleted, not committed.
- Use absolute imports, except when the imported files are located inside the component folder.

```
import './child'            // OK
import '../../component'    // not OK!
```

- Import libraries first, then absolute imports, then child imports

```
import React from 'react';
import Logo from 'components/logo';
import SidebarGroup from './group';
```

#### Naming conventions

- Use `.tsx` extension for React components.
- Use `PascalCase` in components, interfaces, or type aliases. For example, `ModalWindow`, `WriteOffAccrualsState`.
- Use `kebab-case` for folder names. For example, `pages/propositions`.
- Create a `index.tsx` within each folder for exporting. This will reduce repeating names on the imports.
- Use the filename as the component name. For example, `grid-header.tsx` should have a reference name of `GridHeader` component. However, for root components of a directory, use `index.tsx` as the filename and use the directory name as the component name.
- If a component requires multiple files (`.scss`, `.test.tsx`, etc.) locate all files within component a folder.
- Always use `camelCase` for prop names.
- Unit test files should use the same name as its corresponding file. For example, for `GridHeader` component create `grid-header.test.tsx` test.
- Variable names should be `camelCase`. Variable names can contain number and special characters

#### Bug avoidance

- Avoid using an array index as key prop, prefer a stable ID.
- Always define explicit defaultProps for all non-required props.
- Use optional chaining if things can be null.
- Create pure functions and avoid side-effects.
- Avoid mutating state when working with arrays or objects.
- Treat props as read-only. Do not try to modify them.

#### Testing

- Write unit tests for your components and functions.
- No logic should exist within your test code.
- Don't test more than one thing in a test.
- Code that needs to talk to a network should be mocked. Place the mock data into `src/__mocks__` folder.

#### Styles

- Avoid inline CSS rules.
- Use [SCSS](https://sass-lang.com/guide/) (not SASS) syntax.
- Create a new `styles.scss` file for each React component and make root className unique for a project (based on business sense of the page).
- Use [BEM](https://en.bem.info/methodology/css/) naming conventions for classNames.

  > className example:
  > Block - `aside-bar`
  > Element - `logo`
  > Modifier - `highlighted`
  > Result: `aside-bar__logo_highlighted`

- Only one block selector can be placed inside a single `.scss` file. Element and modifier selectors must be nested within a block declaration.
- Use the parent selector -- [&](https://sass-lang.com/documentation/style-rules/parent-selector/) -- to refer to the outer selector.
- If you need reuse part of the styles, it should be decided by reusing a component, not by copy-pasting styles.
- Extract reusable style into [mixins](https://sass-lang.com/documentation/at-rules/mixin/).

#### Code Structure

- Try to create custom hooks instead of just putting a useEffect or multiple useStates directly to your component.
- Whenever it is possible, split your component into smaller chunks. Often applicable when you are using conditional rendering or defining the columns for a data grid, etc.
- Wrap JSX tags in parentheses when they span more than one line.
- Do not use underscore prefix for internal methods of a React component.
- To keep all the component files consistent, please follow the following pattern:

```
// 1. Imports - Prefer destructuring imports to minimize written code
import React, { PropsWithChildren, useState, useEffect } from "react";

// 2. Types
type ComponentProps = {
  someProperty: string;
};

// 3. Additional variables
const SOME_CONSTANT = "something";

// 4. Component
function Component({ someProperty }: PropsWithChildren<ComponentProps>) {
  // 4.1 Definitions
  const [state, setState] = useState(true);
  const { something } = useSomething();

  // 4.2 Functions
  const handleToggleState = () => {
    setState(!state);
  }

  // 4.3 Effects
  useEffect(() => {
    // ...
  }, []);

  // 4.5 Additional destructuring
  const { property } = something;

  // 4.5. JSX
  return (
      <>
        <div>
          <h2>Lorem ipsum</h2>
          <p>Pellentesque arcu</p>
        </div>

        <p>Lorem ipsum</p>
      </>
  );
}

// 5. Exports
export default Component;
```

- Prefer destructuring properties so it is clear what properties are used in the component:

```
// ❌
const Button = (props) => {
  return <button>{props.text}</button>;
};

// ✅
const Button = (props) => {
  const { text } = props;

  return <button>{text}</button>;
};

// ✅
const Button = ({ text }) => {
  return <button>{text}</button>;
};
```

- Omit the value of the prop when it is explicitly `true`:

```
// ❌
<Form hasPadding={true} withError={true} />

// ✅
<Form hasPadding withError />
```

- Avoid curly braces for string props:

```
// ❌
<Title variant={"h1"} value={"Home page"} />

// ✅
<Title variant="h1" value="Home page" />
```

- Prefer conditional rendering with ternary operator:

```
const { role } = user;

// ❌
if (role === ADMIN) {
  return <AdminUser />;
} else {
  return <NormalUser />;
}

// ✅
return role === ADMIN ? <AdminUser /> : <NormalUser />;
```

- Use constants or enums for string values:

```
// ❌
if (role === 'admin') {
  return <AdminUser />;
}

// ✅
enum Roles {
  admin = 'admin',
  basic = 'basic',
}

if (role === Roles.admin) {
  return <AdminUser />;
}
```

- Prefer declarative programming style:

```
// ❌ imperative: dealing with internals of array iteration
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let sum = 0;

for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}

// ✅ declarative: we don't deal with internals of iteration
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const sum = arr.reduce((acc, v) => acc + v, 0);
```

- Use descriptive variable names:

```
// ❌ Avoid single letter names
const n = 'Max';
// ✅
const name = 'Max';

// ❌ Avoid abbreviations
const sof = 'Sunday';
// ✅
const startOfWeek = 'Sunday';

// ❌ Avoid meaningless names
const foo = false;
// ✅
const appInit = false;
```

- Avoid long list of function arguments:

```
// ❌
function createPerson(firstName, lastName, height, weight, gender) {
  // ...
}

// ✅
function createPerson({ firstName, lastName, height, weight, gender }) {
  // ...
}

// ✅
function createPerson(person) {
  const { firstName, lastName, height, weight, gender } = person;
  // ...
}
```

- Prefer using template literals:

```
// ❌
const userName = user.firstName + " " + user.lastName;

// ✅
const userDetails = `${user.firstName} ${user.lastName}`;
```

- Use React fragments instead of additional html elements to wrap several React elements:

```
// ❌
const ActionButtons = ({ text1, text2 }) => {
  return (
    <div>
      <button>{text1}</button>
      <button>{text2}</button>
    </div>
  );
};

// ✅
const Button = ({ text1, text2 }) => {
  return (
    <>
      <button>{text1}</button>
      <button>{text2}</button>
    </>
  );
};
```

- Separate function from the JSX if it takes more than one line:

```
// ❌
<button
  onClick={() => {
    setState(!state);
    resetForm();
    reloadData();
  }}
/>

// ✅
<button onClick={() => setState(!state)} />

// ✅
const handleButtonClick = () => {
  setState(!state);
  resetForm();
  reloadData();
}

<button onClick={handleButtonClick} />
```
