(function() {
  var activate, deactivate, sendIsActive, storage;

  storage = localStorage;

  activate = function() {
    chrome.browserAction.setBadgeText({
      text: ''
    });
    return sendIsActive(true);
  };

  deactivate = function() {
    chrome.browserAction.setBadgeText({
      text: 'Off'
    });
    return sendIsActive(false);
  };

  sendIsActive = function(state) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      return chrome.tabs.sendMessage(tabs[0].id, {
        isActive: state
      });
    });
    return storage['loadPattern'] = state;
  };

  chrome.browserAction.onClicked.addListener(function(tab) {
    if (storage['loadPattern'] !== 'false') {
      return deactivate();
    } else {
      return activate();
    }
  });

}).call(this);
