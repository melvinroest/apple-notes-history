// /usr/bin/osascript -l JavaScript ./main.js

noteDetailsArray = []
app = Application.currentApplication()
app.includeStandardAdditions = true

function convertUrl(notesApp) {
  // Get the selected note's ID and name
  const theNote = notesApp.selection()[0]
  const theNoteID = theNote.id()
  const theNoteName = theNote.name()

  // Process theNoteID to extract the required part
  const theTextItems = theNoteID.split('/')
  const theIDPart = theTextItems[theTextItems.length - 1]
  const theIDPartCharacters = theIDPart.slice(1)

  // Run a shell script to get the real identifier from the Notes database
  /* e.g. /usr/bin/sqlite3 ${HOMEPATH}/Library/Group\ Containers/group.com.apple.notes/NoteStore.sqlite "SELECT ZIDENTIFIER from ZICCLOUDSYNCINGOBJECT WHERE Z_PK = '2627'" */
  const command = `/usr/bin/sqlite3 ${HOMEPATH}/Library/Group\\ Containers/group.com.apple.notes/NoteStore.sqlite "SELECT ZIDENTIFIER from ZICCLOUDSYNCINGOBJECT WHERE Z_PK = '${theIDPartCharacters}'"`
  const theNoteIdentifier = app.doShellScript(command)

  // Construct the note URL
  const theNoteURL = `notes://showNote?identifier=${theNoteIdentifier}`

  // Return the note name and URL
  return theNoteURL
}
  
function getNoteDetails(notesApp) {
  if (notesApp.selection().length > 0) {
    const note = notesApp.selection()[0] // Get the selected note
    const noteID = note.id()
    const noteName = note.name()
    return `${padStringToLength(noteName.slice(0,50), 50)}:    ${convertUrl(notesApp)}`
  }
}

function writeFile(pPathStr, pOutputStr) {
  const nsStr       = $.NSString.alloc.initWithUTF8String(pOutputStr)
  const nsPath      = $(pPathStr).stringByStandardizingPath
  const successBool  = nsStr.writeToFileAtomicallyEncodingError(nsPath, false, $.NSUTF8StringEncoding, null)
  if (!successBool) {
    throw new Error("function writeFile ERROR:\nWrite to File FAILED for:\n" + pPathStr)
  }
  return successBool
}

function padStringToLength(str, length) {
    let padding = '';
    for (let i = str.length; i < length; i++) {
        padding += ' ';
    }
    return str + padding;
}


function run(argv) {
  if (argv.length < 1) {
    console.log('Enter the path of the user')
    return
  }
  if (argv.length > 1) {
    console.log('Too many arguments supplied')
    return
  }
  HOMEPATH = argv[0]
  const notesApp = Application('Notes')
  notesApp.includeStandardAdditions = true
  while (true) {
    const currentNoteDetails = getNoteDetails(notesApp)
    if (noteDetailsArray.length === 0 || noteDetailsArray[noteDetailsArray.length - 1] !== currentNoteDetails) {
      noteDetailsArray.push(currentNoteDetails)

      if (noteDetailsArray.length > 25) noteDetailsArray.shift()
      writeFile(`${HOMEPATH}/Desktop/notesDetails.txt`, noteDetailsArray.join('\n'))
    }
    delay(5)
  }
}

