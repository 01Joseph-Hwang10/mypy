from rest_framework.generics import UpdateAPIView, RetrieveAPIView
from rest_framework.response import Response
from users.models import CustomUser
from users.permissions import AllowedToModifyUser
from users.serializers import CustomUserSerializer
from apps.models import App


class UpdateImportsView(UpdateAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (AllowedToModifyUser,)

    def partial_update(self, request, *args, **kwargs):
        try:
            post_data = request.data
            user_id = post_data['user_id']
            is_adding = post_data['isAdding']
            app_id = post_data['id']
            user = CustomUser.objects.get(id=user_id)
            app = App.objects.filter(id=app_id)[0]
            if is_adding == 'true':
                user.imported.add(app_id)
                app.exports = app.exports + 1
            else:
                user.imported.remove(app_id)
                if app.exports > 0:
                    app.exports = app.exports - 1
            user.save()
            app.save()
            return Response(status=200, data='Update was successful')
        except Exception as e:
            print(e)
            return Response(status=400, data='Update failed')


class UpdateProfileView(UpdateAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (AllowedToModifyUser,)

    def partial_update(self, request, *args, **kwargs):
        try:
            post_data = request.data
            user_id = int(post_data['id'])
            first_name = post_data['first_name']
            email = post_data['email']
            bio = post_data['bio']
            user = CustomUser.objects.get(id=user_id)
            isChanged = False
            if user.first_name != first_name:
                user.first_name = first_name
                isChanged = True
            if user.email != email:
                user.email = email
                isChanged = True
            if user.bio != bio:
                user.bio = bio
                isChanged = True
            if isChanged:
                user.save()
            return Response(status=200, data="Successfully Updated!")
        except Exception as e:
            print(e)
            return Response(status=400, data="Update Failed!")


class RetrieveUserView(RetrieveAPIView):

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
