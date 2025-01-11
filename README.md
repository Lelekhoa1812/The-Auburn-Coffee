# The-Auburn-Coffee
Website to the Auburn Coffee's menu items and prices.
The cafe locates at Auburn station, VIC 3123.
We are happy to serve Victorian transport commuters as always and everyday, see you guys.

Integrate Firebase to accommodate web-server saving for rating function.
Configs:
Firestore database:
1. Config in test mode

2. Security and Rules:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // This rule allows anyone with your Firestore database reference to view, edit,
    // and delete all data in your Firestore database. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Firestore database will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // all client requests to your Firestore database will be denied until you Update
    // your rules
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2024, 10, 10);
    }
  }
}

3. Web App Configurations:
const firebaseConfig = {

};


Liam, barista staff contribute to this.
Accessible via: https://lelekhoa1812.github.io/The-Auburn-Coffee/
