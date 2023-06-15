# Developer Build Documentation

For more in depth documentation of all functions/classes in the project, check out the documentation repo available here: [repo](https://github.com/cse110-sp23-group16/cse110-sp23-group16-docs) or the live docs link here: [live link](https://cse110-sp23-group16.github.io/cse110-sp23-group16-docs/)

---

## Front End

The front end website does not use any frameworks on the production side, and as such simply cloning the project and routing the html pages is sufficient.

- `/source/pages` contains files for displaying pages and analytics session handler
- `/source/assets` contains all assets for the client side site
- `/source/tests` contains all of the testing suites for the client side site

---

## Back End (Analytics)

The back end website is more rigorous when it comes to building. It comprises of 2 components, the database and the REST api. The client side sends their current analytics session state via POST request to the REST api. From there the REST api writes it to a document in the database, where it can later be analyzed with future scripts (currently unwritten).

## Database

For our analytics we decided to use NoSQL with mongodb, and host it on atlas cluster. For workspace access please contact one of the repository administrators. We currently have 3 collections, "Sessions" which is our live collection for analytics tracking "DemoSessions" which is used for demonstrating analytics, and "TestErrors" which is used for exploration.

## REST Api

The API uses nodejs as a core. The source code for it can be found under `/backend/index.mjs`. For live digital ocean droplet access to the nodejs server, please contact one of the repository administrators. To setup your own instance of the server, begin by creating up a server (works on linux 20.04) and setup node. If enabling a firewall, ensure that port 4000 is left open. From there npm install the packages in `/backend/package.json` with:

`npm install`

Finally, using any general process manager (we currently use pm2 for longterm, or nodemon for short term) start the server by running `/backend/index.mjs`. Note: If you would like to send calls from the website located in `/source/pages`, update the analytics link in `/source/pages/analyticsmanager.js` to `<your server's ip address>:4000/analytics`.

## Security

Many browsers will not allow you to send http requests, or requests to naked ip addresses. Additionally sending unsecured http requests with user data is dangerous to users and testers. As such you may need to additionally purchase a domain (which can be done from namecheap), and set up SSL certificates from a certification agency such as let's encrypt. You will need to also setup DNS to connect your domain to your server. General documentation for these steps can be found online, or at their respective sites.

From there the analytics link in `/source/pages/analyticsmanager.js` can be updated to `https://<your domain>:4000/analytics`.
