
# Counter to name files sequentially
counter=1

# Loop through each .png file in the directory
for file in *.png; do
    # Check if the file exists (to handle cases where no .png files are found)
    if [[ -f "$file" ]]; then
        # Define the new filename without zero-padding
        new_name="shape_${counter}.png"
        
        # Rename the file
        mv "$file" "$new_name"
        
        # Increment the counter
        ((counter++))
    fi
done

echo "PNG files renamed successfully!"