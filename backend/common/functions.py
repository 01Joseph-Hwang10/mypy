import jwt
from config.settings import ALGORITHM, SECRET_KEY


def get_cookie(request):
    raw_cookie = request.headers['Cookie'].split(";")
    cookie = {}
    for e in raw_cookie:
        splited_e = e.split("=")
        cookie[splited_e[0].replace(" ", "")] = splited_e[1]
    return cookie


def decode_token(token):

    return jwt.decode(jwt=token, key=SECRET_KEY, algorithms=ALGORITHM)
