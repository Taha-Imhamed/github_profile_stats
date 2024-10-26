from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/user/<username>')
def get_user_data(username):
    try:
        user_data = fetch_github_user_data(username)
        repos = fetch_user_repositories(username)
        return jsonify({
            'user': user_data,
            'repos': repos
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def fetch_github_user_data(username):
    url = f'https://api.github.com/users/{username}'
    response = requests.get(url)
    response.raise_for_status()  # Raise an error for bad responses
    return response.json()

def fetch_user_repositories(username):
    url = f'https://api.github.com/users/{username}/repos'
    response = requests.get(url)
    response.raise_for_status()  # Raise an error for bad responses
    return response.json()

if __name__ == "__main__":
    app.run(debug=True)
