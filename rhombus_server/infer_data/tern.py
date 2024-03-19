import pandas as pd
import numpy as np
from pandas.tseries.api import guess_datetime_format

BOOLEAN_FORMATS = {"true", "false", "yes", "no", "1", "0"}

def infer_ints(column):
    return column.apply(lambda x: str(x).isdigit()).mean() > 0.9

def infer_floats(column):
    return column.apply(lambda x: isinstance(x, float) or (isinstance(x, str) and x.replace('.', '', 1).isdigit())).mean() > 0.9

def infer_complex(column):
    return column.apply(lambda x: isinstance(x, complex) or (isinstance(x, str) and '+' in x and '-' in x)).mean() > 0.9

def infer_bool(column, threshold=0.9):
    return column.apply(lambda x: str(x).lower() in BOOLEAN_FORMATS).mean() >= threshold

def infer_categorical(column, threshold=0.6):
    return (column.nunique() / len(column)) <= threshold

def infer_datetime(column, dayfirst=True):
    format = guess_datetime_format(column.iloc[0], dayfirst=dayfirst)
    if format is None:
        return pd.Series([np.nan] * len(column))
    return pd.to_datetime(column, format=format, dayfirst=dayfirst, errors='coerce')

def infer_timedelta(column):
    return pd.to_timedelta(column, errors='coerce')

def iter_columns(df):
    type_map = {}

    for column in df.columns:
        inferred_type = (
            'Boolean' if infer_bool(df[column]) else
            'Integer' if infer_ints(df[column]) else
            'Float' if infer_floats(df[column]) else
            'Complex' if infer_complex(df[column]) else
            'Date' if infer_datetime(df[column]).notna().all() else
            'Δ Time' if infer_timedelta(df[column]).notna().all() else
            'Category' if infer_categorical(df[column]) else
            'Text'  # default to object if none of the above
        )
        type_map[column] = inferred_type

    return df, type_map

def process(file, file_type):
    try:
        if file_type == "csv":
            df = pd.read_csv(file)
        elif file_type == "excel":
            df = pd.read_excel(file, engine='xlrd')  
        else:
            return "Error reading file", "abc"

        return iter_columns(df)
    except Exception as e:
        return f"Error reading file: {e}", "abc"
