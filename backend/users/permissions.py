import jwt
from common.functions import get_cookie
from config.settings import ALGORITHM, SECRET_KEY
from rest_framework.permissions import IsAuthenticated


class AllowedToModifyUser(IsAuthenticated):

    def has_object_permission(self, request, view, obj):
        cookie = get_cookie(request)
        post_data = request.data
        user_id = post_data['user_id']
        token_user_id = jwt.decode(
            jwt=cookie['access_token'], key=SECRET_KEY, algorithms=ALGORITHM)

        cookie_user_id = int(post_data['user_id'])
        if token_user_id == cookie_user_id and token_user_id == user_id:
            return True
        return False
