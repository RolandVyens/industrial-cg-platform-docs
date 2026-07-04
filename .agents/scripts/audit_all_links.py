import os
import re
import urllib.parse

def audit():
    docs_dir = r"e:\blender_modify\industrial-cg-platform-docs\docs"
    md_files = []
    
    for root, dirs, files in os.walk(docs_dir):
        if ".vitepress" in root:
            # Skip build cache/dist
            if "cache" in root or "dist" in root:
                continue
        for file in files:
            if file.endswith(".md"):
                md_files.append(os.path.join(root, file))
                
    print(f"Auditing {len(md_files)} files...")
    
    # Patterns
    # Match markdown links: [text](url)
    md_link_pat = re.compile(r'\[([^\]]*?)\]\(([^)]+?)\)')
    # Match HTML href links (but not Vue dynamic bindings :href)
    html_link_pat = re.compile(r'(?<!:)\bhref=["\']([^"\']+)["\']')
    
    issues = []
    
    for md_path in md_files:
        rel_path = os.path.relpath(md_path, docs_dir)
        with open(md_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 1. Check markdown links
        for text, url in md_link_pat.findall(content):
            url_clean = url.strip()
            # Ignore external, mailto, anchor-only
            if any(url_clean.startswith(x) for x in ["http://", "https://", "mailto:", "#"]):
                continue
            
            resolved = resolve_local_link(url_clean, md_path, docs_dir)
            if not resolved:
                issues.append({
                    "file": rel_path,
                    "type": "Markdown Link",
                    "text": text,
                    "url": url_clean
                })
                
        # 2. Check HTML href links
        for url in html_link_pat.findall(content):
            url_clean = url.strip()
            if any(url_clean.startswith(x) for x in ["http://", "https://", "mailto:", "#"]):
                continue
                
            resolved = resolve_local_link(url_clean, md_path, docs_dir)
            if not resolved:
                issues.append({
                    "file": rel_path,
                    "type": "HTML Link",
                    "text": "N/A",
                    "url": url_clean
                })

    print(f"Audit completed. Found {len(issues)} issues.")
    for iss in issues:
        print(f"[{iss['file']}] {iss['type']} broken: '{iss['url']}' (text: '{iss['text']}')")
    
    if len(issues) > 0:
        return False
    return True

def resolve_local_link(url, current_file_path, docs_dir):
    # Strip query and anchor
    clean_url = url.split("#")[0].split("?")[0].strip()
    if not clean_url:
        return True # Just anchor/query or empty
        
    clean_url = urllib.parse.unquote(clean_url)
    
    # Strip base URL if present
    base_prefix = "/industrial-cg-platform-docs/"
    if clean_url.startswith(base_prefix):
        clean_url = "/" + clean_url[len(base_prefix):]
        
    # If absolute path
    if clean_url.startswith("/"):
        path_without_slash = clean_url.lstrip("/")
        
        # VitePress files can be .md, .html, folders with index.md, or in public/
        checks = [
            os.path.join(docs_dir, path_without_slash + ".md"),
            os.path.join(docs_dir, path_without_slash),
            os.path.join(docs_dir, path_without_slash, "index.md"),
            os.path.join(docs_dir, "public", path_without_slash),
        ]
        # In case the link itself specifies .md or .html or is just /logo.png
        if clean_url.endswith(".html"):
            no_html = path_without_slash[:-5]
            checks.append(os.path.join(docs_dir, no_html + ".md"))
            checks.append(os.path.join(docs_dir, no_html, "index.md"))
            
        for path in checks:
            if os.path.exists(path) and not os.path.isdir(path):
                return True
        return False
    else:
        # Relative path
        curr_dir = os.path.dirname(current_file_path)
        rel_path = os.path.join(curr_dir, clean_url)
        
        checks = [
            rel_path,
            rel_path + ".md",
            os.path.join(rel_path, "index.md")
        ]
        if clean_url.endswith(".html"):
            no_html = clean_url[:-5]
            checks.append(os.path.join(curr_dir, no_html + ".md"))
            checks.append(os.path.join(curr_dir, no_html, "index.md"))
            
        for path in checks:
            if os.path.exists(path) and not os.path.isdir(path):
                return True
        return False

if __name__ == "__main__":
    import sys
    success = audit()
    if not success:
        sys.exit(1)
