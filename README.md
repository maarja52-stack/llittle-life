# Little Life

A standalone daily progress, home reset, dinner planning, and shopping list app.

## Run locally

Open `index.html` directly in a browser, or serve this folder with a local static server:

```powershell
npx.cmd --yes http-server . -p 8001
```

The app stores progress and plans in the browser's local storage.

## Google Sheets backup

The app can optionally append full-state snapshots to the spreadsheet attached to the Apps Script deployment above. Create a sheet tab named `Little Life` (or enter another existing tab name in the backup settings), then enable **Google Sheets backup** from the cloud button in the app header. The first row stores a timestamp and the second cell stores the snapshot JSON. Automatic backups are debounced after app changes.

The provided Apps Script has no authentication and its GET handler only reports health. Backups are opt-in and require acknowledging that anyone with the deployment URL can append rows. The current script is append-only: it does not restore snapshots or sync data between devices. Local browser storage remains authoritative.

## Publish for your phone

This is a static site and can be hosted free with GitHub Pages:

1. Add these files to a GitHub repository and push them to its default branch.
2. In the repository, open **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the default branch and `/(root)`, then save.
4. Open the Pages URL shown there on your phone over HTTPS. On iPhone, use **Share > Add to Home Screen**. On Android, use the browser menu and choose **Install app** or **Add to Home screen**.

The app shell is cached for offline use after the first successful visit. Your progress and plans remain in that browser's local storage; they are not synced between devices.
