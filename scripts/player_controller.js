//
// Executioner
// Sends the functions to be executed in the tabs context.
//
function executioner(player_commands) {
  try {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs[0]) {
        browser.scripting.executeScript({
          target: {
            tabId: tabs[0].id,
            allFrames: true,
          },
          func: player_commands,
          injectImmediately: true,
          world: "MAIN",
        });
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
// =================================================

//
// Player Controls
//
function toggle_play() {
  try {
    if (typeof player === "undefined") {
      return;
    }

    var playing = player.timelineManager._activeTimeline._playing;
    if (playing) {
      player.timelineManager.pauseActiveTimeline();
    } else {
      player.timelineManager.playActiveTimeline();
    }
  } catch (e) {
    console.error("IEEE Player Control Extension error: ", e.message);
  }
}

function seek_back() {
  try {
    if (typeof player === "undefined") {
      return;
    }
    var was_playing = player.timelineManager._activeTimeline._playing;
    if (was_playing) {
      player.timelineManager.pauseActiveTimeline();
    }

    var seek = 0.075;
    var current =
      player.timelineManager.valueOf()._activeTimeline._pausedTime /
      player.timelineManager.valueOf()._activeTimeline.duration;
    var pos = Math.max(0, current - seek);
    player.progressBar.onDragUpdate(pos);

    if (was_playing) {
      player.timelineManager.playActiveTimeline();
    }
  } catch (e) {
    console.error("IEEE Player Control Extension error: ", e.message);
  }
}

function seek_forward() {
  try {
    if (typeof player === "undefined") {
      return;
    }
    var was_playing = player.timelineManager._activeTimeline._playing;
    if (was_playing) {
      player.timelineManager.pauseActiveTimeline();
    }

    var seek = 0.05;
    var current =
      player.timelineManager.valueOf()._activeTimeline._pausedTime /
      player.timelineManager.valueOf()._activeTimeline.duration;
    var pos = Math.min(current + seek, 1);
    player.progressBar.onDragUpdate(pos);

    if (was_playing) {
      player.timelineManager.playActiveTimeline();
    }
  } catch (e) {
    console.error("IEEE Player Control Extension error: ", e.message);
  }
}
// =================================================

//
// Listen for commands from keys
//

browser.commands.onCommand.addListener((command) => {
  if (command === "toggle_play_pause") {
    executioner(toggle_play);
    console.log("Sent play command to tab");
  }

  if (command === "seek_backwards") {
    executioner(seek_back);
    console.log("Sent seek_backwards to tab");
  }

  if (command === "seek_forward") {
    executioner(seek_forward);
    console.log("Sent play seek_forwards to tab");
  }
});
// =================================================







/////// Notes
// - Sending the functions through browser.scripting.executeScript and into the tab makes them lose their bound parameters n such.
//   See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/executeScript#func
//
// - Keys allowed in the manifest: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands
//
