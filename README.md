# Premium Data Analyst & ML Portfolio Website

A stunning, responsive, dark-themed portfolio website designed specifically for Data Analysts and Machine Learning Engineers. Features an interactive skill matrix radar chart and an in-browser Machine Learning playground demonstrating linear and polynomial regressions in real-time.

## Features
- **Modern Dark Theme**: Rich aesthetics using Glassmorphism design and custom neon grids.
- **Skills Radar Chart**: Visualized using [Chart.js](https://www.chartjs.org/) to showcase core competencies.
- **Interactive ML Playground**: Browser-based linear, quadratic, and cubic regression fitting with real-time $R^2$, MSE, and mathematical equation displays.
- **Responsive Navigation**: Smooth anchors and a collapsible mobile drawer.
- **Dynamic Projects Showcase**: Built-in interactive filters for sorting projects.
- **Contact Form Integration**: Free contact submission mock (ready to connect with Formspree).

---

## How to Deploy to GitHub Pages (for Free `.github.io` domain)

GitHub Pages allows you to host web applications directly from your GitHub repositories for free. You will get a URL like `https://your-username.github.io/repository-name` (or `https://your-username.github.io` if named specifically).

### Step 1: Create a GitHub Account
If you don't have one, go to [GitHub.com](https://github.com) and sign up for free.

### Step 2: Create a New Repository
1. Click the **"+"** icon in the top right and select **New repository**.
2. Name the repository:
   - **For a specific portfolio URL (`https://<username>.github.io`):** Name the repository exactly `<your-github-username>.github.io` (e.g., if your username is `ashfak`, name it `ashfak.github.io`).
   - **For a subdirectory URL (`https://<username>.github.io/portfolio`):** You can name it `portfolio` or anything else.
3. Keep it **Public** (required for free hosting).
4. Do **NOT** initialize it with a README, `.gitignore`, or License (as we already have files).
5. Click **Create repository**.

### Step 3: Push Your Code using Git
Open your command terminal (Command Prompt, PowerShell, or Git Bash) in this project folder and run these commands:

```bash
# Initialize a local Git repository
git init

# Add all files to the staging area
git add.

# Commit your changes
git commit -m "Initial commit: Premium ML and Data Analyst portfolio."

# Rename default branch to main
git branch -M main

# Link your local repository to the GitHub repository you created
# (Replace '<your-github-username>' and '<repo-name>' with your actual GitHub details)
git remote add origin https://github.com/<your-github-username>/<repo-name>.git

# Push your code to GitHub
git push -u origin main
```

*(Note: You will be asked to sign in to your GitHub account during the push command)*

### Step 4: Enable GitHub Pages
If you named your repository `<username>.github.io`, your site is already building! It will be live automatically.

If you named your repository something else (like `portfolio`):
1. Go to your repository page on GitHub.
2. Click on the **Settings** tab (the gear icon on the top menu).
3. On the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - Source: Select **Deploy from a branch**.
   - Branch: Click the dropdown (currently showing "None") and choose **main**.
   - Folder: Keep it as `/ (root)`.
5. Click the **Save** button.

### Step 5: Visit Your Live Site!
After saving, wait 1-2 minutes. GitHub will compile the page. Refresh the page, and you will see a banner at the top of the Pages settings screen saying:

> "Your site is live at **`https://<username>.github.io/<repo-name>/`**"

Click the link to view your live portfolio!

---
