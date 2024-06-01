import re

def split_entries(data):
    # Split the data into individual entries
    entries = data.split(", ")

    # Split the entries into groups of 4 and join them with a newline character
    return ",\n".join(", ".join(entries[i:i+4]) for i in range(0, len(entries), 4))

def rgba_to_hex(rgba):
    # Extract the RGBA values from the string
    match = re.match(r'rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)', rgba)
    if match:
        r, g, b, a = map(float, match.groups())
        # Convert alpha to 255 scale
        a = int(a * 255) if a <= 1 else int(a)
        return f"#{int(r):02x}{int(g):02x}{int(b):02x}{a:02x}"
    return rgba

def replace_colors_with_variables(input_file, output_file):
    with open(input_file, 'r') as file:
        data = file.read()

    # Find all unique color values using regex
    colors = set(re.findall(r'rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)', data))

    # Define the static colors to change to hex
    static_colors = {"rgba(238,238,238,255)", #white
                    "rgba(52,54,60,1)",     #dark grey (middle)   
                    "rgba(126,126,128,1)",  #light grey (middle) 
                    "rgba(70,75,89,1)"}     #grey blue (middle)

    # Convert static colors to hex format
    hex_colors = {color: rgba_to_hex(color) for color in static_colors}

    # Define the colors to omit
    omit_colors = { "rgba(30,33,40,1)",     #darker of main color
                    "rgba(17,17,17,1)",     #darker of secondary color
                    "rgba(121,125,136,1)"}  #darker of tertiary color

    # Merge omit_colors with static_colors
    all_omit_colors = omit_colors | static_colors
    colors -= all_omit_colors

    # Replace each color with a variable, keeping track of the variable count
    variable_count = 0
    color_variables = {}
    for color in colors:
        variable_count += 1
        color_variables[color] = f"color{variable_count}"
        data = data.replace(color, f"${{{color_variables[color]}}}")

    # Replace specified omit colors with hex format in data
    for rgba, hex_color in hex_colors.items():
        data = data.replace(rgba, hex_color)

    # Replace "rgba(30,33,40,1)" with "${darkenColor(color#, 20)}"
    if "rgba(59,64,78,1)" in color_variables:
        darken_variable = color_variables["rgba(59,64,78,1)"]
        data = data.replace("rgba(30,33,40,1)", f"${{darkenColor({darken_variable},20)}}")

    # Replace "rgba(17,17,17,1)" with "${darkenColor(color#, 20)}"
    if "rgba(45,47,53,1)" in color_variables:
        darken_variable = color_variables["rgba(45,47,53,1)"]
        data = data.replace("rgba(17,17,17,1)", f"${{darkenColor({darken_variable},20)}}")

    # Replace "rgba(121,125,136,1)" with "${darkenColor(color#, 20)}"
    if "rgba(176,179,185,1)" in color_variables:
        darken_variable = color_variables["rgba(176,179,185,1)"]
        data = data.replace("rgba(121,125,136,1)", f"${{darkenColor({darken_variable},20)}}")

    # Write the modified data to the output file
    with open(output_file, 'w') as file:
        file.write(data)

    # Print the color variables saved
    print("Color variables:")
    for color, variable in color_variables.items():
        print(f"{variable} : {color}")

# Usage
input_file = "boxShadowCSS.txt"
output_file = "boxShadowVariables.txt"
replace_colors_with_variables(input_file, output_file)
print(f"New file with replaced colors created: {output_file}")

with open(output_file, 'r') as file:
    data = file.read()

# Split entries and save the modified data to the output file
modified_data = split_entries(data)
with open(output_file, 'w') as file:
    file.write(modified_data)

print("Entries split and saved to the output file.")
