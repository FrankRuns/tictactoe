from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('game.html')

if __name__ == '__main__':
    port = os.environ.get('PORT', 5000)
    app.run(port=port)