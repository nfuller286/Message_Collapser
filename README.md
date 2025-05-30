# Message Collapser Extension for SillyTavern
It's my first extension I've successfully created. Hope it helps others. I created it for chats where I had disabled messages, that were cluttering things up. Below is the AI write up that tries to make it sound cooler than it is :-)

This extension enhances your SillyTavern experience by allowing you to collapse and expand chat messages. It helps manage long conversations, declutter the interface, and focus on the most relevant parts of your chat history.

## Features

*   **Individual Message Toggling**: Click an arrow icon next to any message to collapse or expand its content.
*   **Global Actions**:
    *   **Collapse All**: Collapse all messages in the current chat.
    *   **Expand All**: Expand all previously collapsed messages.
*   **Hidden Message Management**:
    *   **Collapse Hidden**: Specifically collapse messages that have been marked as 'hidden' (soft-deleted, typically indicated by an eye-slash icon).
    *   **Expand Hidden**: Expand all 'hidden' messages.
*   **Master Toggle**: Easily enable or disable the entire extension's functionality via its settings panel.
*   **Visual Indicators**: Clear arrow icons (chevron-down for expanded, chevron-right for collapsed) indicate the state of messages.

## Installation and Usage

### Installation

1.  **Using SillyTavern's Extension Installer (Recommended)**:
    *   Navigate to the extensions menu in SillyTavern.
    *   Use the option to install an extension from a URL.
    *   Provide the repository URL: `https://github.com/nfuller286/Message_Collapser` (once published).
2.  **Manual Installation**:
    *   Download the `Message_Collapser` folder.
    *   Place it into your `/SillyTavern/public/extensions/` or `/SillyTavern/extensions/` directory (refer to your SillyTavern version's documentation for the correct path).
    *   Restart SillyTavern if it was running.

### Usage

1.  After installation, ensure the "Message Collapser" extension is enabled in SillyTavern's extensions settings.
2.  **Individual Messages**:
    *   Hover over a message. A small arrow icon will appear (by default, prepended to the message).
    *   Click the arrow to collapse the message text. Click again to expand.
3.  **Global & Hidden Message Actions**:
    *   These actions can be performed in two ways:
        *   **Via Settings Panel**: Open the "Message Collapser" settings panel (usually accessible from the extensions quick access menu or the main extensions page in SillyTavern). Use the "Collapse All", "Expand All", "Collapse Hidden", and "Expand Hidden" buttons.
        *   **Via Slash Command**: Type `/fold` followed by an action directly into the chat input.
            *   `/fold up`: Collapses messages currently marked as hidden or system messages.
            *   `/fold down`: Expands messages currently marked as hidden or system messages.
            *   `/fold up all`: Collapses all messages in the chat.
            *   `/fold down all`: Expands all messages in the chat.
4.  **Master Toggle**:
    *   A master "Enable Message Collapser" toggle is available in the settings panel to turn the entire extension on or off.

## Prerequisites

*   Compatible with recent versions of SillyTavern that support the current extension API. (Please update if a specific ST version is required by the user).

## Licensing
* I don't care, use it however you want. 
