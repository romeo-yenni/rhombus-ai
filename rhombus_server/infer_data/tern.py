import pandas as pd
import numpy as np
from pandas.tseries.api import guess_datetime_format

BOOLEAN_FORMATS = {"true", "false", "yes", "no", "1", "0"}

def infer_ints(column):
    return sum(1 for cell in column if str(cell).isdigit())

def infer_floats(column):
    return sum(1 for cell in column if isinstance(cell, float) or (isinstance(cell, str) and cell.replace('.', '', 1).isdigit()))

def infer_complex(column):
    return sum(1 for cell in column if isinstance(cell, complex) or (isinstance(cell, str) and '+' in cell and '-' in cell))

def infer_bool(column, threshold=0.9):
    boolean_count = sum(1 for value in column if str(value).lower() in BOOLEAN_FORMATS)
    ratio = boolean_count / len(column)
    return ratio >= threshold

def infer_categorical(column, threshold=0.5):
    return len(column.unique()) / len(column) <= threshold

def infer_datetime(column, dayfirst=True):
    format = guess_datetime_format(column.iloc[0], dayfirst=dayfirst)
    if format is None:
        return pd.Series([np.nan] * len(column))
    converted = pd.to_datetime(column, format=format, dayfirst=dayfirst, errors='coerce')
    return converted

def infer_timedelta(column):
    return pd.to_timedelta(column, errors='coerce')

def iter_columns(df):
    type_map = {}

    for column in df.columns:
        inferred_type = (
            'Boolean' if infer_bool(df[column]) else
            'Integer' if infer_ints(df[column]) > 0 else
            'Float' if infer_floats(df[column]) > 0 else
            'Complex' if infer_complex(df[column]) > 0 else
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
            return  (f"Error reading file", "abc")

        return iter_columns(df)
    except Exception as e:
        return (f"Error reading file: {e}", "abc")