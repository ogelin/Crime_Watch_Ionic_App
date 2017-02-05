# Convert a massive csv into a json file
import pandas as pd
# Use pandas to read the csv quickly

if __name__ == "__main__":
    df = pd.read_csv("crimes.csv")
    df['DATE'] = df.DATE.str.split(' ').str[0]
    df.to_json("crimes.json", orient="values")

    # df = pd.read_csv("data/Parking_Tags_Data_2015_1.csv")
    df_subset = df.iloc[0:100]
    df_subset.to_json("subset_test.json", orient="values")
