from flask import Flask, url_for, redirect, request
from flask_restful import Api
from flask_cors import CORS
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from api import user
from api import general
import sys
import os

basePath = sys.path[0]
BASE_DIR = os.path.abspath(basePath)
app = Flask(__name__)
# 資料庫連接為webapp的資料夾路徑
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/E/webapp/Backend/Stray_Animals.db'
db = SQLAlchemy(app)
cors = CORS(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)


@app.route('/register', methods=['POST'])
def register():
    form_data = request.get_json()
    print('表單資料:', form_data)

    name = form_data.get('name')
    email = form_data.get('email')
    password = form_data.get('password')

    user = User(name=name, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': '註冊成功'})


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

login_manager = LoginManager()
login_manager.init_app(app)

app.config["JWT_SECRET_KEY"] = "jwtsecret"
jwt = JWTManager(app)

api = Api(app)
api.add_resource(user.User, "/api/users")
api.add_resource(user.User, "/api/users/<int:userId>", endpoint="get-user")
api.add_resource(user.User.SignIn, "/api/users/signIn")
api.add_resource(user.User.Me, "/api/users/me")

@app.route('/image', methods=['POST'])
def upload_file():
    schema = ["title",
            "location",
            "content",
            "image1",
            "imagedes1",
            "image2",
            "imagedes2",
            "image3",
            "imagedes3"
    ]
    form = dict()
    for item in schema:
        form[item] = request.form.get(item, None)
    form['image1'] = request.files.get("image1",None)
    form['image2'] = request.files.get("image2",None)
    form['image3'] = request.files.get("image3",None)
    # file = request.files.get('image1', None)
    # if file.filename != '':
    #     filepath = os.path.join(BASE_DIR,'uploadimg',file.filename)
    #     file.save(filepath)
    print(form)
    return '1'

@app.route('/route', methods=['Get'])
def get_route():
    basePath = sys.path[0]
    BASE_DIR = os.path.abspath(basePath)
    general.connect_to_db()
    return BASE_DIR

if __name__ == "__main__":
    app.run()
