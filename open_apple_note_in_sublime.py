import sublime
import sublime_plugin
import os
import subprocess

# Tip: You can open the sublime console in view -> console

class OpenAppleNoteCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        # Get the selected text
        region = self.view.sel()[0]

        if region.empty():
            # Expand left until whitespace or start of file
            while region.begin() > 0 and not self.is_delimiter(self.view.substr(region.begin() - 1)):
                region = sublime.Region(region.begin() - 1, region.end())
    
            # Expand right until whitespace or end of file
            while region.end() < self.view.size() and not self.is_delimiter(self.view.substr(region.end())):
                region = sublime.Region(region.begin(), region.end() + 1)


        selected_text = self.view.substr(region)
        self.open_extension_for_selected_text(selected_text, ["notes://showNote?identifier="])
        
    def is_delimiter(self, char):
        return char.isspace()

    def open_extension_for_selected_text(self, selected_text, extensions):
        extension = next((ext for ext in extensions if ext in selected_text), None)
        if extension in selected_text:
            if extension == 'notes://showNote?identifier=':
                command = f"open -a \"safari\" {selected_text}"
                subprocess.run(command, capture_output=True, text=True, shell=True)

            else:
                sublime.message_dialog("Extension {} for selected text {} not found".format(extension, selected_text))
