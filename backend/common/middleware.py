from django.utils.deprecation import MiddlewareMixin
from common.functions import get_cookie


class CustomHeaderMiddleware(MiddlewareMixin):
    def process_request(self, request):
        try:
            cookie = get_cookie(request)
            access_token = cookie['access_token']
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
        except Exception as e:
            print(e)
