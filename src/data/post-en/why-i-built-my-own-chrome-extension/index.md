---
title: Why did I build my own Chrome extension?
slug: why-i-built-my-own-chrome-extension
spoiler: Coding to solve everyday problems
category: programming
date: 30-08-2026
---

![cover](./screenshot-1.png)

These last few weeks I'd been thinking about what side project I could build that would actually add something to my real life. Not just another project deployed on Cloudflare and Firebase, but something tangible for my day to day, something that would make me say: I built this and I actually use it. I didn't want to reinvent the wheel or write my own operating system, just something small and concrete that solved a real problem. That's how I landed on the idea of a minimalist Google Chrome extension that would let me search, pin, mark, close, and move the tabs I have open in the browser.

### Looking for inspiration

Besides being a big fan of Raycast, I'm also a fan of Neovim and its Harpoon 2 plugin, which lets you open files and jump between them quickly and easily. With that idea in mind, plus my need to avoid the mouse when using Chrome, moving between apps, and everything related to my Mac or Arch setup, the concept was clear.

### A minimalist Chrome extension

The first goal was to build something simple, no frills, that solved the problem fast. I built it with React and TypeScript, tested it, and it worked, but it wasn't quite what I wanted. Chrome manages the extension's window and opens it from the toolbar icon, not where I wanted it: centered on the screen. I didn't want the view pinned to a corner, so after some research and a few questions, I found the solution was to spin up a separate window over the browser, with no other chrome around it, like a desktop app. And that's how version 0.0.1 came out.

### The first problems

The first version worked, but there was a lot to polish and rethink. I wanted to give it some style, something familiar, icons, something that looked good. With all that in mind, over a few weeks I went from 0.1 to V1, and that was the first step toward thinking about publishing it officially on the Chrome Web Store.

I'd never published anything before and I was scared to do it. But I went for it: filled out the forms, paid the corresponding fee, and waited for Google's review. And that's how I got to version 1.0.0, now available on the Chrome Web Store.

### From here on

After publishing, I added a few more features: searching through bookmarks (my wife's idea) and relocating tabs within the browser. With version 1.2.1, officially "done" for now, I have 7 users. Not a lot, but I'm proud I built it, and that someone else finds it useful too. It's not a big or ambitious project, but it solves something real for me and for others, and that's what matters.

If you made it this far and want to try it out, it's available on the Chrome Web Store: [Hook Tabs](https://chromewebstore.google.com/detail/hook-tabs/fgjphkmaeoajpoadgdcconamlfapjobp?authuser=0&hl=en).
