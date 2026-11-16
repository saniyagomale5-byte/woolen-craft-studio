from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config["SECRET_KEY"] = "woolen-craft-secret-key"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, default=1)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    product_name = db.Column(db.String(150), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False) 
    status = db.Column(db.String(30), default="Pending")

class Wishlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, nullable=False)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, nullable=False)

    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)

@app.route("/")
def home():

    products = Product.query.all()

    return render_template("index.html", products=products)

@app.route("/admin")
def admin():
    products = Product.query.all()
    return render_template("admin.html", products=products)


@app.route("/product/<int:id>")
def product_details(id):
    product = Product.query.get_or_404(id)
    return render_template("product.html", product=product)

@app.route("/shop")
def shop():
    products = Product.query.all()
    return render_template("shop.html", products=products)

@app.route("/search")
def search():

    keyword = request.args.get("q")

    products = Product.query.filter(
        Product.name.contains(keyword)
    ).all()

    return render_template("index.html", products=products)

@app.route("/remove-wishlist/<int:id>")
def remove_wishlist(id):

    item = Wishlist.query.filter_by(
        user_id=session["user_id"],
        product_id=id
    ).first()

    if item:
        db.session.delete(item)
        db.session.commit()

    flash("Product Removed From Wishlist!")

    return redirect(url_for("wishlist"))

@app.route("/test")
def test():
    return "Flask Working"

@app.route("/orders")
def orders():

    if "user_id" not in session:
        return redirect(url_for("signin"))

    orders = Order.query.filter_by(user_id=session["user_id"]).all()

    return render_template("orders.html", orders=orders)

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        print("Signup form submission received.")

        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm_password")

        # Server-Side Safety Validation Checks
        if password != confirm_password:
            flash("Passwords do not match. Please verify parameters.")
            return redirect(url_for("signup"))

        existing = User.query.filter_by(email=email).first()
        if existing:
            flash("Email already registered in our studio database.")
            return redirect(url_for("signup"))

        # Explicitly setting hash method to 'scrypt' for cross-version stability
        hashed = generate_password_hash(password, method="scrypt")

        new_user = User(
            name=name,
            email=email,
            password=hashed
        )

        db.session.add(new_user)
        db.session.commit()

        flash("Signup Successful! Please sign in below.")
        return redirect(url_for("signin"))

    return render_template("signup.html")

@app.route("/signin", methods=["GET", "POST"])
def signin():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            # Save data to cookie session variables
            session["user_id"] = user.id
            session["user_name"] = user.name
            return redirect(url_for("dashboard"))

        flash("Invalid Email or Password specification.")
        return redirect(url_for("signin"))

    return render_template("signin.html")
    
@app.route("/dashboard")
def dashboard():

    total_products = Product.query.count()
    total_orders = Order.query.count()
    total_wishlist = Wishlist.query.count()
    total_cart = Cart.query.count()

    return render_template(
        "dashboard.html",
        total_products=total_products,
        total_orders=total_orders,
        total_wishlist=total_wishlist,
        total_cart=total_cart
    )

@app.route("/cart")
def cart():

    if "user_id" not in session:
        flash("Please login first.")
        return redirect(url_for("signin"))

    cart_items = Cart.query.filter_by(user_id=session["user_id"]).all()

    products = []

    total = 0

    for item in cart_items:

        product = Product.query.get(item.product_id)

        if product:

            subtotal = product.price * item.quantity
            total += subtotal

            products.append({
                "id": item.id,
                "name": product.name,
                "price": product.price,
                "image": product.image,
                "quantity": item.quantity,
                "subtotal": subtotal
            })

    return render_template(
        "cart.html",
        products=products,
        total=total
    )

@app.route("/remove-cart/<int:id>")
def remove_cart(id):

    item = Cart.query.get_or_404(id)

    db.session.delete(item)
    db.session.commit()

    flash("Product Removed From Cart!")

    return redirect(url_for("cart"))

@app.route("/add-to-cart/<int:id>")
def add_to_cart(id):

    if "user_id" not in session:
        flash("Please login first.")
        return redirect(url_for("signin"))

    cart_item = Cart(
        user_id=session["user_id"],
        product_id=id,
        quantity=1
    )

    db.session.add(cart_item)
    db.session.commit()

    flash("Product Added To Cart Successfully!")

    return redirect(url_for("cart"))

@app.route("/increase/<int:id>")
def increase(id):

    item = Cart.query.get_or_404(id)
    item.quantity += 1
    db.session.commit()

    return redirect(url_for("cart"))


@app.route("/decrease/<int:id>")
def decrease(id):

    item = Cart.query.get_or_404(id)

    if item.quantity > 1:
        item.quantity -= 1
        db.session.commit()

    return redirect(url_for("cart"))

@app.route("/checkout", methods=["GET", "POST"])
def checkout():

    if "user_id" not in session:
        flash("Please login first.")
        return redirect(url_for("signin"))

    if request.method == "POST":

        name = request.form.get("name")
        email = request.form.get("email")
        phone = request.form.get("phone")
        address = request.form.get("address")
        city = request.form.get("city")
        state = request.form.get("state")
        pincode = request.form.get("pincode")
        payment = request.form.get("payment")

        cart_items = Cart.query.filter_by(user_id=session["user_id"]).all()

        for item in cart_items:

            product = Product.query.get(item.product_id)

            if product:

                order = Order(
                    user_id=session["user_id"],
                    product_name=product.name,
                    price=product.price,
                    quantity=item.quantity,
                    status="Pending"
                )

                db.session.add(order)

        db.session.commit()

        Cart.query.filter_by(user_id=session["user_id"]).delete()
        db.session.commit()

        flash("Order Placed Successfully!")

        return redirect(url_for("orders"))

    return render_template("checkout.html")

    return render_template("order_success.html")

    
@app.route("/add-to-wishlist/<int:id>")
def add_to_wishlist(id):

    if "user_id" not in session:
        flash("Please login first.")
        return redirect(url_for("signin"))

    item = Wishlist.query.filter_by(
        user_id=session["user_id"],
        product_id=id
    ).first()

    if not item:
        wishlist = Wishlist(
            user_id=session["user_id"],
            product_id=id
        )

        db.session.add(wishlist)
        db.session.commit()

    flash("Product Added To Wishlist!")

    return redirect(url_for("shop"))

@app.route("/wishlist")
def wishlist():

    if "user_id" not in session:
        return redirect(url_for("signin"))

    items = Wishlist.query.filter_by(user_id=session["user_id"]).all()

    products = []

    for item in items:

        product = Product.query.get(item.product_id)

        if product:
            products.append(product)

    return render_template("wishlist.html", products=products)

@app.route("/profile", methods=["GET", "POST"])
def profile():

    print(request.method)

    if "user_id" not in session:
        return redirect(url_for("signin"))

    user = User.query.get(session["user_id"])

    if request.method == "POST":

        user.name = request.form.get("name")
        user.email = request.form.get("email")

        db.session.commit()

        session["user_name"] = user.name

        flash("Profile Updated Successfully!")

        return redirect(url_for("profile"))


    return render_template("profile.html", user=user)

@app.route('/edit_profile', methods=['GET', 'POST'])
def edit_profile():

    user = User.query.first()   # Abhi ke liye first user

    if request.method == 'POST':
        user.fullname = request.form['fullname']
        user.email = request.form['email']
        user.phone = request.form['phone']

        db.session.commit()

        return redirect(url_for('profile'))

    return render_template('edit_profile.html', user=user)
    
@app.route("/review/<int:id>", methods=["POST"])
def review(id):

    if "user_id" not in session:
        return redirect(url_for("signin"))

    rating = request.form.get("rating")
    comment = request.form.get("comment")

    new_review = Review(
        user_id=session["user_id"],
        product_id=id,
        rating=int(rating),
        comment=comment
    )

    db.session.add(new_review)
    db.session.commit()

    flash("Review Added Successfully!")

    return redirect(url_for("product_details", id=id))

@app.route("/logout")
def logout():
    session.clear()
    flash("Logged out successfully.")
    return redirect(url_for("signin"))


@app.route("/admin-orders")
def admin_orders():

    orders = Order.query.all()

    return render_template(
        "admin_orders.html",
        orders=orders
    )

@app.route("/update-status/<int:id>/<status>")
def update_status(id, status):

    order = Order.query.get_or_404(id)

    order.status = status

    db.session.commit()

    flash("Order Status Updated Successfully!")

    return redirect(url_for("admin_orders"))

@app.route("/add-product", methods=["GET", "POST"])
def add_product():

    if request.method == "POST":

        name = request.form.get("name")
        price = request.form.get("price")
        image = request.form.get("image")
        description = request.form.get("description")

        product = Product(
            name=name,
            price=price,
            image=image,
            description=description
        )

        db.session.add(product)
        db.session.commit()

        flash("Product Added Successfully!")
        return redirect(url_for("admin"))

    return render_template("add_product.html")

@app.route("/edit-product/<int:id>", methods=["GET", "POST"])
def edit_product(id):

    product = Product.query.get_or_404(id)

    if request.method == "POST":

        product.name = request.form.get("name")
        product.price = request.form.get("price")
        product.image = request.form.get("image")
        product.description = request.form.get("description")

        db.session.commit()

        flash("Product Updated Successfully!")
        return redirect(url_for("admin"))

    return render_template("edit_product.html", product=product)

@app.route("/delete-product/<int:id>")
def delete_product(id):

    product = Product.query.get_or_404(id)

    db.session.delete(product)
    db.session.commit()

    flash("Product Deleted Successfully!")

    return redirect(url_for("admin"))

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)