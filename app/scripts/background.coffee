storage = localStorage

activate = ->
    chrome.browserAction.setBadgeText {text: ''}
    sendIsActive true

deactivate = ->
    chrome.browserAction.setBadgeText {text: 'Off'}
    sendIsActive false

sendIsActive = (state) ->
    chrome.tabs.query {active: true, currentWindow: true}, (tabs) ->
        chrome.tabs.sendMessage tabs[0].id, {isActive: state}

    storage['loadPattern'] = state

chrome.browserAction.onClicked.addListener (tab) ->
    unless storage['loadPattern'] is 'false' then deactivate() else activate()
