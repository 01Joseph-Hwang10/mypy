from django.forms import ModelForm, widgets
from django import forms
from users.models import CustomUser


class SignUpForm(ModelForm):

    class Meta:

        model = CustomUser
        fields = ("first_name", "email")
        widgets = {
            "first_name": forms.TextInput(attrs={'placeholder': 'Name'}),
            "email": forms.EmailInput(attrs={'placeholder': 'Email'})
        }

    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Password'})
    )

    passwordConfirm = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Confirm password'})
    )

    def clean_passwordConfirm(self):

        password = self.cleaned_data.get('password')
        passwordConfirm = self.cleaned_data.get('passwordConfirm')

        if password != passwordConfirm:
            raise forms.ValidationError('Password confirmation does not match')
        else:
            return password

    def save(self, *args, **kwargs):
        user = super().save(commit=False)
        email = self.cleaned_data.get("email")
        password = self.cleaned_data.get("password")
        user.username = email
        user.set_password(password)
        user.save()
