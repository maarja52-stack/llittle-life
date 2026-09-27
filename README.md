# Little Life

A standalone daily progress, home reset, dinner planning, and shopping list app.

## Run locally

Open `index.html` directly in a browser, or serve this folder with a local static server:

```powershell
npx.cmd --yes http-server . -p 8001
```

The app stores progress and plans in the browser's local storage.

## Publish for your phone

This is a static site and can be hosted free with GitHub Pages:

1. Add these files to a GitHub repository and push them to its default branch.
2. In the repository, open **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the default branch and `/(root)`, then save.
4. Open the Pages URL shown there on your phone over HTTPS. On iPhone, use **Share > Add to Home Screen**. On Android, use the browser menu and choose **Install app** or **Add to Home screen**.

The app shell is cached for offline use after the first successful visit. Your progress and plans remain in that browser's local storage; they are not synced between devices.
