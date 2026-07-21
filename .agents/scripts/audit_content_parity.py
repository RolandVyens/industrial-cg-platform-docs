import os
import re
import json

def get_files(base_path):
    files_set = set()
    for root, dirs, files in os.walk(base_path):
        for f in files:
            if f.endswith('.md'):
                rel_path = os.path.relpath(os.path.join(root, f), base_path)
                files_set.add(rel_path.replace('\\', '/'))
    return files_set

def parse_markdown(filepath):
    if not os.path.exists(filepath):
        return None
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract frontmatter keys
    fm_keys = set()
    fm_match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if fm_match:
        for line in fm_match.group(1).split('\n'):
            if ':' in line:
                key = line.split(':', 1)[0].strip()
                if key and not key.startswith('#'):
                    fm_keys.add(key)
    
    # Exclude frontmatter from body search
    body = content
    if fm_match:
        body = content[fm_match.end():]
        
    # Count H2 and H3
    h2_count = len(re.findall(r'^##\s', body, re.MULTILINE))
    h3_count = len(re.findall(r'^###\s', body, re.MULTILINE))
    
    # Count images (markdown ![alt](url) and html <img)
    img_md_count = len(re.findall(r'!\[.*?\]\(.*?\)', body))
    img_html_count = len(re.findall(r'<img\b', body))
    total_imgs = img_md_count + img_html_count
    
    # Count code blocks
    code_blocks = len(re.findall(r'^```[a-zA-Z]*\n', body, re.MULTILINE))
    
    return {
        'fm_keys': fm_keys,
        'h2': h2_count,
        'h3': h3_count,
        'imgs': total_imgs,
        'code': code_blocks
    }

def main():
    en_files = get_files('docs/en')
    issues = []
    
    for rel_path in sorted(list(en_files)):
        en_path = os.path.join('docs/en', rel_path)
        zh_path = os.path.join('docs/zh', rel_path)
        fr_path = os.path.join('docs/fr', rel_path)
        
        en_ast = parse_markdown(en_path)
        zh_ast = parse_markdown(zh_path)
        fr_ast = parse_markdown(fr_path)
        
        if not zh_ast:
            issues.append(f"File missing in ZH: {rel_path}")
            continue
        if not fr_ast:
            issues.append(f"File missing in FR: {rel_path}")
            continue
            
        # Compare ZH
        if en_ast['fm_keys'] != zh_ast['fm_keys']:
            issues.append(f"[ZH] {rel_path} - Frontmatter keys mismatch. EN: {en_ast['fm_keys']}, ZH: {zh_ast['fm_keys']}")
        if en_ast['h2'] != zh_ast['h2']:
            issues.append(f"[ZH] {rel_path} - H2 count mismatch. EN: {en_ast['h2']}, ZH: {zh_ast['h2']}")
        if en_ast['h3'] != zh_ast['h3']:
            issues.append(f"[ZH] {rel_path} - H3 count mismatch. EN: {en_ast['h3']}, ZH: {zh_ast['h3']}")
        if en_ast['imgs'] != zh_ast['imgs']:
            issues.append(f"[ZH] {rel_path} - Image count mismatch. EN: {en_ast['imgs']}, ZH: {zh_ast['imgs']}")
        if en_ast['code'] != zh_ast['code']:
            issues.append(f"[ZH] {rel_path} - Code blocks count mismatch. EN: {en_ast['code']}, ZH: {zh_ast['code']}")

        # Compare FR
        if en_ast['fm_keys'] != fr_ast['fm_keys']:
            issues.append(f"[FR] {rel_path} - Frontmatter keys mismatch. EN: {en_ast['fm_keys']}, FR: {fr_ast['fm_keys']}")
        if en_ast['h2'] != fr_ast['h2']:
            issues.append(f"[FR] {rel_path} - H2 count mismatch. EN: {en_ast['h2']}, FR: {fr_ast['h2']}")
        if en_ast['h3'] != fr_ast['h3']:
            issues.append(f"[FR] {rel_path} - H3 count mismatch. EN: {en_ast['h3']}, FR: {fr_ast['h3']}")
        if en_ast['imgs'] != fr_ast['imgs']:
            issues.append(f"[FR] {rel_path} - Image count mismatch. EN: {en_ast['imgs']}, FR: {fr_ast['imgs']}")
        if en_ast['code'] != fr_ast['code']:
            issues.append(f"[FR] {rel_path} - Code blocks count mismatch. EN: {en_ast['code']}, FR: {fr_ast['code']}")
            
    if issues:
        print("CONTENT PARITY ISSUES FOUND:")
        for issue in issues:
            print(issue)
        with open('parity_report.txt', 'w', encoding='utf-8') as f:
            f.write('\n'.join(issues))
    else:
        print("ALL CONTENT PARITY CHECKS PASSED.")

if __name__ == '__main__':
    main()
