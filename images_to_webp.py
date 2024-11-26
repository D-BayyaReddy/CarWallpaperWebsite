from PIL import Image
import os

# Set the directory paths
input_folder = '.\images'  # Directory with your original images
output_folder = '.\compressed images'  # Directory where WebP images will be saved

# Create output folder if it doesn't exist
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Loop through all image files in the input folder
for filename in os.listdir(input_folder):
    # Check if the file is a .jpg, .jpeg, or .png image
    if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, f"{os.path.splitext(filename)[0]}.webp")
        
        # Open the image
        with Image.open(input_path) as img:
            # Convert the image to WebP format with compression
            img.save(output_path, 'WebP', quality=60)  # You can adjust the quality value (0 to 100)
            print(f"Converted and compressed {filename} to WebP format.")

print("Conversion and compression complete!")
