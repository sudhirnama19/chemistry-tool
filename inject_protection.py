"""
inject_protection.py
--------------------
Uses gtag-style HTML comment markers:

  <!-- gtag-inline-config-chemistry-spark -->
  <script>...</script>
  <!-- gtag-inline-config-chemistry-spark-end -->

Cleans ALL old marker versions before injecting fresh:
  - <!-- CHEM-PROTECT-START/END -->
  - <!-- CHEMISTRY-SPARK-START/END -->
  - <!-- gtag-inline-config-chemistry-spark/end -->
  - <script src="protect.js">

Safe to re-run anytime. Will NOT touch CSS or any other code.
"""

import os
import re

FOLDER       = "."
PROTECT_FILE = "protect.js"
START_MARKER = "<!-- gtag-inline-config-chemistry-spark -->"
END_MARKER   = "<!-- gtag-inline-config-chemistry-spark-end -->"

def get_protect_code():
    path = os.path.join(FOLDER, PROTECT_FILE)
    if not os.path.exists(path):
        print(f"ERROR: {PROTECT_FILE} not found!")
        exit(1)
    with open(path, "r", encoding="utf-8") as f:
        return f.read().strip()

def clean_old_protection(content):
    # Remove ALL known old marker versions
    patterns = [
        r'\n?<!-- gtag-inline-config-chemistry-spark -->[\s\S]*?<!-- gtag-inline-config-chemistry-spark-end -->',
        r'\n?<!-- CHEMISTRY-SPARK-START -->[\s\S]*?<!-- CHEMISTRY-SPARK-END -->',
        r'\n?<!-- CHEM-PROTECT-START -->[\s\S]*?<!-- CHEM-PROTECT-END -->',
        r'\n?<script[^>]*src=["\'][^"\']*protect\.js["\'][^>]*>\s*</script>',
    ]
    for pattern in patterns:
        content = re.sub(pattern, '', content, flags=re.IGNORECASE)
    return content

def inject(filepath, inline_code):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    cleaned = clean_old_protection(content)

    inject_block = (
        f"\n{START_MARKER}\n"
        f"<script>\n{inline_code}\n</script>\n"
        f"{END_MARKER}"
    )

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
