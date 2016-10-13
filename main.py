# import flask stuff
from flask import Flask, render_template, redirect, request, jsonify, session, make_response
# import the mysql module
from flaskext.mysql import MySQL
import bcrypt as bcrypt
from settings import Settings
settings = Settings()

# set up mysql connection here later
mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = settings.user
app.config['MYSQL_DATABASE_PASSWORD'] = settings.password
app.config['MYSQL_DATABASE_DB'] = settings.db
app.config['MYSQL_DATABASE_HOST'] = settings.host
mysql.init_app(app)

conn = mysql.connect()
cursor = conn.cursor()

app.secret_key = "FHNOGVOIWHWNQFQW(FHGNRUOGEWOUGHEW"

@app.route('/')
def index():
	return make_response(open('templates/index.html').read())


if __name__ == "__main__":
	app.run(debug=True)