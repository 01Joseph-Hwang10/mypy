from rest_framework.permissions import IsAuthenticated


class AllowedToCreateApp(IsAuthenticated):

    pass