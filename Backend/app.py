from flask import Flask, url_for, redirect, request, render_template
from flask_restful import Api
from flask_cors import CORS
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from datetime import timedelta
from api import user
from api import post
import sys
import os

basePath = sys.path[0]
BASE_DIR = os.path.abspath(basePath)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# login_manager = LoginManager()
# login_manager.init_app(app)

app.config["JWT_SECRET_KEY"] = "jwtsecret"
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)

api = Api(app)
api.add_resource(user.User, "/api/users")
api.add_resource(user.User, "/api/users/<int:userId>", endpoint="get-user")
api.add_resource(user.User.SignIn, "/api/users/signIn")
api.add_resource(user.User.Me, "/api/users/me")

api.add_resource(post.Post, "/api/posts")
api.add_resource(post.Post.newest, '/api/posts/newest/<urgent>')
api.add_resource(post.Post.easyview, "/api/posts/easyview/<int:id>")


from api import general
@app.route('/test', methods=['Get'])
def get_route():
    # basePath = sys.path[0]
    # BASE_DIR = os.path.abspath(basePath)
    # img = general.return_img_stream(os.path.join(BASE_DIR,'uploadimg','Animal Protection ERD.jpg'))
    # # print(os.path.join(BASE_DIR,'index.html'))
    # # print(general.get_img_num())
    # return render_template('index.html', img=img)
    import sqlite3
    user={}
    try:
        conn = general.connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE id = 123")
        row = cur.fetchone()
        print(row)
        a = []
        for i in a:
            print(i)
        print('Loop')

    except Exception as e:
        print(e)
        user = {}

    return user

if __name__ == "__main__":
    app.run()
