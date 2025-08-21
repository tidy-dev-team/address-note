async function createAddressNote(targetFrame: FrameNode): Promise<FrameNode> {
  const noteFrame = figma.createFrame();
  noteFrame.name = "Address Note";

  noteFrame.resize(targetFrame.width, 40);

  noteFrame.x = targetFrame.x;
  noteFrame.y = targetFrame.y - 70;

  noteFrame.fills = [
    {
      type: "SOLID",
      color: { r: 1, g: 0.616, b: 0.208 },
    },
  ];

  const textNode = figma.createText();

  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  textNode.characters = "למסך המקורי";
  textNode.name = "Note Text";

  textNode.fontSize = 16;
  textNode.fills = [
    {
      type: "SOLID",
      color: { r: 0, g: 0, b: 0 },
    },
  ];

  // textNode.textDecoration = "UNDERLINE";

  textNode.textAlignHorizontal = "CENTER";
  textNode.textAlignVertical = "CENTER";

  textNode.x = 0;
  textNode.y = 0;
  textNode.resize(noteFrame.width, noteFrame.height);

  noteFrame.appendChild(textNode);

  const link: HyperlinkTarget = {
    type: "NODE",
    value: targetFrame.id,
  };

  textNode.hyperlink = link;

  if (targetFrame.parent && targetFrame.parent.type !== "DOCUMENT") {
    (targetFrame.parent as ChildrenMixin).appendChild(noteFrame);
  } else {
    figma.currentPage.appendChild(noteFrame);
  }

  return noteFrame;
}

async function main() {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.notify("Please select one or more frames to add address notes to.");
    figma.closePlugin();
    return;
  }

  const createdNotes: FrameNode[] = [];
  let processedCount = 0;

  for (const node of selection) {
    if (node.type === "FRAME") {
      try {
        const note = await createAddressNote(node as FrameNode);
        createdNotes.push(note);
        processedCount++;
      } catch (error) {
        console.error("Error creating address note:", error);
      }
    }
  }

  if (processedCount === 0) {
    figma.notify(
      "No frames were selected. Please select frames to add address notes to."
    );
  } else {
    figma.currentPage.selection = createdNotes;

    if (createdNotes.length > 0) {
      figma.viewport.scrollAndZoomIntoView(createdNotes);
    }

    figma.notify(
      `Created ${processedCount} address note${processedCount > 1 ? "s" : ""}.`
    );
  }

  figma.closePlugin();
}

main();
