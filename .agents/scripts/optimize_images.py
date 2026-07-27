import os
import glob
from pathlib import Path
from PIL import Image

def optimize_images():
    # Find all images
    search_dir = "docs"
    img_files = glob.glob(f"{search_dir}/**/*.png", recursive=True) + \
                glob.glob(f"{search_dir}/**/*.jpg", recursive=True)
    
    md_files = glob.glob(f"{search_dir}/**/*.md", recursive=True)
    
    for img_path in img_files:
        path = Path(img_path)
        webp_path = path.with_suffix('.webp')
        
        # Convert to WebP
        with Image.open(path) as img:
            if path.suffix.lower() == '.png':
                img.save(webp_path, "webp", lossless=True)
            else:
                img.save(webp_path, "webp", quality=85)
            
        old_size = path.stat().st_size
        new_size = webp_path.stat().st_size
        print(f"Converted {path.name}: {old_size} -> {new_size} bytes")
        
        # Replace references in all MD files
        old_name = path.name
        new_name = webp_path.name
        for md_file in md_files:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            if old_name in content:
                content = content.replace(old_name, new_name)
                with open(md_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated reference in {md_file}")
                
        # Remove old image
        path.unlink()

if __name__ == "__main__":
    optimize_images()
