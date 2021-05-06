import jwt
from common.functions import get_cookie, decode_token
from config.settings import ALGORITHM, SECRET_KEY
from rest_framework.permissions import IsAuthenticated


class AllowedToModifyUser(IsAuthenticated):

    def has_object_permission(self, request, view, obj):
        cookie = get_cookie(request)
        post_data = request.data
        user_id = int(post_data['user_id'])
        decoded_token = decode_token(cookie['access_token'])
        token_user_id = int(decoded_token['user_id'])

        cookie_user_id = int(post_data['user_id'])
        if token_user_id == cookie_user_id and token_user_id == user_id:
            return True
        return False
