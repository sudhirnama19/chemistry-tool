"""
inject_protection.py
--------------------
1. Removes ANY old protect.js references from all HTML files
2. Inlines the full protect.js code fresh into every HTML file

This prevents conflicts from double injection.
"""

import os
import re

FOLDER       = "."
PROTECT_FILE = "protect.js"
MARKER       = "sn_overlay"  # unique string inside protect.js to detect injection

def get_protect_code():
    path = os.path.join(FOLDER, PROTECT_FILE)
    if not os.path.exists(path):
        print(f"ERROR: {PROTECT_FILE} not found in {FOLDER}")
        exit(1)
    with open(path, "r", encoding="utf-8") as f:
        return f.read().strip()

def clean_old_protection(content):
    # Remove <script src="protect.js"...></script> (old method)
    content = re.sub(
        r'<script[^>]*src=["\'][^"\']*protect\.js["\'][^>]*>\s*</script>',
        '', content, flags=re.IGNORECASE
    )
    # Remove old inline protect.js block (between <script> and </script> containing our marker)
    content = re.sub(
        r'<script>\s*/\*[\s\S]*?CHEM PROTECT[\s\S]*?</script>',
        '', content, flags=re.IGNORECASE
    )
    # Remove inline script blocks containing sn_overlay marker
    content = re.sub(
        r'<script>\s*[\s\S]*?sn_overlay[\s\S]*?</script>',
        '', content, flags=re.IGNORECASE
    )
    return content

def inject(filepath, inline_code):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Step 1: Clean ALL old protection
    content = clean_old_protection(content)

    # Step 2: Inject fresh inline code
    inline_tag = f"\n<script>\n{inline_code}\n</script>"

    if "</head>" in content:
        new_content = content.replace("</head>", f"{inline_tag}\n</head>", 1)
    elif "<head>" in content:
        new_content = content.replace("<head>", f"<head>{inline_tag}", 1)
    else:
        new_content = inline_tag + "\n" + content

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

    print(f"Found {len(html_files)} HTML files. Cleaning old protection and injecting fresh...\n")

    for filename in html_files:
        inject(os.path.join(FOLDER, filename), protect_code)

    print(f"\nDone! All {len(html_files)} files cleaned and re-injected successfully.")

if __name__ == "__main__":
    main()

