"""
inject_protection.py
--------------------
Uses secret HTML comment markers that only you know:

  <!-- CHEMISTRY-SPARK-START -->
  <script>...</script>
  <!-- CHEMISTRY-SPARK-END -->

Safe to re-run — cleans old protection before injecting fresh.
Will NOT touch your CSS or any other code.
"""

import os
import re

FOLDER       = "."
PROTECT_FILE = "protect.js"
START_MARKER = "<!-- CHEMISTRY-SPARK-START -->"
END_MARKER   = "<!-- CHEMISTRY-SPARK-END -->"

def get_protect_code():
    path = os.path.join(FOLDER, PROTECT_FILE)
    if not os.path.exists(path):
        print(f"ERROR: {PROTECT_FILE} not found!")
        exit(1)
    with open(path, "r", encoding="utf-8") as f:
        return f.read().strip()

def clean_old_protection(content):
    # Remove only content between your secret HTML comment markers
    content = re.sub(
        r'\n?<!-- CHEMISTRY-SPARK-START -->[\s\S]*?<!-- CHEMISTRY-SPARK-END -->',
        '', content, flags=re.IGNORECASE
    )
    # Also remove old plain <script src="protect.js"> if present
    content = re.sub(
        r'\n?<script[^>]*src=["\'][^"\']*protect\.js["\'][^>]*>\s*</script>',
        '', content, flags=re.IGNORECASE
    )
    return content

def inject(filepath, inline_code):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Step 1: Remove old protection safely
    cleaned = clean_old_protection(content)

    # Step 2: Build injection block with your secret markers
    inject_block = (
        f"\n{START_MARKER}\n"
        f"<script>\n{inline_code}\n</script>\n"
        f"{END_MARKER}"
    )

    # Step 3: Inject just before </head>
    if "</head>" in cleaned:
        new_content = cleaned.replace("</head>", f"{inject_block}\n</head>", 1)
    elif "<head>" in cleaned:
        new_content = cleaned.replace("<head>", f"<head>{inject_block}", 1)
    else:
        new_content = inject_block + "\n" + cleaned

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"  [DONE] {filepath}")

def main():
    protect_code = get_protect_code()

    html_files = [
        f for f in os.listdir(FOLDER)
        if f.endswith(".html") and os.path.isfile(os.path.join(FOLDER, f))
    ]

    if not html_files:
        print("No HTML files found.")
        return

    print(f"Found {len(html_files)} HTML files. Injecting protect.js safely...\n")

    for filename in sorted(html_files):
        inject(os.path.join(FOLDER, filename), protect_code)

    print(f"\nDone! All {len(html_files)} files protected successfully.")
    print("Your CSS and original code are untouched.")

if __name__ == "__main__":
    main()
