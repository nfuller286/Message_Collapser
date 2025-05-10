// actions.js - Handles message manipulation and UI actions for Message_Collapser

import { getContext } from "../../../extensions.js";

export const arrowClass = 'message-collapser-arrow';
export const collapsedClass = 'message-collapser-message-collapsed';
let chat = getContext().chat

// Function to add collapse/expand arrows to messages
export function addCollapseArrowsToMessages() {
    console.log("Message Collapser: Adding collapse arrows.");
    $('.mes').each(function() {
        const message = $(this);
        if (message.find('.' + arrowClass).length === 0) {
            const arrowElement = $('<span class="' + arrowClass + '" style="cursor: pointer; margin-right: 5px;"><i class="fas fa-chevron-down"></i></span>');
            message.prepend(arrowElement);
        }
    });
}

// Function to remove collapse/expand arrows from messages
export function removeCollapseArrowsFromMessages() {
    console.log("Message Collapser: Removing collapse arrows.");
    $('.' + arrowClass).remove();
}

// Function to collapse message
function collapseMessage(mes_id) {
    const message = $('.mes[mesid="'+mes_id+'"]');

    const messageText = message.find('.mes_text');
    const arrowSpan = message.find('.' + arrowClass);
    const icon = arrowSpan.find('i');

    messageText.hide();
    message.addClass(collapsedClass);
    if (arrowSpan.length && icon.length) {
        icon.removeClass('fa-chevron-down').addClass('fa-chevron-right');
    }
}

// Function to expand message
function expandMessage(mes_id) {
    const message = $('.mes[mesid="'+mes_id+'"]');

    const messageText = message.find('.mes_text');
    const arrowSpan = message.find('.' + arrowClass);
    const icon = arrowSpan.find('i');

    messageText.show();
    message.removeClass(collapsedClass);
    if (arrowSpan.length && icon.length) {
        icon.removeClass('fa-chevron-right').addClass('fa-chevron-down');
    }
}

// Handler for clicking an arrow
export function handleArrowClick(event) {
    const arrowSpan = $(this);
    const icon = arrowSpan.find('i');
    const message = arrowSpan.closest('.mes');
    const messageText = message.find('.mes_text');

    messageText.toggle();
    message.toggleClass(collapsedClass);

    if (messageText.is(':visible')) {
        icon.removeClass('fa-chevron-right').addClass('fa-chevron-down');
    } else {
        icon.removeClass('fa-chevron-down').addClass('fa-chevron-right');
    }
}

export function handleCollapseDisabledClick() {
    let count = 0;
    for (var mes_id = 0; mes_id < chat.length; mes_id++) {
        // the is_system attribute is actually whether the message is included in the prompt, i.e. hidden
        if (chat[mes_id].is_system) {
            collapseMessage(mes_id);
            count++;
        }
    }

    if (count > 0) {
        toastr.success(count + (count === 1 ? " 'hidden' message collapsed." : " 'hidden' messages collapsed."));
    } else {
        toastr.info("No 'hidden' messages found to collapse.");
    }

}

export function handleExpandDisabledClick() {
    let count = 0;
    for (var mes_id = 0; mes_id < chat.length; mes_id++) {
        // the is_system attribute is actually whether the message is included in the prompt, i.e. hidden
        if (chat[mes_id].is_system) {
            expandMessage(mes_id);
            count++;
        }
    }

    if (count > 0) {
        toastr.success(count + (count === 1 ? " 'hidden' message expanded." : " 'hidden' messages expanded."));
    } else {
        toastr.info("No 'hidden' messages found to expand.");
    }
}

export function handleExpandAllClick() {
    console.log("Message Collapser: Expanding all messages.");
    let count = 0;
    $('.mes').each(function() {
        const message = $(this);
        if (message.find('.mes_text').is(':hidden') || message.hasClass(collapsedClass)) {
            const messageText = message.find('.mes_text');
            const arrowSpan = message.find('.' + arrowClass);
            const icon = arrowSpan.find('i');

            messageText.show();
            message.removeClass(collapsedClass);
            if (arrowSpan.length && icon.length) {
                icon.removeClass('fa-chevron-right').addClass('fa-chevron-down');
            }
            count++;
        }
    });
    if (count > 0) {
        toastr.success(count + (count === 1 ? " message expanded." : " messages expanded."));
    } else {
        toastr.info("All messages already expanded or no messages to expand.");
    }
}

export function handleCollapseAllClick() {
    console.log("Message Collapser: Collapsing all messages.");
    let count = 0;
    $('.mes').each(function() {
        const message = $(this);
        if (message.find('.mes_text').is(':visible') || !message.hasClass(collapsedClass)) {
            const messageText = message.find('.mes_text');
            const arrowSpan = message.find('.' + arrowClass);
            const icon = arrowSpan.find('i');

            messageText.hide();
            message.addClass(collapsedClass);
            if (arrowSpan.length && icon.length) {
                icon.removeClass('fa-chevron-down').addClass('fa-chevron-right');
            }
            count++;
        }
    });
    if (count > 0) {
        toastr.success(count + (count === 1 ? " message collapsed." : " messages collapsed."));
    } else {
        toastr.info("All messages already collapsed or no messages to collapse.");
    }
}
