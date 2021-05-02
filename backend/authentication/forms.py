from django.forms import ModelForm, widgets
from django.contrib.auth.password_validation import validate_password
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

    def clean_first_name(self):

        first_name = self.cleaned_data.get('first_name')

        if first_name == 'Guest':
            raise forms.ValidationError("Name 'Guest' is not allowed")
        else:
            return first_name

    def clean_email(self):

        email = self.cleaned_data.get('email')
        user = CustomUser.objects.filter(email=email)

        if user:
            raise forms.ValidationError('This email is already occupied')
        else:
            return email

    def clean_password(self):

        password = self.cleaned_data.get('password')

        validate_password(password)

        return password

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
