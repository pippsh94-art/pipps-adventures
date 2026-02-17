# 3D Printing with Mac Mini — Setup Guide

> Connecting a 3D printer to your Mac mini so Clawdad can design models and send them to print.

---

## Table of Contents

1. [The Big Picture — How This Works](#the-big-picture)
2. [Recommended Printers](#recommended-printers)
3. [Slicer Software (Mac-Compatible)](#slicer-software)
4. [3D Modeling / Design Software](#3d-modeling-software)
5. [The AI-to-Print Pipeline — How I Can Help](#the-ai-pipeline)
6. [Remote Printing & Monitoring](#remote-printing)
7. [Filament & Materials Guide](#materials)
8. [What We Could Make](#project-ideas)
9. [Recommended Setup](#recommended-setup)
10. [Budget Breakdown](#budget)

---

## 1. The Big Picture

Here's the workflow from idea to physical object:

```
You tell me what you want
        ↓
I generate a 3D model (OpenSCAD code or STL file)
        ↓
Slice it (convert 3D model to printer instructions — G-code)
        ↓
Send to printer (USB, Wi-Fi, or SD card)
        ↓
Printer makes the thing 🎉
```

The Mac mini is perfect for this — it stays on 24/7, has plenty of power for 3D modeling, and can run the printer directly via USB or control it over your network.

---

## 2. Recommended Printers

### Best Overall: Bambu Lab P1S

| Spec | Detail |
|------|--------|
| **Price** | ~$600 (combo with AMS) |
| **Build Volume** | 256 × 256 × 256 mm (10" × 10" × 10") |
| **Print Speed** | Up to 500 mm/s — extremely fast |
| **Connectivity** | Wi-Fi, USB, SD card, LAN |
| **Mac Compatible** | ✅ Bambu Studio (native macOS app, Apple Silicon) |
| **Auto-Leveling** | ✅ Fully automatic |
| **Enclosed** | ✅ Yes — better print quality, quieter |
| **Camera** | ✅ Built-in — monitor prints remotely |
| **Multi-Color** | ✅ With AMS (Automatic Material System) — print up to 4 colors/materials |
| **Why This One** | Best plug-and-play experience. Minimal tinkering. Incredible print quality out of the box. The "it just works" of 3D printers. |

### Runner-Up: Bambu Lab A1 Mini

| Spec | Detail |
|------|--------|
| **Price** | ~$200 ($300 with AMS Lite) |
| **Build Volume** | 180 × 180 × 180 mm (7" × 7" × 7") |
| **Print Speed** | Up to 500 mm/s |
| **Connectivity** | Wi-Fi, USB, SD card |
| **Mac Compatible** | ✅ Bambu Studio |
| **Auto-Leveling** | ✅ |
| **Enclosed** | ❌ Open frame |
| **Camera** | ✅ Built-in |
| **Why This One** | Great entry point. Smaller build volume but same speed and quality. Perfect if you want to test the waters. |

### Best for Detail: Bambu Lab A1 or Prusa MK4S

**Bambu Lab A1** (~$400)
- Full-size build volume (256 × 256 × 256 mm)
- Open frame (not enclosed)
- Great all-arounder

**Prusa MK4S** (~$600 kit, ~$800 assembled)
- The industry workhorse — rock-solid reliability
- Massive community and support
- Open-source (you can modify everything)
- PrusaSlicer is one of the best slicers and is Mac-native
- Slightly slower than Bambu but extremely reliable

### Best for High Detail / Miniatures: Elegoo Saturn 4 Ultra (Resin)

| Spec | Detail |
|------|--------|
| **Price** | ~$300 |
| **Technology** | MSLA (resin, UV-cured) |
| **Resolution** | 7K — incredibly detailed |
| **Why** | If you want tiny detailed parts, figurines, or jewelry-quality prints. Resin gives 10x the detail of FDM. |
| **Downside** | Messy (liquid resin), requires post-processing (washing + curing), smells (needs ventilation). Not as beginner-friendly. |

### Comparison Table

| Printer | Price | Build Size | Speed | Enclosed | Best For |
|---------|-------|-----------|-------|----------|----------|
| **Bambu Lab A1 Mini** | $200 | 7" cube | Fast | No | Starter / small projects |
| **Bambu Lab A1** | $400 | 10" cube | Fast | No | All-around, great value |
| **Bambu Lab P1S** | $600 | 10" cube | Fast | Yes | Best overall — quiet, reliable, enclosed |
| **Bambu Lab X1C** | $1,100 | 10" cube | Fast | Yes | Premium — carbon fiber capable |
| **Prusa MK4S** | $600–$800 | 10" × 8.3" × 8.6" | Moderate | No | Reliability, open-source, huge community |
| **Elegoo Saturn 4** | $300 | Smaller | Slow | Yes | Ultra-fine detail, miniatures |

### My Pick for You: **Bambu Lab P1S Combo ($600)**

Why:
- Enclosed = quieter and better prints (important if it's near the Mac mini)
- Wi-Fi = I can potentially send prints to it directly from the Mac mini
- Camera = you can watch prints from anywhere
- AMS = multi-color capability for fun projects
- Mac software is polished and native
- Minimal tinkering — you want to make things, not debug a printer

---

## 3. Slicer Software (Mac-Compatible)

The slicer converts your 3D model (STL/3MF file) into G-code instructions the printer understands.

| Software | Mac Support | Printer | Cost | Notes |
|----------|-------------|---------|------|-------|
| **Bambu Studio** | ✅ Native (Apple Silicon) | Bambu printers | Free | Best for Bambu printers. Sends directly via Wi-Fi. |
| **PrusaSlicer** | ✅ Native | Any FDM printer | Free | Excellent, open-source, works with any printer |
| **OrcaSlicer** | ✅ Native | Any FDM printer | Free | Fork of PrusaSlicer/Bambu Studio. Power-user features. Community favorite. |
| **Cura** | ✅ Native | Any FDM printer | Free | UltiMaker's slicer. Huge preset library. |
| **ChiTuBox** | ✅ Native | Resin printers | Free/Pro | For resin printers (Elegoo, etc.) |

**For a Bambu printer:** Use Bambu Studio. It integrates perfectly — model preview, slicing, and sending to printer all in one app.

---

## 4. 3D Modeling / Design Software

This is where we design the actual objects. Here's what runs on Mac and what I can work with:

### What I Can Generate Directly

| Tool | How I Use It | Mac Support | Cost |
|------|-------------|-------------|------|
| **OpenSCAD** | ✅ I write code → it generates 3D models. Parametric design. Perfect for mechanical parts, enclosures, brackets, functional items. | ✅ Native | Free |
| **CadQuery / Build123d** | ✅ Python-based CAD. I write Python scripts → generates precise 3D models. More powerful than OpenSCAD. | ✅ (Python) | Free |
| **Blender (scripted)** | ✅ I can write Blender Python scripts for organic/artistic shapes | ✅ Native | Free |
| **FreeCAD** | ✅ I can generate FreeCAD macros | ✅ Native | Free |

### Interactive Design Tools (You Use)

| Tool | Best For | Mac Support | Cost |
|------|---------|-------------|------|
| **Tinkercad** | Beginners — drag and drop shapes in a browser | ✅ Web-based | Free |
| **Fusion 360** | Serious CAD — mechanical parts, assemblies | ✅ Native | Free for personal use |
| **Blender** | Artistic/organic shapes, characters, sculptures | ✅ Native | Free |
| **Shapr3D** | iPad/Mac CAD — very intuitive | ✅ Native | $25/mo or $300/year |
| **OnShape** | Professional CAD in the browser | ✅ Web-based | Free for personal |

### The Killer Combo: OpenSCAD + Me

Here's why this is exciting — **I can write OpenSCAD code directly.** You describe what you want, I write the parametric model, you render it and print it. Example:

You say: *"Make me a phone holder for my nightstand, 3.5 inches wide, with a 15-degree angle"*

I write:
```openscad
// Phone holder - parametric
phone_width = 89; // 3.5 inches in mm
angle = 15;
thickness = 3;
depth = 40;
lip_height = 15;

module phone_holder() {
    // Base
    cube([phone_width + 10, depth, thickness]);
    // Back support
    translate([0, 0, 0])
        rotate([90 - angle, 0, 0])
            cube([phone_width + 10, 80, thickness]);
    // Front lip
    translate([0, 0, 0])
        cube([phone_width + 10, thickness, lip_height]);
}

phone_holder();
```

You open it in OpenSCAD → render → export STL → slice → print. Done.

---

## 5. The AI-to-Print Pipeline

Here's how the full workflow works with me involved:

### Option A: I Design, You Print (Easiest)

1. **You describe** what you want (with rough dimensions)
2. **I write** the OpenSCAD/CadQuery code
3. **I save** the `.scad` or `.py` file to the workspace
4. **You open** it in OpenSCAD, render, export as STL
5. **You open** the STL in Bambu Studio, slice it
6. **Send to printer** via Wi-Fi → done

### Option B: Fully Automated (Advanced Setup)

With some setup, we can make this nearly hands-free:

1. You describe what you want
2. I write the model code
3. I run OpenSCAD from the command line to export STL automatically
4. I run the slicer from command line to generate G-code
5. I send it to the printer via API/network
6. You just hit "confirm print" on the printer's touchscreen

**This requires:** OpenSCAD CLI + OrcaSlicer CLI + Bambu network API. All doable on the Mac mini.

### Option C: Download & Print

For common objects, I can find existing models on:
- **Printables.com** (Prusa's model repository — huge, free)
- **Thingiverse.com** (biggest library)
- **Thangs.com** (searchable by geometry)
- **MyMiniFactory.com** (curated, guaranteed printable)

I find the STL, you slice and print. No design needed.

---

## 6. Remote Printing & Monitoring

### Bambu Lab Cloud (Built-In)

- Bambu printers connect to their cloud service via Wi-Fi
- Monitor prints with the built-in camera from the Bambu Handy phone app
- Start/stop/pause prints remotely
- Works great out of the box

### OctoPrint (Advanced, Any Printer)

- Open-source print server that runs on a Raspberry Pi (or your Mac mini)
- Web interface to control any 3D printer remotely
- Webcam monitoring, print history, G-code viewer
- Plugin ecosystem (Obico AI failure detection — pauses print if it detects spaghetti)
- **Great if you go with a non-Bambu printer**

### Using the Mac Mini as Print Server

Since your Mac mini runs 24/7 with OpenClaw, it's ideal as a print server:
- Connect printer via USB or Wi-Fi
- Run OctoPrint in Docker (if needed)
- I can monitor print status and notify you when done
- I can queue up prints while you're away

---

## 7. Filament & Materials Guide

### FDM Filament Types

| Material | Price/kg | Strength | Easy to Print | Best For |
|----------|----------|----------|---------------|----------|
| **PLA** | $15–$25 | Moderate | ✅ Easiest | General use, decorative, prototypes. Start here. |
| **PLA+** | $18–$28 | Good | ✅ Easy | Stronger PLA. Good all-arounder. |
| **PETG** | $20–$30 | Good | ✅ Easy | Outdoor use, water-resistant, flexible. |
| **ABS** | $18–$25 | Good | ⚠️ Needs enclosure | Automotive parts, heat-resistant. Fumes — need ventilation. |
| **TPU** | $25–$35 | Flexible | ⚠️ Moderate | Phone cases, gaskets, grips, anything bendy. |
| **ASA** | $25–$35 | Great | ⚠️ Needs enclosure | UV-resistant outdoor parts. Better ABS. |
| **Nylon** | $30–$50 | Excellent | ⚠️ Hard | Gears, functional mechanical parts. |
| **Carbon Fiber PLA/PETG** | $35–$50 | Excellent | ⚠️ Abrasive | Stiff, lightweight. Needs hardened nozzle. |

### Where to Buy

- **Amazon** — Convenient, huge selection
- **Bambu Lab Store** — Their filament is excellent quality and pre-profiled for their printers
- **Printed Solid** — Great US-based supplier
- **MatterHackers** — Wide selection, good quality
- **Micro Center** — If you're near one (closest to Boise: none, unfortunately)

### Start With

- **2 rolls of PLA** (1 black, 1 white) — $30–$40 total
- That's enough for dozens of prints while you learn

---

## 8. What We Could Make

Here's where it gets fun. Things I can design for you to print:

### Around the House
- Custom phone/tablet stands
- Cable management clips sized for your exact desk
- Drawer organizers with custom compartments
- Light switch plates with custom designs
- Wall-mount holders for remotes, keys, etc.
- Replacement knobs, handles, clips for anything broken
- Custom shelf brackets

### For the RV / Camping
- Custom cup holders sized for your rig
- Awning clips and hooks
- Leveling block stackers
- Cord organizers for hookups
- Utensil holders that fit your specific cabinets
- Custom vent covers
- Map/phone mount for the dash
- Propane cap tethers

### For the '32 Ford (If You Get One!)
- Custom gauge bezels
- Switch panel blanks
- Interior trim pieces
- Wiring loom clips sized for your harness
- Hood prop rod holders
- Tool tray organizers for the trunk
- Custom emblems or badges
- Throttle linkage brackets

### Fun Stuff
- Chess set
- Desk toys and fidget gadgets
- Planters with drainage
- Lithophanes (photos printed as 3D transparencies — backlight them and the image appears)
- Topographic map models of your camping destinations
- Miniature '32 Ford model 😎

### Functional / Mechanical
- Gear sets and mechanisms
- Enclosures for electronics projects
- Tool holders and organizers
- Jigs and fixtures for woodworking
- Custom brackets and mounts for anything

---

## 9. Recommended Setup

### Hardware

| Item | Model | Price |
|------|-------|-------|
| **3D Printer** | Bambu Lab P1S Combo (with AMS) | ~$600 |
| **Filament starter pack** | 2 rolls PLA (Bambu Lab brand) | ~$40 |
| **Build plate adhesive** | Glue stick (Elmer's purple) | ~$3 |
| **Part removal** | Metal spatula / scraper | ~$8 |
| **Flush cutters** | For removing supports | ~$8 |
| **IPA (Isopropyl Alcohol)** | For cleaning build plate | ~$5 |

### Software (All Free, All Mac-Native)

| Software | Purpose |
|----------|---------|
| **Bambu Studio** | Slicing + sending to printer |
| **OpenSCAD** | I write parametric model code for you |
| **Blender** (optional) | Artistic/organic modeling |
| **FreeCAD** (optional) | Traditional CAD modeling |

### Physical Setup

- Place printer on a **sturdy, level surface** near the Mac mini (or anywhere with Wi-Fi)
- Printer connects via **Wi-Fi** — doesn't need to be physically next to the Mac mini
- Ensure **good ventilation** (PLA is low-fume but some materials need airflow)
- Temperature: printer works best in 60–85°F room. Your house is fine.

---

## 10. Budget Breakdown

### Starter Setup

| Item | Cost |
|------|------|
| Bambu Lab P1S Combo | $600 |
| 2 rolls PLA filament | $40 |
| Basic tools (cutters, scraper, glue stick) | $25 |
| **Total** | **~$665** |

### Budget Option

| Item | Cost |
|------|------|
| Bambu Lab A1 Mini + AMS Lite | $300 |
| 2 rolls PLA filament | $40 |
| Basic tools | $25 |
| **Total** | **~$365** |

### Premium Setup

| Item | Cost |
|------|------|
| Bambu Lab X1 Carbon Combo | $1,100 |
| 4 rolls mixed filament (PLA, PETG, TPU) | $100 |
| Filament dryer | $50 |
| Tools + accessories | $50 |
| **Total** | **~$1,300** |

---

## Where to Buy

- **Bambu Lab direct:** store.bambulab.com — best price, ships from US warehouse
- **Amazon:** Usually same price, faster shipping sometimes
- **Micro Center:** In-store if near one (none near Boise unfortunately)

---

## Next Steps

1. **Pick a printer** — I recommend the P1S Combo ($600) for the best experience
2. **Order it** — Ships in a few days from Bambu Lab
3. **I'll install OpenSCAD** on the Mac mini while we wait
4. **When it arrives:** 30-minute setup (unbox, level, connect Wi-Fi, test print)
5. **Tell me what to make** — I'll start designing

Once we're set up, the workflow is: you describe it → I code it → you print it. We can iterate fast — change dimensions, add features, tweak the design — all through conversation. It's like having a machinist on call. 🦞🔧

---

*Last updated: February 2026*
