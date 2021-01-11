### Cron Job for SMS HMU (Sunday scaries Messaging Service to Hype Mondays Up! 🎉)

Check out my SMS HMU API Repo: https://github.com/stephjs/sms-hype-mondays-up

Cron Job deployed on [Digital Ocean](https://cloud.digitalocean.com/): Every Monday at 07:30 am send a funny / motivational message (GET request to my SMS HMU API) to all my friends and me.

I used [crontab guru](https://crontab.guru/#30_7_*_*_1) to figure out the correct expression for my desired frequency.

📝 Todos 

- move phone numbers out of .env and into a db
- add a CMS for message management
