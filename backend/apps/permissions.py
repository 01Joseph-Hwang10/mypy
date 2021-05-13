import jwt
from apps.models import App, InputSpec
from common.functions import get_cookie, decode_token
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
            app_id = post_data['id']
        else:
            app_id = int(self.request.query_params.get('id'))
        app = App.objects.filter(id=app_id)[0]
        if app:
            created_by = int(app.user.id)
            if created_by == user_id:
                return True
        return False


class AllowedToModifyInputSpec(IsLoggedIn):

    def has_object_permission(self, request, view, obj):
        cookie = get_cookie(request)
        post_data = request.data
        decoded_token = decode_token(cookie['access_token'])
        user_id = int(decoded_token['user_id'])

        input_spec_id = int(post_data['id'])

        input_spec = InputSpec.objects.filter(id=input_spec_id)[0]
        created_by_id = int(input_spec.app.created_by.id)

        if user_id == created_by_id:
            return True
        return False
