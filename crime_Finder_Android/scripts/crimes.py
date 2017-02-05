# Convert a massive csv into a json file
import pandas as pd
# Use pandas to read the csv quickly
from datetime import datetime

if __name__ == "__main__":
    fields=["CATEGORIE", "LAT", "LONG", "DATE"]
    df = pd.read_csv("crimes.csv", usecols=fields)
    df['DATE'] = df.DATE.str.split(' ').str[0]
    df['YEAR'] = df['DATE'].str[:4]
    df['MONTH'] = df['DATE'].str[5:7]
    df['MONTH'] = df['MONTH'].astype(int)
    import calendar
    df['MONTH'] = df['MONTH'].apply(lambda x: calendar.month_abbr[x])
    df_sample = df.sample(n=1000, random_state=1776)
    df_sample.to_json("sample1000.json", orient="values")
    #
    # df.to_json("crimes.json", orient="values")
    #
    #
    # # df = pd.read_csv("data/Parking_Tags_Data_2015_1.csv")
    # df_subset = df.iloc[0:100]
    # df_subset.to_json("subset_test.json", orient="values")
