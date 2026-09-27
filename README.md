# Little Life

A standalone daily progress, home reset, dinner planning, and shopping list app.

## Run locally

Open `index.html` directly in a browser, or serve this folder with a local static server:

```powershell
npx.cmd --yes http-server . -p 8001
```

The app stores progress and plans in the browser's local storage.

## Personal Google Sheets sync

The app can keep each person's Little Life data in a private spreadsheet in their own Google Drive. Local storage remains enabled as an offline fallback.

1. In Google Cloud Console, create an OAuth client ID of type **Web application** and configure the OAuth consent screen. Add the app's exact origin to **Authorized JavaScript origins**. For local testing, add `http://localhost:8001` too. If the consent screen is in Testing mode, add each user as a test user or publish the app as required by Google.
2. Enable **Google Sheets API** and **Google Drive API** in the same Cloud project.
3. In the app, open the cloud control, paste the OAuth client ID, and choose **Connect and sync**. Approve the `drive.file` access request. Little Life finds or creates a private `Little Life` spreadsheet in that Google account.
4. When both this device and Google Drive already contain data, choose which copy to keep. The chosen snapshot replaces the other copy.

The OAuth client ID is public configuration, not a client secret; never put a client secret in the app. Access tokens are held in memory and are requested again when reconnecting. Google access uses the `drive.file` scope, limited to files created by this app. Disconnecting removes the app's local link and stops syncing; it does not delete the spreadsheet or revoke Google's grant. Users can revoke that grant in their Google Account permissions.

The old Apps Script URL only appends unauthenticated rows to one shared sheet. It is no longer used for personal sync.

## Publish for your phone

This is a static site and can be hosted free with GitHub Pages:

1. Add these files to a GitHub repository and push them to its default branch.
2. In the repository, open **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the default branch and `/(root)`, then save.
4. Open the Pages URL shown there on your phone over HTTPS. On iPhone, use **Share > Add to Home Screen**. On Android, use the browser menu and choose **Install app** or **Add to Home screen**.

The app shell is cached for offline use after the first successful visit. Your progress and plans remain in that browser's local storage; they are not synced between devices.
