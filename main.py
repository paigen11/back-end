#=================================
# - IMPORTS
#=================================

# import flask stuff
from flask import Flask, render_template, redirect, request, jsonify, session, make_response
# import the mysql module
from flaskext.mysql import MySQL
import bcrypt as bcrypt
from settings import Settings
settings = Settings()
from flask_cors import CORS

#=================================
# - MYSQL SETUP
#=================================

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

#=================================
# - SESSION SALT
#=================================

app.secret_key = "FHNOGVOIWHWNQFQW(FHGNRUOGEWOUGHEW"

#=================================
# - CORS SETUP
#=================================
CORS(app)

#=================================
# - HOME ROUTE
#=================================

@app.route('/')
def index():
	return make_response(open('templates/index.html').read())

#=================================
# - REGISTER SUBMIT
#=================================

@app.route('/register_submit', methods=['POST'])
def register_submit():
	data = request.get_json()
	username = data['username']
	check_username_query = "SELECT username FROM user WHERE username = '%s'" % (username)

	cursor.execute(check_username_query)
	check_username_result = cursor.fetchone()


	if check_username_result is None:
		# avatar = data['avatar']
		# password = data['password'].encode('utf-8')
		# hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
		# username_insert_query = "INSERT INTO user (username, password, avatar) VALUES ('%s', '%s', '%s')" % (username, hashed_password, avatar)
		# cursor.execute(username_insert_query)
		# conn.commit()
		print 'reg success'
		return "reg successful"
	else:
		print "username taken"
		return redirect('/register?username=taken')


if __name__ == "__main__":
	app.run(debug=True)