# Address Note - Figma Plugin

A simple Figma plugin that creates navigation notes above selected frames.

## What it does

This plugin creates orange address notes containing the Hebrew text "למסך המקורי" (meaning "to the original screen") above selected frames. Each note:

- Is positioned 70px above the selected frame
- Has the same width as the target frame
- Features an orange background (#FF9D35) with black text
- Contains a clickable link that navigates back to the original frame

## How to use

1. Select one or more frames in your Figma document
2. Run the "Address note" plugin from the Plugins menu
3. The plugin will create address notes above each selected frame
4. Click on any note to navigate to its corresponding frame

## Development

This plugin is built with TypeScript and requires Node.js and npm.

### Setup

1. Install Node.js from https://nodejs.org/
2. Install TypeScript globally: `npm install -g typescript`
3. Install plugin dependencies: `npm install`

### Building

To compile the TypeScript code to JavaScript:

```bash
npm run build
```

Or for development with auto-compilation:

```bash
npm run watch
```

### File Structure

- `code.ts` - Main plugin logic
- `code.js` - Compiled JavaScript (generated)
- `manifest.json` - Plugin configuration
- `package.json` - Node.js dependencies and scripts

## Requirements

- Figma Desktop or Web
- Frames must be selected before running the plugin
- Inter font family (automatically loaded by the plugin)
