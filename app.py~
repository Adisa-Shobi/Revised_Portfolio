from flask import Flask, render_template, request
from flask_wtf import FlaskForm
import smtplib
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email
from flask_bootstrap import Bootstrap
import os

MY_EMAIL = os.environ.get("EMAIL")
MY_PASSWORD = os.environ.get("PASSWORD")
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")
Bootstrap(app)


class ContactForm(FlaskForm):
    name = StringField(label='Name*', validators=[DataRequired()])
    email = StringField(label='Email', validators=[DataRequired(), Email()])
    subject = StringField(label='Subject')
    message = TextAreaField(label='Message', validators=[DataRequired()])
    submit = SubmitField(label='SUBMIT')


@app.route('/', methods=["POST", "GET"])
def home():
    contact_form = ContactForm()
    success = False
    if request.method == "POST":
        if contact_form.validate_on_submit():
            name = contact_form.name.data
            email = contact_form.email.data
            subject = contact_form.subject.data
            message = contact_form.message.data
            msg = f"Subject: {subject}\n\n{name} wants to make contact\nEmail: {email}\n{message}"
            with smtplib.SMTP(host="smtp.gmail.com", port=587) as connection:
                connection.starttls()
                connection.login(MY_EMAIL, MY_PASSWORD)
                connection.sendmail(
                    from_addr=MY_EMAIL,
                    to_addrs="shobiolaadisa@gmail.com",
                    msg=msg
                )
            success = True
        else:
            return render_template("index.html", form=contact_form, success=success, error=True)
    contact_form.name.data = ""
    contact_form.email.data = ""
    contact_form.subject.data = ""
    contact_form.message.data = ""
    return render_template('index.html', form=contact_form, success=success)


if __name__ == "__main__":
    app.run(debug=True)
