from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

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


@app.route('/login', methods=['POST'])
def login():
    form_data = request.get_json()
    print('登入資料:', form_data)

    email = form_data.get('email')
    password = form_data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.password == password:
        return jsonify({'message': '登入成功'})
    else:
        return jsonify({'message': '登入失敗'}), 401


@app.route('/post', methods=['POST'])
def create_post():
    title = request.form.get('title')
    content = request.form.get('content')

    new_post = Post(title=title, content=content)

    db.session.add(new_post)
    db.session.commit()

    return jsonify({'message': '貼文已新增'})


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()
