from flask import Flask,request,jsonify
from matplotlib.pyplot import title
from watchlist import addProduct,getPrice
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
cors = CORS()
cors.init_app(app)
db= SQLAlchemy(app)

class Products(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    title = db.Column(db.String,nullable=False,unique=True)
    price = db.Column(db.Integer,nullable=False)
    availability = db.Column(db.String(20),nullable=False)
    image = db.Column(db.String,nullable=False)
    prodlink = db.Column(db.String,nullable=False)

@app.route('/api/add',methods=['GET','POST'])
def add():
    link = str(request.args['link'])
    result = addProduct(link)
    query = Products.query.filter_by(title=result['title']).first()
    if query is None:
        query = Products(title=result['title'],price=result['price'],availability=result['availability'],image=result['image'],prodlink=link)
        db.session.add(query)
        db.session.commit()
    return jsonify(result)

@app.route('/api/getrecent',methods=['GET','POST'])
def getrecent():
    query = Products.query.order_by(Products.id.desc()).all()
    products = []
    for i in range(3):
        products.append({'title':query[i].title,'price':query[i].price,'availability':query[i].availability,'image':query[i].image})
    return jsonify(products)

@app.route('/api/getall',methods=['GET','POST'])
def getall():
    query = Products.query.order_by(Products.id.desc()).all()
    products = []
    for i in range(len(query)):
        products.append({'title':query[i].title,'price':query[i].price,'availability':query[i].availability,'image':query[i].image})
    return jsonify(products)

@app.route('/api/search',methods=['GET','POST'])
def search():
    title = str(request.args['title'])
    query = Products.query.filter_by(title=title).first()
    return jsonify({'title':query.title,'price':query.price,'availability':query.availability,'image':query.image})

if __name__ == '__main__':

    app.run(host='192.168.1.154')