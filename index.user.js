// ==UserScript==
// @name            Better Twitch Category
// @namespace       https://vdbroek.dev
// @version         1.0.0
// @description     Full sized scroll view when you expand the streamers list on category pages
// @author          Pepijn van den Broek <pepijn@vdbroek.dev>
// @match           https://www.twitch.tv/directory/game/*
// @icon            https://www.google.com/s2/favicons?sz=64&domain=twitch.tv
// @grant           none
// @homepageURL     https://github.com/Pepijn98/better-twitch-category
// @supportURL      https://github.com/Pepijn98/better-twitch-category/issues
// @updateURL       https://github.com/Pepijn98/better-twitch-category/raw/master/index.user.js
// @downloadURL     https://github.com/Pepijn98/better-twitch-category/raw/master/index.user.js
// ==/UserScript==

(function() {
    'use strict';

    let fixedHeight = false;

    let preview = null;
    let isHidden = false;

    new MutationObserver(function() {
        if ((/^http(s)?:\/\/(www\.)?twitch\.tv\/directory\/game\/.*$/ui).test(window.location.href)) {
            const btn = document.querySelector("button[aria-label='Collapse List']");
            if (btn) {
                if (isHidden) return;

                if (!fixedHeight) {
                    const elements = document.getElementsByClassName("Layout-sc-nxg1ff-0 cFLMyz");
                    if (elements.length > 0 && elements[0].childElementCount > 0 && elements[0].childNodes[0].classList.contains("scrollable-area")) {
                        const style = elements[0].getAttribute("style");
                        elements[0].style = (style ? style + " " : "") + "height: calc(100vh - 16.5rem) !important;";
                    }
                }

                const mute = document.querySelector("button[aria-label='Mute']");
                if (mute) {
                    mute.click();
                }

                // Expanded
                const elements = document.getElementsByClassName("Layout-sc-nxg1ff-0 hsKINT");
                if (elements.length > 0) {
                    let hasPlayer = false;
                    let hasInfo = false;

                    preview = elements[0];

                    if (preview.childElementCount === 3) {
                        if (preview.childNodes[0].classList.contains("video-player")) {
                            hasPlayer = true;
                        }

                        if (preview.childNodes[2].classList.contains("switcher-channel-info")) {
                            hasInfo = true;
                        }
                    }

                    if (hasPlayer && hasInfo) {
                        preview.style.display = "none";
                        isHidden = true;
                    }
                }
            } else {
                if (!isHidden) return;

                preview.style.display = null;
                isHidden = false;

                const unmute = document.querySelector("button[aria-label='Unmute']");
                if (unmute) {
                    unmute.click();
                }
            }
        }
    }).observe(document, { childList: true, subtree: true });
})();
