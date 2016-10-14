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
# from flask_cors import CORS

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
# CORS(app)

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

	#----!!!
	# - Query for anything under the username given in MySQL
	#----!!!

	check_username_query = "SELECT * FROM user WHERE username = '%s'" % (username)

	cursor.execute(check_username_query)
	check_username_result = cursor.fetchone()

	#----!!!
	# - Submits registry if user does not exist, or prompts for different imformation if username exists
	#----!!!

	if check_username_result is None:
		first_name = data['firstname']
		last_name = data['lastname']
		email = data['email']
		phone = data['phone']
		password = data['password'].encode('utf-8')
		hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
		username_insert_query = "INSERT INTO user (first_name, last_name, username, phone, email, password) VALUES ('%s', '%s', '%s', '%s', '%s', '%s')" % (first_name, last_name, username, phone, email, hashed_password)
		cursor.execute(username_insert_query)
		conn.commit()
		print 'reg success'
		return "reg successful"
	else:
		print "username taken"
		return 'username taken'

#=================================
# - LOGIN SUBMIT
#=================================

@app.route('/login_submit', methods=['POST'])
def login_submit():
	data = request.get_json()
	username = data['username']
	password = data['password']
	session['username'] = username

	#----!!!
	# - Query to get username and password from MySQL
	#----!!!
	check_password_query = "SELECT username, password FROM user WHERE username = '%s'" % username
	cursor.execute(check_password_query)
	check_password_result = cursor.fetchone()
	print check_password_result[1]

	#----!!!
	# - Checks if password matches
	#----!!!

	if bcrypt.hashpw(password.encode('utf-8'), check_password_result[1].encode('utf-8')) == check_password_result[1].encode('utf-8'):
		#we have a match
		print 'login success'
		return 'login successful'
	else:
		print 'no match'
		return 'no match'	

if __name__ == "__main__":
	app.run(debug=True)