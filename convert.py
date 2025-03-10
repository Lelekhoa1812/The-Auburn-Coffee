from pdf2image import convert_from_path
import os

'''
This script convert PDF file to PNG
'''
# Define file paths
pdf_path = "Auburn poster/ScanQRPoster.pdf"  # Update this to the correct path if needed
output_folder = "Auburn poster/converted_images"
os.makedirs(output_folder, exist_ok=True)

# Convert PDF to images
images = convert_from_path(pdf_path)

# Save each page as a PNG file
for i, image in enumerate(images):
    image_path = os.path.join(output_folder, f"ScanQRPoster_page_{i + 1}.png")
    image.save(image_path, "PNG")
    print(f"Saved: {image_path}")

print("Conversion completed!")
