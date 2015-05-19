
##Challenge:
Create a mobile web app that allows you create, edit, and view short notes. Notes are just small textual items, like to-do lists.
- Notes should be stored using browser local storage
- The app should be usable on a standard mobile browser

##Frameworks/Libraries:
- jQuery

##Notes:
- I went with an Model View Controller design with pure JS, using jQuery for the selectors.

- The program creates and saves note objects, with the text saved in the 'notes' key and an id saved in an 'id' key. The objects are saved into the cache, and grabbed and translated into an array of said objects on page load.

- If there are no note objects, then the notes array is declared as empty.

- After each create, update, or deletion, the program saves the notes array into local storage.

- The note items have id's, with the most recent id being grabbed from local storage. This ensures a unique id for all notes. When a new note is made, the most recent id is incremented up.

- All notes are rendered on page load, by prepending all note items into HTML elements.
