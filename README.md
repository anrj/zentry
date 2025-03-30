<p align="center">
    <img src="https://raw.githubusercontent.com/anrj/zentry/main/extension/assets/zentry-logo.svg" alt="Logo" width="500"/>
</p>

---

<p align="center">
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=node.js&logoColor=white"/></a>
    <a href="https://www.electronjs.org/"><img src="https://img.shields.io/badge/electron.js-47848F.svg?style=for-the-badge&logo=electron&logoColor=white"/></a>
  <a href="https://chromewebstore.google.com/"><img src="https://img.shields.io/badge/chrome%20web%20store-%23000000.svg?style=for-the-badge&logo=chromewebstore&logoColor=white"/></a>
</p>

<p align="center">
  <a href="https://github.com/anrj/zentry/stargazers">
    <img src="https://img.shields.io/github/stars/anrj/zentry?style=social" alt="stars"/>
  </a>
</p>

## What is Zentry?

Zentry is a Free and Open Source desktop application & a browser extension designed to boost your productivity by blocking distracting websites and applications. Take control of your focus, combat procrastination, and make your study or work sessions more efficient.

> Initially a project made during **Explore & Design - Google Developer Groups Kutaisi Hackathon 2025**


## Installation and Local Development

### 1. Clone this repository using

```bash
git clone https://github.com/anrj/zentry.git
```

```bash
cd zentry
```

### 2. Installation

### Basic Pre-Requisites

> The main app is built with [Node.js](https://nodejs.org/) and [Electron.js](https://www.electronjs.org/), so make sure the necessary dependencies are installed.


### Install Node

```
https://nodejs.org/en/download
```

### Install Dependencies

- You need to install the dependencies for the desktop app.

```bash
cd app
npm i
```

### 3. Run the application
> [!WARNING]
> There is a bug in the project that prevents the electron executable build to work as intended. Instead run the project with **npm**  

```bash
cd app
npm start
```

<p align="center">
    <img src="https://raw.githubusercontent.com/anrj/zentry/main/app/src/Assets/images/github/screenshot.png" alt="Logo" width="720"/>
</p>


### 4. Installing the web extension
You have to install the web extension to be able to block web pages and see the motivational messages.
>[!NOTE]  
> The extension is not currently published to the **Chrome web store** as the review process takes upto 3 days, well exceeding the hackathon time window.
> It has to be installed as an unpacked extension.

- Enable Developer Mode through the browser extensions page
 Navigate to `chrome://extensions/` and enable Developer Mode (should be at the top right corner of the page).

- Select `load unpacked` and choose the `extension` directory from the repository.

>[!IMPORTANT]  
> The extension is operated through the desktop app, make sure to refresh it when adding new content filters.

### Showcase

![Demo Video](https://raw.githubusercontent.com/anrj/zentry/main/app/src/Assets/images/github/showcase.gif)

That should be it! *Have a productive study session!* ⭐
