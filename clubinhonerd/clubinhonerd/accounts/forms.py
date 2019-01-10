from django import forms
from django.contrib.auth.forms import UserCreationForm
# Para usar o User que nós criamos(CustomUser)
from django.contrib.auth import get_user_model

from clubinhonerd.core.mail import send_mail_templates
from clubinhonerd.core.utils import generate_hash_key

from .models import PasswordReset


User = get_user_model()


class PasswordResetForm(forms.Form):

	email = forms.EmailField(label='E-mail')

	def clean_email(self):
		email = self.cleaned_data['email']
		if User.objects.filter(email=email).exists():
			return email
		else:
			raise forms.ValidationError('Nenhum usuário encontrado com esse e-mail!')


	def save(self):
		user = User.objects.get(email=self.cleaned_data['email'])
		key = generate_hash_key(user.username)
		reset = PasswordReset(key=key, user=user)
		reset.save()
		template_name = 'accounts/password_reset_mail.html'
		subject = 'Criar nova senha no Clubinho Nerd'
		context = {
			'reset': reset,
		}
		send_mail_templates(subject, template_name, context, [user.email])



class RegisterForm(forms.ModelForm):

	password1 = forms.CharField(label='Senha', widget=forms.PasswordInput)
	password2 = forms.CharField(label='Confirmação de Senha', widget=forms.PasswordInput)


	def clean_password2(self):
		password1 = self.cleaned_data.get('password1')
		password2 = self.cleaned_data.get('password2')
		#  (verifica se foram enviadas e se são iguais)
		if password1 and password2 and password1 != password2:
			raise forms.ValidationError('A confirmação não está correta')

		return password2


	# isso tudo para salvar essa campo email no model
	def save(self, commit=True):
		user = super(RegisterForm, self).save(commit=False) # False aqui para nao salvar o user
		user.set_password(self.cleaned_data['password1'])
		if commit:
			user.save()
		return user

	class Meta:
		# Modelo a ser usado
		model = User
		# O que será preciso para o formulário de registro
		fields = ['username', 'email']


class EditAccountForm(forms.ModelForm):

	class Meta:
		# Modelo a ser usado
		model = User
		# O que será preciso para o formulário de editar conta
		fields = ['username', 'email', 'name']
