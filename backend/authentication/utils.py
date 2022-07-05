from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_account_verification_email(user_email, token):
    URL = settings.APP_HOST_URL + f'/emailverification/{token}'
    SUBJECT = 'Email Verification'
    html_message = render_to_string('verify_email.html',{'url':URL})
    plain_message = strip_tags(html_message)

    send_mail(SUBJECT, plain_message, settings.EMAIL_HOST_USER, [user_email], html_message=html_message)

    