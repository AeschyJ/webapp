import sqlite3
import sys
import os
from datetime import datetime

basePath = sys.path[0]
BASE_DIR = os.path.abspath(basePath)
base64head = 'data:;base64,'

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
        img_stream = base64head + base64.b64encode(img_stream).decode()

    return img_stream


# def return_compress_img(img_local_path):
#     import base64
#     img = cv2(img_local_path)
#     img_resize = cv2.resize(img,(240, 180))
#     image = cv2.imencode('com.jpg',img_resize)[1]
#     img_stream = base64head + base64.b64encode(image).decode()
#     return img_stream
def get_post_num():
    ids = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT id FROM posts")
        row = cur.fetchall()

        for item in row:
            ids.append(item[0])
    except Exception as e:
        print(e)
        ids = []

    return len(ids)


def get_newest_post(urgent, page):
    ids = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        if urgent == 'none':
            cur.execute("SELECT * FROM posts ORDER BY id DESC")
            row = cur.fetchall()
        else:
            cur.execute("SELECT * FROM posts WHERE urgent = ? ORDER BY id DESC LIMIT 4",(urgent,))
            row = cur.fetchall()

        for item in row:
            ids.append(item[0])
    except Exception as e:
        print(e)
        ids = []

    return ids[(12 * (page - 1)) : (12 * (page - 1)) + 12]


def get_post(id):
    schema = ["id",
            "userId",
            "location",
            "title",
            "content",
            "updateDate",
            "urgent"
        ]
    post = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM posts WHERE id = ?",(id,))
        row = cur.fetchone()
        if row is None:
            return None
        else:
            for index, item in enumerate(schema):
                post[item] = row[index]
            
    except Exception as e:
        print(e)
        post = {}

    return post


def get_post_easyview(id):
    viewNeed = ["title",
            "content",
            "updateDate",
            "urgent",
            "image"
        ]
    post = get_post(id)
    view = {}
    if post is None:
        return None
    else:
        for item in viewNeed:
            if item in post:
                view[item] = post[item]
        view['image'] = get_photo_by_post(id, 1)

    return view



def get_post_view(id):
    viewNeed = ["userId",
            "username",
            "location",
            "title",
            "content",
            "updateDate",
            "urgent",
            "images"
        ]
    post = get_post(id)
    view = {}
    if post is None:
        return None
    else:
        for item in viewNeed:
            if item in post:
                view[item] = post[item]
        view['username'] = get_user_by_id(post['userId'])['name']
        view['images'] = get_photo_by_post(id)

    return view


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


def get_photo_by_post(postId, num=0):
    photos = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        if num == 1:
            cur.execute("SELECT imagePath FROM photos WHERE postId = ? LIMIT 1",
                        (postId, ))
            row = cur.fetchone()
            return return_img_stream(os.path.join(BASE_DIR, row[0]))
        
        else:
            cur.execute("SELECT * FROM photos WHERE postId = ?",
                        (postId, ))
            row = cur.fetchall()
            for p in row:
                photo = {}
                photo["imageSrc"] = return_img_stream(os.path.join(BASE_DIR, p[2]))
                photo["description"] = p[3]
                photo["postId"] = postId
                photos.append(photo)

    except Exception as e:
        print(e)
        photo = {}
        photos = []

    return photos


def insert_photo(photo, postId, description):
    img = {}
    print(description)
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