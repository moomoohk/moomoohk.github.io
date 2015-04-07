/**
 * Author: Meshulam Silk (moomoohk@ymail.com)
 */

import "dart:html";
import "dart:math";

List<String> scrollback = [""];
int scrollbackIndex = 0;
InputElement inputField = querySelector("#DemoInput");
TextAreaElement textArea = querySelector("#DemoTextArea");

void main() {
  inputField
      ..onKeyDown.listen((KeyboardEvent event) {
        if (event.keyCode == KeyCode.UP || event.keyCode == KeyCode.DOWN) {
          event.preventDefault();
          if (event.keyCode == KeyCode.UP) scrollbackIndex = min(scrollbackIndex + 1, scrollback.length - 1);
          if (event.keyCode == KeyCode.DOWN) scrollbackIndex = max(scrollbackIndex - 1, 0);
          inputField.value = scrollback[scrollbackIndex];
        }
      })
      ..onKeyUp.listen((KeyboardEvent event) {
        if (KeyCode.isCharacterKey(event.keyCode)) {
          if (scrollbackIndex != 0) scrollbackIndex = 0;
          if (scrollbackIndex == 0) scrollback[0] = inputField.value.trim();
          log("Stash: ${scrollback[0]}");
        }
      })
      ..onKeyPress.listen((KeyboardEvent event) {
        String input = inputField.value.replaceAll(new RegExp("\\s+"), " ");
        if (event.keyCode == KeyCode.ENTER && input.length != 0) {
          scrollback[0] = input;
          int index = scrollback.lastIndexOf(input);
          if (index != 0) scrollback.removeAt(index);
          scrollback.insert(0, "");
          scrollbackIndex = 0;
          inputField.value = "";
          log("Committed: $scrollback");
        }
      });
}

void log(String st) {
  textArea
      ..text += st + "\n"
      ..scrollTop = textArea.scrollHeight;
}
