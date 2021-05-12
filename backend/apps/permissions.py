import jwt
from apps.models import App
from users.models import CustomUser
from common.functions import get_cookie, decode_token
from config.settings import ALGORITHM, SECRET_KEY
from common.permissions import IsLoggedIn


class AllowedToCreateApp(IsLoggedIn):

    pass


class AllowedToModifyApp(AllowedToCreateApp):

    def has_object_permission(self, request, view, obj):
        cookie = get_cookie(request)
        post_data = request.data
        decoded_token = decode_token(cookie['access_token'])
        user_id = int(decoded_token['user_id'])

        if request.method == 'POST':
            id = post_data['id']
        else:
            id = int(self.request.query_params.get('id'))
        app = App.objects.filter(id=id)[0]
        if app:
            created_by = int(app.user.id)
            if created_by == user_id:
                return True
        return False