import sqlite3
import sys
import os

basePath = sys.path[0]
BASE_DIR = os.path.abspath(basePath)

def connect_to_db():
    db_path = os.path.join(BASE_DIR, 'Stray Animals.db')
    conn = sqlite3.connect(db_path)
    # print(BASE_DIR)
    return conn


def get_user_by_id(id):
    user = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE id = ?",
                    (id,))
        row = cur.fetchone()

        user["id"] = row[0]
        user["name"] = row[1]
        user["email"] = row[2]
    except Exception as e:
        print(e)
        user = {}

    return user


def get_user_by_email(email):
    user = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE email = ?",
                    (email,))
        row = cur.fetchone()

        user["id"] = row[0]
        user["name"] = row[1]
        user["email"] = row[2]
        user["password"] = row[3]
    except Exception as e:
        print(e)
        user = {}

    return user


def update_user(user, id):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE users SET name = ? WHERE id =?",
                    (user["name"], id,))
        conn.commit()
        updated_user = get_user_by_id(id)
    except:
        conn.rollback()
        updated_user = {}
    finally:
        conn.close()

    return updated_user


def get_img_num():
    num = 0
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("SELECT id FROM photos ORDER BY id DESC")
        row = cur.fetchone()
        if(row):
            num = row[0]
    except:
        conn.rollback()
    finally:
        conn.close()

    return num

def save_img(file):
    num = get_img_num()
    filename = os.path.join('uploadimg', f'{num+1:05}.jpg')
    filepath = os.path.join(BASE_DIR, filename)
    file.save(filepath)

    return filename


def return_img_stream(img_local_path):
    import base64
    img_stream = ''
    with open(img_local_path, 'rb') as img_f:
        img_stream = img_f.read()
        img_stream = base64.b64encode(img_stream).decode()

    return img_stream


def get_post(id):
    post = {}
    schema = ["id",
            "userId",
            "location",
            "title",
            "content",
            "uploadDate",
            "updateDate",
            "urgent"
        ]
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM posts WHERE id = ?",
                    (id,))
        row = cur.fetchone()

        for index, item in enumerate(schema):
            post[item] = row[index]
    except Exception as e:
        print(e)
        post = {}

    return post


def get_photo(id):
    photo = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM photos WHERE id = ?",
                    (id,))
        row = cur.fetchone()

        photo["id"] = row[0]
        photo["postId"] = row[1]
        photo["imagePath"] = row[2]
        photo["description"] = row[3]
    except Exception as e:
        print(e)
        photo = {}

    return photo


def insert_photo(photo, postId, description):
    img = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        path = save_img(photo)
        if(description == ''):description=None
        cur.execute("INSERT INTO photos (postId, imagePath, description) VALUES (?, ?, ?)",
                    (postId, path, description))
        conn.commit()
        img = get_photo(cur.lastrowid)
    except:
        conn.rollback()
    finally:
        conn.close()

    return img