(function() {
  var injectCSS, log, pattern, patterns, waitForElementVisible, _i, _intervals, _len, _ref;

  log = function(text) {
    return console.log("%c" + text, "color: green;");
  };

  injectCSS = function() {
    var el;
    el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('type', 'text/css');
    el.setAttribute('href', chrome.extension.getURL('styles/main.css'));
    return document.head.appendChild(el);
  };

  _intervals = {};

  waitForElementVisible = function(selector, callback) {
    var fn,
      _this = this;
    log("Waiting for " + selector + " to appear");
    fn = function() {
      var $el;
      if (($el = $('body').find(selector)).length) {
        callback($el);
        log("Found " + selector + ".");
        return clearInterval(_intervals[selector]);
      }
    };
    return _intervals[selector] = setInterval(fn, 100);
  };

  patterns = {
    hint: function() {
      return waitForElementVisible('#gbzc .gbt:nth-child(8)', function($target) {
        $target.addClass('hint--bottom hint--always hint--success').attr('data-hint', 'Google Groups just got better. Click to check it out.');
        return $('body').on('click', function() {
          return $target.removeClass('hint--always');
        });
      });
    },
    banner: function() {
      var $banner;
      $banner = $('<div>');
      $banner.attr('id', 'appcues-banner').html("<strong>Google Groups</strong> just got a whole lot better. <a>Take the tour</a> or <a class='close'>skip this.</a>");
      return waitForElementVisible('.nH.w-asV.aiw', function($target) {
        $target.after($banner);
        return $banner.on('click', '.close', function() {
          return $banner.remove();
        });
      });
    },
    blocker: function() {
      var $mask, $msg, setMsgPosition;
      $mask = $('<div>');
      $mask.attr('id', 'appcues-compose-mask');
      $msg = $('<div>');
      $msg.attr('id', 'appcues-compose-message');
      $msg.html("<div class='compose-blocker-content'>\n    <h2>Here's how it works</h2>\n    <p>Now, all messages are delivered through our new NSA servers. <a>Learn more...</a></p>\n    <div class='T-I-atl T-I appcues-button'>Got it</div>\n</div>");
      setMsgPosition = function($msg, $target) {
        var offset;
        offset = $target.offset();
        return $msg.css({
          top: offset.top + 50,
          left: offset.left - 320
        });
      };
      return waitForElementVisible('.signals-nc-email[role=dialog]', function($target) {
        $('body').append($mask);
        $('body').append($msg);
        $msg.on('click', '.appcues-button', function() {
          $mask.remove();
          return $msg.remove();
        });
        window.setInterval(function() {
          return setMsgPosition($msg, $target);
        }, 400);
        return setMsgPosition($msg, $target);
      });
    }
  };

  _ref = ['blocker'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    pattern = _ref[_i];
    if (typeof patterns[pattern] === "function") {
      patterns[pattern]();
    }
  }

}).call(this);
