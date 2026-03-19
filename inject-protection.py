"""
inject_protection.py
--------------------
Reads protect.js and inlines its full code directly into every HTML file.
This is much stronger than <script src="protect.js"> because:
  - Deleting protect.js does nothing
  - The protection is hardcoded inside every HTML file
  - Attacker must manually edit every single HTML file to remove it

Usage:
    python inject_protection.py

Place this script in the SAME folder as your HTML files and protect.js
"""

import os

# ── CONFIG ──────────────────────────────────────────────────────────────────
FOLDER          = "."                  # folder containing your HTML files
PROTECT_FILE    = "protect.js"         # your protect.js file
INJECT_MARKER   = "sn_overlay"         # unique string inside protect.js to detect if already injected
# ────────────────────────────────────────────────────────────────────────────

def get_protect_code():
    path = os.path.join(FOLDER, PROTECT_FILE)
    if not os.path.exists(path):
        print(f"ERROR: {PROTECT_FILE} not found in {FOLDER}")
        exit(1)
    with open(path, "r", encoding="utf-8") as f:
        return f.read().strip()

def inject(filepath, inline_code):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Skip if already injected
    if INJECT_MARKER in content:
        print(f"  [SKIP]     {filepath}  (already injected)")
        return

    # Build the inline script tag
    inline_tag = f"\n<script>\n{inline_code}\n</script>"

    # Inject just before </head>
    if "</head>" in content:
        new_content = content.replace("</head>", f"{inline_tag}\n</head>", 1)
    elif "<head>" in content:
        new_content = content.replace("<head>", f"<head>{inline_tag}", 1)
    else:
        new_content = inline_tag + "\n" + content

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"  [INJECTED] {filepath}")

def main():
    protect_code = get_protect_code()

    html_files = [
        f for f in os.listdir(FOLDER)
        if f.endswith(".html") and os.path.isfile(os.path.join(FOLDER, f))
    ]

    if not html_files:
        print("No HTML files found in this folder.")
        return

    print(f"Found {len(html_files)} HTML file(s). Inlining protect.js...\n")

    for filename in html_files:
        inject(os.path.join(FOLDER, filename), protect_code)

    print(f"\nDone! protect.js is now inlined into all HTML files.")
    print("Even if someone deletes protect.js, all calculators remain protected.")

if __name__ == "__main__":
    main()

