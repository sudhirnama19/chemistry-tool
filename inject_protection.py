"""
inject_protection.py
--------------------
Run this ONCE to inject protect.js into all your HTML calculator files.
It safely skips files that already have the injection.

Usage:
    python inject_protection.py

Place this script in the SAME folder as your HTML files and protect.js
"""

import os
import re

# ── CONFIG ──────────────────────────────────────────────────────────────────
FOLDER        = "."                        # folder containing your HTML files (. = same folder)
INJECT_TAG    = '<script src="protect.js"></script>'
INJECT_MARKER = "protect.js"              # used to detect if already injected
# ────────────────────────────────────────────────────────────────────────────

def inject(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip if already injected
    if INJECT_MARKER in content:
        print(f"  [SKIP]    {filepath}  (already has protect.js)")
        return

    # Try to inject just before </head>
    if "</head>" in content:
        new_content = content.replace("</head>", f"  {INJECT_TAG}\n</head>", 1)
    # Fallback: inject after <head>
    elif "<head>" in content:
        new_content = content.replace("<head>", f"<head>\n  {INJECT_TAG}", 1)
    # Last resort: inject at very top
    else:
        new_content = INJECT_TAG + "\n" + content

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"  [INJECTED] {filepath}")

def main():
    html_files = [
        f for f in os.listdir(FOLDER)
        if f.endswith(".html") and os.path.isfile(os.path.join(FOLDER, f))
    ]

    if not html_files:
        print("No HTML files found in this folder.")
        return

    print(f"Found {len(html_files)} HTML file(s). Injecting protect.js...\n")
    for filename in html_files:
        inject(os.path.join(FOLDER, filename))

    print(f"\nDone! protect.js injected into all HTML files.")
    print("Now make sure protect.js is in the same folder.")

if __name__ == "__main__":
    main()
