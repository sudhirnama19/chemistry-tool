"""
remove_protection.py
--------------------
Safely removes ALL protection code versions from all HTML files.

Removes ALL known marker versions:
  - <!-- gtag-inline-config-chemistry-spark/end -->
  - <!-- CHEMISTRY-SPARK-START/END -->
  - <!-- CHEM-PROTECT-START/END -->
  - <script src="protect.js">

Everything else (CSS, HTML, JS) stays 100% intact.
"""

import os
import re

FOLDER = "."

def remove_protection(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    patterns = [
        r'\n?<!-- gtag-inline-config-chemistry-spark -->[\s\S]*?<!-- gtag-inline-config-chemistry-spark-end -->',
        r'\n?<!-- CHEMISTRY-SPARK-START -->[\s\S]*?<!-- CHEMISTRY-SPARK-END -->',
        r'\n?<!-- CHEM-PROTECT-START -->[\s\S]*?<!-- CHEM-PROTECT-END -->',
        r'\n?<script[^>]*src=["\'][^"\']*protect\.js["\'][^>]*>\s*</script>',
    ]

    new_content = content
    found = False
    for pattern in patterns:
        result = re.sub(pattern, '', new_content, flags=re.IGNORECASE)
        if result != new_content:
            found = True
        new_content = result

    if not found:
        print(f"  [SKIP]  {filepath}  (no protection found)")
        return

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"  [DONE]  {filepath}")

def main():
    html_files = [
        f for f in os.listdir(FOLDER)
        if f.endswith(".html") and os.path.isfile(os.path.join(FOLDER, f))
    ]

    if not html_files:
        print("No HTML files found.")
        return

    print(f"Found {len(html_files)} HTML files. Removing protection...\n")

    for filename in sorted(html_files):
        remove_protection(os.path.join(FOLDER, filename))

    print(f"\nDone! Protection removed from all HTML files.")
    print("All your CSS and original code are untouched.")

if __name__ == "__main__":
    main()
