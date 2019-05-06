from flask import Flask, jsonify
import pandas as pd
import math

data = {
        'scores': 
                {'black': [], 'asian':[], 'white':[], 'hispanic':[], 
        }, 
        'schools': 
                []
        }
scores = pd.read_csv('scores.csv')

# print(scores.keys())
i = 0
for index, row in scores.iterrows():
    if not pd.isnull(row['Percent Black']) and not pd.isnull(row['Average Score (SAT Math)']) and not pd.isnull(row['Percent White']) and not pd.isnull(row['Percent Asian']):
        data['scores']['black'].append({'x': row['Percent Black'].strip('%'), 'y': row['Average Score (SAT Math)'], 'index': i})
        data['scores']['asian'].append({'x': row['Percent Asian'].strip('%'), 'y': row['Average Score (SAT Math)'], 'index': i})
        data['scores']['white'].append({'x': row['Percent White'].strip('%'), 'y': row['Average Score (SAT Math)'], 'index': i})
        data['scores']['hispanic'].append({'x': row['Percent Hispanic'].strip('%'), 'y': row['Average Score (SAT Math)'], 'index': i})
        data['schools'].append(row['School Name'])
        i += 1


#print(data['black'])
app = Flask(__name__)

@app.route("/data")
def send_scores():
    return jsonify(data)

# FLASK_APP=app.py flask run