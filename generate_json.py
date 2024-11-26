import os
import json

# Path to the directory containing the images
image_directory = "./compressed images"

# Output JSON file
output_file = "./js/images.json"

def generate_image_list(directory):
    # Get all files in the directory
    files = os.listdir(directory)
    
    # Filter to include only image files (e.g., jpg, png, gif)
    image_files = [file for file in files if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', 'webp'))]
    
    return image_files

# Generate the image list
image_list = generate_image_list(image_directory)

# Write to JSON file
with open(output_file, "w") as json_file:
    json.dump(image_list, json_file, indent=4)

print(f"Image list saved to {output_file}")
