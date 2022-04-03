# David Luu's Personal Portfolio Website

[www.davidluu.me](https://www.davidluu.me/), built with [Gatsby](https://www.gatsbyjs.com/) and hosted on [Vercel](https://vercel.com/).

## 🛠 Installation & Set Up

1. Install the version of Node.js used to develop the project using [NVM](https://github.com/nvm-sh/nvm)

```
nvm install
```

2. Install dependencies

```
npm install
```

3. Copy `.env.example` to `.env` and fill out the fields

```
cp .env.example .env
```

4. Run the setup script

```
npm run setup
```

5. Start the development server

```
npm start
```

## 👓 Technology Choices

### Dark Mode Implementation

The site's dark mode implementation is heavily inspired by [Dan Abramov's implementation for his personal blog](https://github.com/gaearon/overreacted.io/commit/4ef0b123c76a3836fe6db67c500255c241c490f8).

The original implementation of Dark mode was built using React context and Emotion themes. This caused an issue where a user who visits the site and renders the app using the theme that isn't the default for the site (light mode) would experience FOUC each time they refreshed the page thereafter because the statically served HTML that was rendered at build time using the default theme would be rendered, then quickly picked up by the Gatsby/React JavaScript and changed to the correct theme. To solve this problem, I employed the same technique that Dan did on his blog by implementing the following components:

1) Define theme-variant CSS using CSS custom properties (I did it using Emotion global properties instead of CSS, but it works the same way because Emotion global CSS is included in the built HTML files).
2) Implement a small script in the compiled HTML code using the [Gatsby html.js "api"](https://www.gatsbyjs.com/docs/custom-html/) that defines a minimal theme get/set/store API, and (most importantly) sets a class corresponding to the user saved theme *before* the browser starts to paint the page so the user immediately sees the variant that they prefer through OS settings or previous visits to the website.

### Form Handling

Form submission handling is achieved through [Formspree](https://formspree.io/). The form configuration is checked into the repo in [formspree.json](https://github.com/davidcluu/davidluu.me/blob/master/formspree.json), and is automatically deployed as part of the CI/CD pipeline using the [Formspree CLI](https://help.formspree.io/hc/en-us/articles/360053819114-The-Formspree-CLI).

The form on the website is built using a combination of [Formik](https://formik.org/) (primarily for state management and validation) and the [Formspree React library](https://help.formspree.io/hc/en-us/articles/360055613373-The-Formspree-React-library).

The implemented solution requires two environment variables to be present - `FORMSPREE_DEPLOY_KEY`, used to deploy the form, and `FORMSPREE_PROJECT_ID`, used to submit to the deployed form.

## TODOs 

* (large) Make website mobile friendly
  * Navbar
  * Landing animation image size too large
* (small/medium) Navbar improvements
  * Clicking on sublinks (e.g. "About", "Contact") when not on the same page should transition the page and start a scroll to the target section
  * Sublinks should be highlighted in some way when they are in scroll view
* (medium) Clean up codebase
  * Standardize naming of theme variables (specifically, inconsistencies between using `color` and `background-color` interchangably)
  * Push hardcoded CSS values to global theme config to make future changes easier
