from flask import Flask, jsonify
import pandas as pd
import math

data = {'black': [], 'asian':[], 'white':[]}
scores = pd.read_csv('scores.csv')

# print(scores.keys())

for index, row in scores.iterrows():
    if not pd.isnull(row['Percent Black']) and not pd.isnull(row['Average Score (SAT Math)']) and not pd.isnull(row['Percent White']) and not pd.isnull(row['Percent Asian']):
        data['black'].append({'x': row['Percent Black'].strip('%'), 'y': row['Average Score (SAT Math)'], 'school': row['School Name']})
        data['asian'].append({'x': row['Percent Asian'].strip('%'), 'y': row['Average Score (SAT Math)'], 'school': row['School Name']})
        data['white'].append({'x': row['Percent White'].strip('%'), 'y': row['Average Score (SAT Math)'], 'school': row['School Name']})


#print(data['black'])
app = Flask(__name__)

@app.route("/data")
def send_scores():
    return jsonify(data)

# FLASK_APP=app.py flask run