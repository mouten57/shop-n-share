#### Shopping List project started at 2pm on Dec 27

[live shopping list](https://shop-n-share.herokuapp.com/)

## To run locally:

- config/keys/dev.js is on gitignore to preserve all of my keys, so you'll need to create one. It looks like this:

```
// config/keys/dev.js
module.exports = {
 googleClientID:
   'YOUR_GOOGLE_CLIENT_ID',
 googleClientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
 mongoURI:
   'YOUR_MONGO_URI',
 cookieKey: 'ANY RANDOM STRING OF NUMBERS',
 redirectDomain: 'https://localhost:3000',
 ioGetPath: 'https://localhost:5000/api/items'
};
```

So, you'll need to create some google oauth20 creds and a mongoDB on mLab. Or just send me a message, I'll hook you up with the dev.js file!

## What's Left:

- [x] full test suite
- [x] update README
- [x] A description of the problem and solution.
- [x] The reasoning behind your technical choices.
- [x] Trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project.

## PROJECT DESCRIPTION

- Create a grocery list web-application that can be shared in real-time by multiple people.

- Imagine you have a 4-person family, and each of you has a smart-phone with the web application running. When you arrive at the grocery store, you split up to shop individually. This allows the groceries to be acquired in the fastest possible way.

- Each person has the same grocery list on their phone. When one of you checks a grocery item off the shared list, it updates on everyone else’s list, preventing anyone from purchasing duplicate items. Similarly, items added to the list on any phone update to the same list.

## SOLUTION

The very first thing I did was try to get an idea of what kind of arhitecture I wanted to use. Since I've been working a lot with React and Node, those seemed like logical choices for me. For my database, I decided to go with mongoDB, although in the future, I might switch it up and try a different database. The reason I chose mongodb with mongoose this time was so I could practice using it more.

So, there were a few challenges on this project!

1.  Authentication:

- For auth, I decided to go with Google OAuth along with Passport, because it handles it pretty much all of the backround work of saving user info. The user logs in with the Google flow, and then I capture their name, nickname, image, and token in a document in my database. This solved the problem of allowing users to log-in from multiple locations. It also saved me from having to deal with improper passwords/email formats/ repeated sign-ups etc.

2. CRUD with React and Mongoose

- This was also pretty challenging, but I spent a day and got it knocked out. The trickiest part was forcing the React side to keep my temporary data while editing a file, but I handled that by calling the Node backend and doing a db query for the Item I was looking for. Then the data got sent, I set the state in React, and handled updated values with an onChange handler. On the submit, the newly updated data was sent back to the backend and from there the mongoose document was updated.

3. Real-time UPDATES!!!

- This one drove me a little crazy :)
- I used socket.io to handle this issue, and the reason I did so was because my only other option was mongoDB change streams, and the more I looked into that, the more confused I became. I DO want to go back in the future and learn how to make 'replica sets' and learn exactly what that means.
- For my socket.io solution, I installed one packet on the server side, one on the client side, and they communicated to eachother. I learned that when something shares a socket, it's like a having a phone conversation, rather than the traditional req/res flow. So my item data gets updated every one second and sent to everyone that's connected to my socket. Pretty cool! This means That everyone will see live updates on their phones or devices.
- I modified my GET 'api/items' call so that it send back an object that looked like {purchased: [], unpurchased:[]}. On the react side, I set up two calls in my App component so that both the purchased items and unpurchased items would be continuously updated. This way I didn't have to splice and push when I wanted to send an item over to the purchased list. Instead, the server side handles it automatically by filtering purchased/unpurchased.
- My original thought for handling real-time data was to use Firebase, because I knew exactly how to trigger React state updates when something in the Firebase db updated. But, like I said before, I'm trying to learn new stuff. So I'm not sure if my solution is ideal, but it works! ..and I learned a little more about socket.io, which seems very popular on npm, so it's probably a good skill to have.

4. Deployment

- For this, I went with good old heroku, and handled pairing my node/react servers by modifying a few settings in index.js and changing the heroku postbuild so that all of the client npm modules would get installed and also calling 'npm build' so create-react-app would build a production version on heroku's server.

5. If I had more time..

   - If I had more time, I would make this thing perfect! But perfect really is a subject and somewhat attainable goal, isn't it?

   Here's what I would do with more time:

   1. At least one of the bonus options. I really like the idea of different groups and being able to invite people or 'share' your list with only certain users. Even just the authentication to have only certain people being able to access the list would be cool.
   2. I saw some other shopping list apps in my research and one idea that stuck out to me was this little side menu that had various options like 'Share List', 'Check All', 'Uncheck All', 'Remove Completed', 'Print List', and 'Delete List'. So, a little side menu would be cool.
   3. Lastly, I think it would be cool to have a little side chat since everything is live-updating already. Like a place where you can type and say 'hey, I just found these sweet sneakers on sale at Adidas' or somewhere to paste a coupon.

## Socket.io update (1/5/18)

Ok, so this probably took me over the week time limit, but I couldn't stop thinking that maybe the way I had my socket.io was not the most efficient way to do things. I was making a call with axios every 1 second, and that was for every connection on the socket.io server. So I figured if I had even 10 people or more, things would get bottle-necked really fast. PLUS my react app was re-rendering every 1 second! So I kept thinking, 'that's not nearly efficient enough!'.

So I did a little research, and trimmed my socket.io so that when an item gets marked as 'purchased', the client will send a little signal to the server-side socket and the server-side socket sends back the item data (this goes to all connected sockets, making real-time updates possible), but this only happens when the client makes a change. So this trimmed it down to one api call per change (purchased to unpurchased or vice-versa) and one render per change! YES!!

Lastly, I noticed that my list wasn't rendering until the data came back. It was pretty fast, but not React state-update fast. So I changed the 'mark purchased' method a little bit so that locally it updates the state without having to wait on a reply from the socket.io call.

Phew, that was a lot. But I think I seriously improved the scalability of my application and learned a lot along the way. Now I feel satisfied :)
