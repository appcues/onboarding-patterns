log = (text) ->
    console.log "%c#{text}", "color: green;"

injectCSS = ->
    el = document.createElement('link')
    el.setAttribute('rel', 'stylesheet')
    el.setAttribute('type', 'text/css')
    el.setAttribute('href', chrome.extension.getURL('styles/main.css'))

    document.head.appendChild el

_intervals = {}
waitForElementVisible = (selector, callback) ->
    log "Waiting for #{selector} to appear"

    fn = =>
        if ($el = $('body').find(selector)).length
            callback $el
            log "Found #{selector}."
            clearInterval _intervals[selector]

    _intervals[selector] = setInterval fn, 100

patterns =
    hint: ->
        waitForElementVisible '#gbzc .gbt:nth-child(8)', ($target) ->
            $target.addClass('hint--bottom hint--always hint--success')
                .attr('data-hint', 'Google Groups just got better. Click to check it out.')

            $('body').on 'click', ->
                $target.removeClass 'hint--always'

    banner: ->
        $banner = $('<div>')
        $banner
            .attr('id', 'appcues-banner')
            .html("""<strong>Google Groups</strong> just got a whole lot better. <a>Take the tour</a> or <a class='close'>skip this.</a>""")

        waitForElementVisible '.nH.w-asV.aiw', ($target) ->
            $target.after($banner)
            $banner.on 'click', '.close', ->
                $banner.remove()

    blocker: ->
        $mask = $('<div>')
        $mask.attr('id', 'appcues-compose-mask')
        $msg = $('<div>')
        $msg.attr('id', 'appcues-compose-message')
        $msg.html("""
            <div class='compose-blocker-content'>
                <h2>Here's how it works</h2>
                <p>Now, all messages are delivered through our new NSA servers. <a>Learn more...</a></p>
                <div class='T-I-atl T-I appcues-button'>Got it</div>
            </div>
        """)

        setMsgPosition = ($msg, $target) ->
            offset = $target.offset()
            $msg.css
                top: offset.top + 50
                left: offset.left - 320

        waitForElementVisible '.signals-nc-email[role=dialog]', ($target) ->
            $('body').append $mask
            $('body').append $msg
            $msg.on 'click', '.appcues-button', ->
                $mask.remove()
                $msg.remove()

            window.setInterval ->
                setMsgPosition($msg, $target)
            , 400

            setMsgPosition $msg, $target


for pattern in ['blocker']
    patterns[pattern]?()
