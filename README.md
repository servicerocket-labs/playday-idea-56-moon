## Confluence page tree to Miro board diagram  AKA (CPTM)
[IDEA-56](https://rocketeers.atlassian.net/jira/polaris/projects/IDEA/ideas/view/2519488?selectedIssue=IDEA-56&atlOrigin=eyJpIjoiY2U1MGEyNDFiMzE0NGQ1MTgwMjE2YjdmMTE4NGMxYzYiLCJwIjoiaiJ9)

## Getting Ready

1. [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io) are required.
2. This app is using [MongoDB](https://www.mongodb.com/docs/manual/installation/) 
and [here to install to docker](https://www.mongodb.com/docs/v7.0/tutorial/install-mongodb-community-with-docker/)


## Getting Started

1. [Sign in](https://miro.com/login/) to Miro, and then create a
   [Developer team](https://developers.miro.com/docs/create-a-developer-team)
   under your user account.

2. [Create an app in Miro](https://developers.miro.com/docs/build-your-first-hello-world-app#step-2-create-your-app-in-miro).

- Click the **Create new app** button.
- On the **Create new app** modal, give your app a name, assign it to your
  Developer team, and then click **Create**.

3. Configure the app:

- In your account profile, go to **Your apps**, and then select the app you just
  created to access its configuration page.
- On the app configuration page, go to **App Credentials**, and copy the app
  **Client ID** and **Client secret** values: you'll need to enter these values
  in step 4 below.
- Go to **App URL** and enter the following URL: `http://localhost:3000`
- Go to **Redirect URI for OAuth2.0**, and enter the following redirect URL:
  `http://localhost:3000/api/redirect/`
- Click **Options**. \
  From the drop-down menu select **Use this URI for SDK authorization**.
- Lastly, go to **Permissions**, and select the following permissions:
  - `board:read`
  - `board:write`

4. Open the [`.env`](.env) file, and enter the app client ID and client secret
   values that you saved at the beginning of step 3 above.

5. [Sign in](https://developer.atlassian.com/) to Atlassian developer console. and create an OAuth 2.0 integration.
![Alt create OAuth 2.0 integration](src/assets/Screenshot%202023-09-25%20at%2011.05.47.png)

6. Go to **Permissions**, and grant confluence permissions as needed:
![Alt OAth 2.0 App Permission](src/assets/Screenshot%202023-09-25%20at%2011.07.49.png)

7. Go to **Authorization**, and configure your OAuth app
![Alt OAth 2.0 App Authorization](src/assets/Screenshot%202023-09-25%20at%2011.08.01.png)
And
![Alt OAth 2.0 App Authorization config page](src/assets/Screenshot%202023-09-25%20at%2011.08.14.png)

8. Go to **Settings**, and collect your OAuth app `client ID` and `secret`
![Alt OAth 2.0 App Settings](src/assets/Screenshot%202023-09-25%20at%2011.08.28.png)

9. Run `pnpm start` to start developing.


