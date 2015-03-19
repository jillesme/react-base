react-base
==============

react-base is a 'getting started' template for React applications. react-base uses some cool technologies such as:

* JSX
* ES6 (with Babel)
* Browserify
* React 13.1

All you need to do is clone this repo, and do `npm install`. react-base uses **Gulp** so I assume you have that installed already. If you don't install it by using:

```
npm install gulp -g
```

After that just run `gulp` and get coding!

### Browserify

Instead of using bower or manually including scripts, we use browserify. If you want include something in your project, you need to install it via npm and include it.

For example: `npm install lodash --save` (to save it as a dependency, rather than dev--dependency).

And then in your `app.jsx`:

```javascript
var _ = require('lodash');

_.map(['awesome', 'cool', 'amazing'], function (describe) { 
	return 'react-base is ' + describe + '!'; 
});
```