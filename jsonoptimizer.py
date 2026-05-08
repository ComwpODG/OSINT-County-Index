import json

with open("countyData.json", "r") as f:
    data = json.load(f)

# state default links
state_defaults = {
    "AL": {
        "courtWebsite": "https://pa.alacourt.com/",
        "secretaryOfStateWebsite": "https://www.sos.alabama.gov/",
        "workersCompWebsite": "https://labor.alabama.gov/PublicRecordsRequest/"

    },
     "AK": {
        "courtWebsite": "https://courts.alaska.gov/index.htm",
        "secretaryOfStateWebsite": "https://www.commerce.alaska.gov/web/",
        "workersCompWebsite":"https://www.adoledi.info/"
    },
    "TX": {
        "secretaryOfStateWebsite": "https://www.sos.state.tx.us/corp/sosda/index.shtml",
        "workersCompWebsite":"https://www.tdi.texas.gov/forms/form20request.html"
    }
}

# do the thing
for county_id, county_data in data.items():

    state = county_data["stateAbbreviation"]

    if state in state_defaults:

        for field, value in state_defaults[state].items():

            if county_data.get(field) == "no data yet":
                county_data[field] = value

# save
with open("countyData.json", "w") as f:
    json.dump(data, f, indent=2)

print("Complete")
