// main.js
// The main script for the Message Collapser

import { extension_settings, getContext, loadExtensionSettings } from "../../../extensions.js";
import { saveSettingsDebounced } from "../../../../script.js"; // Assuming this path is correct
import { SlashCommandParser } from '../../../slash-commands/SlashCommandParser.js';
import { SlashCommand } from '../../../slash-commands/SlashCommand.js';
import { SlashCommandArgument, ARGUMENT_TYPE } from '../../../slash-commands/SlashCommandArgument.js';

// Import from our new actions.js
import {
    arrowClass,
    addCollapseArrowsToMessages,
    removeCollapseArrowsFromMessages,
    handleArrowClick,
    handleCollapseAllClick,
    handleExpandAllClick,
    handleCollapseDisabledClick,
    handleExpandDisabledClick
} from './actions.js';

const extensionName = "Message_Collapser";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

// Define default settings for the extension
const defaultSettings = {
    isEnabled: false,
};

// Function to get or initialize settings
function getSettings() {
    if (!extension_settings[extensionName]) {
        extension_settings[extensionName] = structuredClone(defaultSettings);
    }
    // Ensure all default keys exist (for updates)
    for (const key in defaultSettings) {
        if (extension_settings[extensionName][key] === undefined) {
            extension_settings[extensionName][key] = defaultSettings[key];
        }
    }
    return extension_settings[extensionName];
}

// Function to save settings
function saveSettings() {
    saveSettingsDebounced();
}

// Function to update the status indicator text in the settings panel
function updateStatusIndicator(isEnabled) {
    const statusSpan = $("#testExtensionStatusIndicator");
    if (statusSpan.length) {
        statusSpan.text(isEnabled ? "Enabled" : "Disabled");
    }
}

// Handler for the Master Enable/Disable toggle
function handleMasterEnableToggleChange(event) {
    const settings = getSettings();
    settings.isEnabled = Boolean($(event.target).prop("checked"));
    saveSettings();
    updateStatusIndicator(settings.isEnabled);
    console.log("Message Collapser is now: " + (settings.isEnabled ? 'Enabled' : 'Disabled'));

    if (settings.isEnabled) {
        addCollapseArrowsToMessages();
    } else {
        removeCollapseArrowsFromMessages();
    }
}

// *** NEW: Callback function for the /fold slash command ***
function handleFoldCommand(namedArgs, ...actionParts) { // Corrected signature
    const settings = getSettings();
    if (!settings.isEnabled) {
        toastr.error("Message Collapser extension is disabled. Enable it in settings to use /fold.");
        return;
    }

    const action = actionParts.join(' ').toLowerCase().trim(); // Use actionParts

    switch (action) {
        case 'up':
            handleCollapseDisabledClick();
            break;
        case 'down':
            handleExpandDisabledClick();
            break;
        case 'up all':
            handleCollapseAllClick();
            break;
        case 'down all':
            handleExpandAllClick();
            break;
        default:
            toastr.warning(`Invalid action for /fold: "${action}". Use 'up', 'down', 'up all', or 'down all'.`);
            break;
    }
}

// Main initialization function
jQuery(async () => {
    try {
        // Load settings UI
        const settingsHtml = await $.get(`${extensionFolderPath}/settings_panel.html`);
        $("#extensions_settings").append(settingsHtml);

        // Load and apply settings
        const settings = getSettings();
        $("#testExtensionMasterEnable").prop("checked", settings.isEnabled);
        updateStatusIndicator(settings.isEnabled);

        // Add arrows on load if enabled
        if (settings.isEnabled) {
            addCollapseArrowsToMessages();
        }

        // Bind Event Handlers for UI
        $("#testExtensionMasterEnable").on("change", handleMasterEnableToggleChange);
        $("#testExtensionCollapseDisabled").on("click", handleCollapseDisabledClick);
        $("#testExtensionExpandDisabled").on("click", handleExpandDisabledClick);
        $("#testExtensionExpandAll").on("click", handleExpandAllClick);
        $("#testExtensionCollapseAll").on('click', handleCollapseAllClick);
        $(document).on('click', '.' + arrowClass, handleArrowClick);

        // *** NEW: Register the /fold slash command ***
        if (typeof SlashCommandParser !== 'undefined' && SlashCommandParser) { // Check if import was successful and object exists
            const foldCommandInstance = SlashCommand.fromProps({
                name: 'fold', // Corrected from 'command' to 'name'
                callback: handleFoldCommand,
                unnamedArgumentList: [
                    SlashCommandArgument.fromProps({ // Using SlashCommandArgument.fromProps
                        description: 'Action: up (collapse hidden), down (expand hidden), up all (collapse all), down all (expand all)',
                        typeList: [ARGUMENT_TYPE.STRING], // Indicates a string is expected
                        isRequired: true, // At least one part of the action is required
                    }),
                ],
                helpString: `
                    <div>
                        Collapses or expands messages based on their type or overall visibility.
                    </div>
                    <div>
                        <strong>Usage:</strong> <code>/fold [action]</code>
                    </div>
                    <div>
                        <strong>Actions:</strong>
                        <ul>
                            <li><code>up</code>: Collapse messages currently marked as hidden or system messages/are disabled from prompt send.</li>
                            <li><code>down</code>: Expand messages currently marked as hidden or system messages/are disabled from prompt send.</li>
                            <li><code>up all</code>: Collapse all messages in the chat.</li>
                            <li><code>down all</code>: Expand all messages in the chat.</li>
                        </ul>
                    </div>
                `.replace(/\s+/g, ' ').trim(), // Optional: to make it a compact single line string if preferred, or keep multi-line for source readability
                // No namedArgumentList needed for /fold
            });
            SlashCommandParser.addCommandObject(foldCommandInstance);
            console.log("Message Collapser: /fold command registered.");
        } else {
            console.error("Message Collapser: Failed to import or access SlashCommandParser. /fold command not registered.");
        }

    } catch (error) {
        console.error("Error loading Message Collapser settings HTML or initializing:", error);
        toastr.error("Failed to load Message Collapser UI. Check console for details.");
    }
});
