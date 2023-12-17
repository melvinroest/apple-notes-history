README.md

# Apple Notes History

A simple JavaScript program run via JavaScript for Automation (JXA) to show the last 25 Apple Notes you've been visiting. 

## Why?

Apple Notes doesn't have a back button! This was the quickest way to hack a back button into Apple Notes for MacOS.

## Running the program
Open up your terminal, go to the folder where everything is at and do:
```sh
/usr/bin/osascript -l JavaScript ./main.js "/Users/myusername"
```

## Installing Sublime Plugin to open Apple Notes URLs
Example URL: `notes://showNote?identifier=F9723C0B-CDB6-4F4E-B33C-C4CF1F949C8C`

When I open up Sublime Text, then I can `option+click` it and it will open up Safari, which will ask to open up the note.

I didn't test the Sublime extension fully as I had to copy/paste it from a bigger plugin that I have for personal use. `main.js` is tested though and that is definitely working

My Sublime Text extension is at:
```
/Users/myusername/Library/Application Support/Sublime Text/Packages/User/open_apple_note_in_sublime.py
```

My mousemap at:
```
/Users/myusername/Library/Application Support/Sublime Text/Packages/User/Default (OSX).sublime-mousemap
```
