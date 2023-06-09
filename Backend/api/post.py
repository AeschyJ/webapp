from flask import request, jsonify, make_response
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity, exceptions
from flask_restful import Resource

from api.general import *

class Post(Resource):
    @jwt_required()
    def post(self):
        schema = ["title",
                "location",
                "content",
                "image1",
                "image1des",
                "image2",
                "image2des",
                "image3",
                "image3des",
                "urgent"
        ]
        form = dict()
        for item in schema:
            form[item] = request.form.get(item, None)
            # print(form[item])

        images = ['image1', 'image2', 'image3']
        for image in images[:]:
            form[image] = request.files.get(image, None)
            if(form[image] is None): 
                images.remove(image)
                # print(image)
                # print(images)
        
        # print(images)
        # print(form)
        
        try:
            # userId = 1
            userId = get_jwt_identity()
            conn = connect_to_db()
            cur = conn.cursor()
            cur.execute("INSERT INTO posts (userId, location, title, content, urgent) VALUES (?, ?, ?, ?, ?)",
                        (userId, form['location'], form['title'], form['content'], form['urgent']))
            conn.commit()
            post = get_post(cur.lastrowid)
            photos = []
            for image in images:
                photos.append(insert_photo(form[image], post['id'], form[f'{image}des']))
            # print(post)
            # print(photos)
            response = make_response(jsonify({"status": 0,
                                                "message": "success",
                                                "data": {'post': post,
                                                        'photos':photos}}),
                                     201)
        except sqlite3.IntegrityError as e:
            response = make_response(jsonify({"status": -1,
                                              "message": str(e), }),
                                     409)
        except Exception as e:
            conn.rollback()
            response = make_response(jsonify({"status": -10,
                                              "message": str(e), }),
                                     500)
        finally:
            conn.close()

        return response
        
    # date = datetime.today()
    # print(date.strftime('%Y-%m-%d %H:%M:%S'))

    def get(self, postId):
            view = get_post_view(postId)
            if view is None:
                response = make_response(jsonify({"status": -1,
                                                "message": 'no post',
                                                "data": None }),
                                        400)
            else:
                response = make_response(jsonify({"status": 0,
                                                "message": 'received',
                                                "data": view }),
                                        200)
            return response


    class newest(Resource):
        def get(self, urgent, page):
            response = make_response(jsonify({"status": 0,
                                              "message": 'received',
                                               "data": get_newest_post(urgent, page) }),
                                     200)
            return response
    
    class numbers(Resource):
        def get(self):
            response = make_response(jsonify({"status": 0,
                                              "message": 'received',
                                               "data": get_post_num() }),
                                     200)
            return response
            
    
    class easyview(Resource):
        def get(self, id):
            view = get_post_easyview(id)
            if view is None:
                response = make_response(jsonify({"status": -1,
                                                "message": 'no post',
                                                "data": None }),
                                        400)
            else:
                response = make_response(jsonify({"status": 0,
                                                "message": 'received',
                                                "data": view }),
                                        200)
            return response
