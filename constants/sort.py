# for d1, d2 in zip(data1, data2):
#     merged_entry = {**d1, **d2}
#     merged_data.append(merged_entry)

# sorted_merged_data = sorted(merged_data, key=lambda x: x.get("name", x.get("country")))

# with open("newdata.json", "w") as outfile:
#     json.dump({"data": sorted_merged_data}, outfile, indent=4)

# print("Merged and sorted data saved to newdata.json")

import json

input_filename = "fetched_data.json";
output_filename = "countries.json";

with open(input_filename, 'r') as json_file:
    jsonData = json.load(json_file)
    data = jsonData["data"]


sorted_merged_data = sorted(data, key=lambda x: x.get("name"))

with open(output_filename, "w") as outfile:
    json.dump({"data": sorted_merged_data}, outfile, indent=2)


print(f"Sorted data saved to {output_filename}")